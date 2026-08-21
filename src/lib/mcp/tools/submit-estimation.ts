import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const N8N_WEBHOOK_URL =
  "https://n8n.srv864634.hstgr.cloud/webhook/c15fe03b-332b-405e-b285-3c660fb06c0e";

function runtimeEnv(name: string): string | undefined {
  const runtime = globalThis as typeof globalThis & {
    Deno?: { env: { get(name: string): string | undefined } };
  };
  return runtime.Deno?.env?.get(name);
}

export default defineTool({
  name: "submit_estimation",
  title: "Soumettre une demande d'estimation locative",
  description:
    "Envoie une demande d'estimation de loyer à ERA Dupont Romain (Perpignan et 66). Coordonnées obligatoires (nom, prénom, email, téléphone) et informations sur le bien optionnelles. La réponse est envoyée par l'agence sous 24 h.",
  inputSchema: {
    consentement_rgpd: z
      .boolean()
      .describe(
        "Confirmation que la personne a explicitement consenti à être recontactée par ERA Dupont Romain et a été informée de la politique de confidentialité : https://era-dupontromain.immo/confidentialite",
      ),
    nom: z.string().min(1).describe("Nom de famille du propriétaire."),
    prenom: z.string().min(1).describe("Prénom du propriétaire."),
    email: z.string().email().describe("Adresse email de contact."),
    telephone: z.string().min(6).describe("Numéro de téléphone français."),
    ville: z.string().optional().describe("Ville du bien (ex. Perpignan)."),
    codePostal: z.string().optional().describe("Code postal du bien."),
    adresse: z.string().optional().describe("Adresse ou rue du bien."),
    type: z
      .enum(["appartement", "maison", "immeuble", "autre"])
      .optional()
      .describe("Type de bien."),
    surface: z.string().optional().describe("Surface en m²."),
    pieces: z.string().optional().describe("Nombre de pièces."),
    chambres: z.string().optional().describe("Nombre de chambres."),
    dpe: z
      .enum(["A", "B", "C", "D", "E", "F", "G", "non-connu"])
      .optional()
      .describe("Classe DPE du bien."),
    meuble: z.enum(["oui", "non"]).optional().describe("Bien meublé ou non."),
    gestion: z
      .enum(["oui", "non", "peut-etre"])
      .optional()
      .describe("Intérêt pour une gestion locative par l'agence."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const { consentement_rgpd, ...fields } = input;

    if (consentement_rgpd !== true) {
      return {
        content: [
          {
            type: "text" as const,
            text: "Consentement RGPD manquant : la demande n'a pas été transmise. La personne doit explicitement accepter d'être recontactée par ERA Dupont Romain et être informée de la politique de confidentialité (https://era-dupontromain.immo/confidentialite).",
          },
        ],
        isError: true,
      };
    }

    const payload = {
      ...fields,
      rgpd: "true",
      source: "mcp",
      source_form: "mcp-server",
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return {
        content: [
          {
            type: "text" as const,
            text: `La demande n'a pas pu être transmise (HTTP ${res.status}). ${body}`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: `Demande d'estimation transmise à ERA Dupont Romain. L'agence recontactera ${input.prenom} ${input.nom} sous 24 h au ${input.telephone} ou par email (${input.email}).`,
        },
      ],
      structuredContent: { ok: true },
    };
  },
});
