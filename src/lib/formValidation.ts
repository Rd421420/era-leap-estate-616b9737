import { z } from "zod";

// Sanitize string input to prevent XSS
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove < and >
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers (no trim to allow spaces during typing)
};

// Sanitize and trim for final validation (used in Zod transforms)
const sanitizeAndTrim = (input: string): string => {
  return sanitizeString(input).trim();
};

// French phone number regex
const frenchPhoneRegex = /^(?:(?:\+33|0033|0)[1-9])(?:[0-9]{8})$/;

// French postal code regex (5 digits)
const postalCodeRegex = /^[0-9]{5}$/;

// Email validation with more strict rules
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Step 1 validation schema
export const step1Schema = z.object({
  adresse: z
    .string()
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères")
    .transform(sanitizeAndTrim),
  type: z.enum(["appartement", "maison", "immeuble", "studio", "local"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type de bien" }),
  }),
  surface: z
    .string()
    .min(1, "La surface est requise")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num < 10000;
    }, "La surface doit être entre 1 et 10000 m²"),
  pieces: z.string().min(1, "Le nombre de pièces est requis"),
  chambres: z.string().optional(),
  etat: z.string().optional(),
  annee: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const year = parseInt(val);
      return !isNaN(year) && year >= 1800 && year <= new Date().getFullYear();
    }, "L'année doit être valide"),
  chauffage: z.string().optional(),
  exterieur: z.string().optional(),
  ville: z
    .string()
    .min(2, "La ville doit contenir au moins 2 caractères")
    .max(100, "La ville ne peut pas dépasser 100 caractères")
    .transform(sanitizeAndTrim),
  codePostal: z
    .string()
    .regex(postalCodeRegex, "Le code postal doit contenir 5 chiffres"),
  nbLogements: z.string().optional(),
  typesLogements: z.string().optional().transform((val) => val ? sanitizeAndTrim(val) : val),
  meuble: z.string().optional(),
  parkingExterieur: z.string().optional(),
  parkingInterieur: z.string().optional(),
  garage: z.string().optional(),
  dpe: z.string().optional(),
});

// Step 2 validation schema
export const step2Schema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .transform(sanitizeAndTrim),
  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .transform(sanitizeAndTrim),
  telephone: z
    .string()
    .min(1, "Le téléphone est requis")
    .transform((val) => val.replace(/\s/g, "")) // Remove spaces
    .refine(
      (val) => frenchPhoneRegex.test(val),
      "Veuillez entrer un numéro de téléphone français valide"
    ),
  email: z
    .string()
    .min(1, "L'email est requis")
    .max(255, "L'email ne peut pas dépasser 255 caractères")
    .regex(emailRegex, "Veuillez entrer une adresse email valide")
    .transform((val) => val.toLowerCase().trim()),
  gestion: z.string().optional(),
  rgpd: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }),
  }),
});

// Full form schema
export const estimationFormSchema = step1Schema.merge(step2Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type EstimationFormData = z.infer<typeof estimationFormSchema>;

// Validation helper functions
export const validateStep1 = (data: Record<string, unknown>) => {
  return step1Schema.safeParse(data);
};

export const validateStep2 = (data: Record<string, unknown>) => {
  return step2Schema.safeParse(data);
};

export const validateFullForm = (data: Record<string, unknown>) => {
  return estimationFormSchema.safeParse(data);
};
