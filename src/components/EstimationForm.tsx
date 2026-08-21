import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Building2,
  Send,
  MapPin,
  Square,
  Bed,
  Calendar,
  Thermometer,
  Trees,
  Armchair,
  Car,
  Zap,
  AlertTriangle,
  Clock,
  Shield,
  Gift,
  Star,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { CommuneAutocomplete } from "@/components/CommuneAutocomplete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useFormPersistence } from "@/hooks/useFormPersistence";
import {
  validateStepA,
  validateStepB,
  validateStep2,
  sanitizeString,
} from "@/lib/formValidation";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

interface FormData extends Record<string, unknown> {
  // Étape 1
  type: string;
  ville: string;
  codePostal: string;
  surface: string;
  pieces: string;
  nbLogements: string;
  typesLogements: string;
  // Étape 2
  adresse: string;
  chambres: string;
  etat: string;
  annee: string;
  chauffage: string;
  exterieur: string;
  meuble: string;
  parkingExterieur: string;
  parkingInterieur: string;
  garage: string;
  dpe: string;
  // Étape 3
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  gestion: string;
  source: string;
  rgpd: boolean;
}

const INITIAL: FormData = {
  type: "",
  ville: "",
  codePostal: "",
  surface: "",
  pieces: "",
  nbLogements: "",
  typesLogements: "",
  adresse: "",
  chambres: "",
  etat: "",
  annee: "",
  chauffage: "",
  exterieur: "",
  meuble: "",
  parkingExterieur: "",
  parkingInterieur: "",
  garage: "",
  dpe: "",
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  gestion: "",
  source: "",
  rgpd: false,
};

const RATE_LIMIT_CONFIG = {
  maxAttempts: 1,
  windowMs: 30 * 1000,
  storageKey: "era_estimation_rate_limit",
};

const TOTAL_STEPS = 3;

// Masque téléphone FR : 06 12 34 56 78
const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
};

interface EstimationFormProps {
  initialAddress?: string;
  initialVille?: string;
  initialCodePostal?: string;
}

const EstimationForm = ({
  initialAddress,
  initialVille,
  initialCodePostal,
}: EstimationFormProps = {}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    data: formData,
    setData: setFormData,
    step,
    setStep,
    hasDraft,
    restore,
    discardDraft,
    clear,
    enablePersistence,
  } = useFormPersistence<FormData>(INITIAL);

  // Pré-remplissage de l'adresse depuis prop ou événement global
  useEffect(() => {
    if (initialAddress) {
      setFormData((prev) => (prev.adresse ? prev : { ...prev, adresse: sanitizeString(initialAddress) }));
    }
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ address?: string }>).detail;
      if (detail?.address) {
        setFormData((prev) => ({ ...prev, adresse: sanitizeString(detail.address!) }));
      }
    };
    window.addEventListener("prefill-estimation-address", handler as EventListener);
    return () => window.removeEventListener("prefill-estimation-address", handler as EventListener);
  }, [initialAddress, setFormData]);

  // Pré-remplissage ville / code postal (depuis le hero) — synchronisé
  useEffect(() => {
    if (!initialVille && !initialCodePostal) return;
    setFormData((prev) => {
      const ville = initialVille ? sanitizeString(initialVille) : prev.ville;
      const codePostal = initialCodePostal ? initialCodePostal : prev.codePostal;
      if (ville === prev.ville && codePostal === prev.codePostal) return prev;
      return { ...prev, ville, codePostal };
    });
  }, [initialVille, initialCodePostal, setFormData]);

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [startedTracked, setStartedTracked] = useState(false);
  const stepTitleRef = useRef<HTMLHeadingElement>(null);

  // Attribution tracking (lues une seule fois au montage)
  const [attribution, setAttribution] = useState({
    gclid: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    landing_page: "",
    referrer: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      gclid: params.get("gclid") || "",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      landing_page: window.location.pathname || "",
      referrer: document.referrer || "",
    });
  }, []);

  // Focus automatique sur le titre à chaque changement d'étape (accessibilité)
  useEffect(() => {
    stepTitleRef.current?.focus();
  }, [step]);

  const {
    checkRateLimit,
    recordAttempt,
  } = useRateLimit(RATE_LIMIT_CONFIG);

  const progress = (step / TOTAL_STEPS) * 100;

  // Active la persistance dès la première interaction si pas de draft
  useEffect(() => {
    if (!hasDraft) enablePersistence();
  }, [hasDraft, enablePersistence]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    let sanitized: string | boolean = value;
    if (typeof value === "string") {
      sanitized = field === "telephone" ? formatPhone(value) : sanitizeString(value);
    }
    setFormData((prev) => ({ ...prev, [field]: sanitized }));

    if (!startedTracked) {
      trackEvent("form_start", { form_id: "estimation" });
      setStartedTracked(true);
    }

    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const u = { ...prev };
        delete u[field];
        return u;
      });
    }
  };

  const runValidation = (
    runner: (data: Record<string, unknown>) => { success: boolean; error?: { errors: Array<{ path: (string | number)[]; message: string }> } },
  ) => {
    const result = runner(formData as unknown as Record<string, unknown>);
    if (!result.success && result.error) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setValidationErrors(errors);
      toast({
        title: "Champs invalides",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive",
      });
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const handleNext = () => {
    if (step === 1 && runValidation(validateStepA)) {
      trackEvent("form_step_complete", { step: 1 });
      setStep(2);
    } else if (step === 2 && runValidation(validateStepB)) {
      trackEvent("form_step_complete", { step: 2 });
      setStep(3);
    }
  };

  const handleBack = () => setStep(Math.max(1, step - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!runValidation(validateStep2)) return;

    if (!checkRateLimit()) {
      toast({
        title: "Trop de demandes",
        description: `Vous avez atteint la limite. Réessayez dans ${remainingTime} minute(s).`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const sanitizedData = {
        adresse: sanitizeString(formData.adresse),
        type: formData.type,
        surface: formData.surface,
        pieces: formData.pieces,
        chambres: formData.chambres,
        etat: formData.etat,
        annee: formData.annee,
        chauffage: formData.chauffage,
        exterieur: formData.exterieur,
        ville: sanitizeString(formData.ville),
        codePostal: formData.codePostal,
        nbLogements: formData.nbLogements,
        typesLogements: formData.typesLogements ? sanitizeString(formData.typesLogements) : "",
        meuble: formData.meuble,
        parkingExterieur: formData.parkingExterieur,
        parkingInterieur: formData.parkingInterieur,
        garage: formData.garage,
        dpe: formData.dpe,
        nom: sanitizeString(formData.nom),
        prenom: sanitizeString(formData.prenom),
        telephone: formData.telephone.replace(/\s/g, ""),
        email: formData.email.toLowerCase().trim(),
        gestion: formData.gestion,
        source: formData.source || (attribution.gclid ? "google-ads" : ""),
        gclid: attribution.gclid,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_term: attribution.utm_term,
        utm_content: attribution.utm_content,
        landing_page: attribution.landing_page,
        referrer: attribution.referrer,
        timestamp: new Date().toISOString(),
        source_form: "estimation-form",
      };

      const { data: fnData, error: fnError } = await supabase.functions.invoke(
        "submit-estimation",
        { body: sanitizedData },
      );

      if (!fnError && fnData?.ok) {
        recordAttempt();
        trackEvent("form_submit", { form_id: "estimation" });
        clear();
        toast({
          title: "✅ Demande envoyée !",
          description: "Votre estimation arrive par email dans quelques minutes.",
        });
        navigate("/merci", { state: { prenom: formData.prenom } });
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const remainingAttempts = getRemainingAttempts();

  const stepTitle =
    step === 1 ? "Votre bien en 30s" : step === 2 ? "Quelques détails" : "Vos coordonnées";
  const StepIcon = step === 3 ? Building2 : Home;

  return (
    <section id="estimation-form" className="py-16 bg-card">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Bandeau réassurance */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
            <Gift className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium">100% offert</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium">Email en quelques minutes</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
            <Shield className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium">Sans engagement de durée</span>
          </div>
          <a
            href="#avis-google"
            className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-sm hover:border-primary transition-colors"
          >
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 shrink-0" />
            <span className="font-medium">4,6/5 sur Google (136 avis)</span>
          </a>
        </div>

        {/* Banner de reprise de brouillon */}
        {hasDraft && (
          <Alert className="mb-6 border-primary/30 bg-primary/5">
            <RotateCcw className="h-4 w-4 text-primary" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
              <span>
                <strong>Reprendre votre estimation ?</strong> Nous avons sauvegardé votre brouillon.
              </span>
              <div className="flex gap-2">
                <Button size="sm" onClick={restore} className="bg-primary hover:bg-primary-dark">
                  Reprendre
                </Button>
                <Button size="sm" variant="outline" onClick={discardDraft}>
                  Recommencer
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card className="p-6 md:p-10 shadow-era border-2 border-primary/10 transition-all duration-500 hover:shadow-xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h2
                ref={stepTitleRef}
                tabIndex={-1}
                className="text-2xl md:text-3xl font-heading font-bold text-foreground flex items-center gap-3"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <StepIcon className="h-7 w-7 text-primary" />
                </div>
                <span className="animate-fade-in">{stepTitle}</span>
              </h2>
              <span
                aria-live="polite"
                className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full"
              >
                Étape {step}/{TOTAL_STEPS}
              </span>
            </div>
            <Progress value={progress} className="h-3 transition-all duration-500" />
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary" />
              {step === 1
                ? "Seulement 4 champs pour démarrer — moins d'une minute"
                : step === 2
                  ? "Ces détails affinent votre estimation (rapides à remplir)"
                  : "Dernière étape — recevez votre estimation par email"}
            </p>
          </div>

          {isBlocked && (
            <Alert className="border-destructive/50 bg-destructive/10 mb-4">
              <Clock className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm">
                <strong>Limite atteinte :</strong> Réessayez dans {remainingTime} minute(s).
              </AlertDescription>
            </Alert>
          )}

          {remainingAttempts <= 1 && remainingAttempts > 0 && (
            <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-900/10 mb-4">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Attention :</strong> Il vous reste {remainingAttempts} demande(s) cette heure.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ÉTAPE 1 — Essentiels */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="group">
                  <Label htmlFor="type" className="text-sm font-semibold flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    Type de bien *
                  </Label>
                  <Select value={formData.type} onValueChange={(v) => handleInputChange("type", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appartement">Appartement</SelectItem>
                      <SelectItem value="maison">Maison</SelectItem>
                      <SelectItem value="immeuble">Immeuble</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="local">Local commercial</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.type && (
                    <p className="text-xs text-destructive mt-1">{validationErrors.type}</p>
                  )}
                </div>

                {formData.type === "immeuble" && (
                  <>
                    <div>
                      <Label htmlFor="nbLogements">Nombre de logements *</Label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        value={formData.nbLogements}
                        onChange={(e) => handleInputChange("nbLogements", e.target.value)}
                        placeholder="Ex: 5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="typesLogements">Types de logements</Label>
                      <Input
                        value={formData.typesLogements}
                        onChange={(e) => handleInputChange("typesLogements", e.target.value)}
                        placeholder="Ex: 3 T2, 2 T3"
                      />
                    </div>
                  </>
                )}

                <div className="grid md:grid-cols-3 gap-4">
                  <CommuneAutocomplete
                    ville={formData.ville}
                    codePostal={formData.codePostal}
                    onVilleChange={(v) => handleInputChange("ville", v)}
                    onCodePostalChange={(v) => handleInputChange("codePostal", v)}
                    villeError={validationErrors.ville}
                    codePostalError={validationErrors.codePostal}
                  />
                  <div className="group">
                    <Label htmlFor="surface" className="flex items-center gap-2">
                      <Square className="h-4 w-4 text-primary" />
                      Surface (m²) *
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={formData.surface}
                      onChange={(e) => handleInputChange("surface", e.target.value)}
                      placeholder="75"
                      className={validationErrors.surface ? "border-destructive" : ""}
                    />
                    {validationErrors.surface && (
                      <p className="text-xs text-destructive mt-1">{validationErrors.surface}</p>
                    )}
                  </div>
                </div>

                <div className="group">
                  <Label htmlFor="pieces" className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    Nombre de pièces *
                  </Label>
                  <Select value={formData.pieces} onValueChange={(v) => handleInputChange("pieces", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4", "5", "6+"].map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.pieces && (
                    <p className="text-xs text-destructive mt-1">{validationErrors.pieces}</p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  Continuer
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {/* ÉTAPE 2 — Détails */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="group">
                  <Label htmlFor="adresse" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Adresse complète *
                  </Label>
                  <Input
                    value={formData.adresse}
                    onChange={(e) => handleInputChange("adresse", e.target.value)}
                    placeholder="12 rue de la République"
                    className={validationErrors.adresse ? "border-destructive" : ""}
                  />
                  {validationErrors.adresse && (
                    <p className="text-xs text-destructive mt-1">{validationErrors.adresse}</p>
                  )}
                </div>

                <p className="text-xs text-muted-foreground italic">
                  Les champs ci-dessous sont <strong>facultatifs</strong> mais améliorent la précision de l'estimation.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <Label htmlFor="chambres" className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-primary" />
                      Chambres
                    </Label>
                    <Select value={formData.chambres} onValueChange={(v) => handleInputChange("chambres", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {["0", "1", "2", "3", "4", "5+"].map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="group">
                    <Label htmlFor="etat">État général</Label>
                    <Select value={formData.etat} onValueChange={(v) => handleInputChange("etat", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neuf">Neuf</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="bon">Bon</SelectItem>
                        <SelectItem value="a-renover">À rénover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <Label htmlFor="annee" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Année de construction
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={formData.annee}
                      onChange={(e) => handleInputChange("annee", e.target.value)}
                      placeholder="2010"
                    />
                  </div>
                  <div className="group">
                    <Label htmlFor="chauffage" className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-primary" />
                      Chauffage
                    </Label>
                    <Select value={formData.chauffage} onValueChange={(v) => handleInputChange("chauffage", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gaz">Gaz</SelectItem>
                        <SelectItem value="electrique">Électrique</SelectItem>
                        <SelectItem value="fuel">Fioul</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <Label htmlFor="exterieur" className="flex items-center gap-2">
                      <Trees className="h-4 w-4 text-primary" />
                      Extérieurs
                    </Label>
                    <Select value={formData.exterieur} onValueChange={(v) => handleInputChange("exterieur", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aucun">Aucun</SelectItem>
                        <SelectItem value="balcon">Balcon</SelectItem>
                        <SelectItem value="terrasse">Terrasse</SelectItem>
                        <SelectItem value="jardin">Jardin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="group">
                    <Label htmlFor="meuble" className="flex items-center gap-2">
                      <Armchair className="h-4 w-4 text-primary" />
                      Meublé
                    </Label>
                    <Select value={formData.meuble} onValueChange={(v) => handleInputChange("meuble", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oui">Oui</SelectItem>
                        <SelectItem value="non">Non</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-muted/30 p-5 rounded-lg border border-primary/10">
                  <Label className="text-base font-semibold mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Stationnement
                  </Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="parkingExterieur" className="text-sm text-muted-foreground">
                        Parking extérieur
                      </Label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={formData.parkingExterieur}
                        onChange={(e) => handleInputChange("parkingExterieur", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parkingInterieur" className="text-sm text-muted-foreground">
                        Parking intérieur
                      </Label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={formData.parkingInterieur}
                        onChange={(e) => handleInputChange("parkingInterieur", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="garage" className="text-sm text-muted-foreground">
                        Garage
                      </Label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={formData.garage}
                        onChange={(e) => handleInputChange("garage", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="group">
                  <Label htmlFor="dpe" className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Diagnostic de Performance Énergétique (DPE)
                  </Label>
                  <Select value={formData.dpe} onValueChange={(v) => handleInputChange("dpe", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir la note DPE" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C", "D", "E", "F", "G"].map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                      <SelectItem value="non-renseigne">Non renseigné</SelectItem>
                    </SelectContent>
                  </Select>

                  {(formData.dpe === "F" || formData.dpe === "G") && (
                    <Alert className="mt-3 border-destructive/50 bg-destructive/10">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <AlertDescription className="text-sm">
                        <strong>Attention :</strong> Les logements classés F et G sont progressivement interdits à la location.
                        Nous vous proposons une <strong>étude personnalisée gratuite</strong> pour faire le point sur les travaux nécessaires.
                        <a
                          href="https://calendar.app.google/viMBcNbADyEeM4de6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2 text-primary font-semibold hover:underline"
                        >
                          📅 Prendre rendez-vous
                        </a>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button type="button" onClick={handleBack} variant="outline" size="lg" className="flex-1">
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Retour
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    Continuer
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 — Coordonnées */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <Alert className="border-primary/30 bg-primary/5">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-sm">
                    Plus qu'une étape ! Vos coordonnées nous permettent de vous envoyer votre estimation personnalisée.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      value={formData.nom}
                      onChange={(e) => handleInputChange("nom", e.target.value)}
                      placeholder="Dupont"
                      className={validationErrors.nom ? "border-destructive" : ""}
                    />
                    {validationErrors.nom && (
                      <p className="text-xs text-destructive mt-1">{validationErrors.nom}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      value={formData.prenom}
                      onChange={(e) => handleInputChange("prenom", e.target.value)}
                      placeholder="Marie"
                      className={validationErrors.prenom ? "border-destructive" : ""}
                    />
                    {validationErrors.prenom && (
                      <p className="text-xs text-destructive mt-1">{validationErrors.prenom}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    type="tel"
                    inputMode="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange("telephone", e.target.value)}
                    placeholder="06 12 34 56 78"
                    className={validationErrors.telephone ? "border-destructive" : ""}
                  />
                  {validationErrors.telephone && (
                    <p className="text-xs text-destructive mt-1">{validationErrors.telephone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="votre@email.fr"
                    className={validationErrors.email ? "border-destructive" : ""}
                  />
                  {validationErrors.email && (
                    <p className="text-xs text-destructive mt-1">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gestion">Type de gestion souhaité</Label>
                  <Select value={formData.gestion} onValueChange={(v) => handleInputChange("gestion", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complete">Gestion complète</SelectItem>
                      <SelectItem value="partielle">Gestion locative seule</SelectItem>
                      <SelectItem value="recherche">Recherche locataire uniquement</SelectItem>
                      <SelectItem value="pas-sur">Je ne sais pas encore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="source">Comment avez-vous connu ERA ?</Label>
                  <Select value={formData.source} onValueChange={(v) => handleInputChange("source", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir (optionnel)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="bouche-a-oreille">Bouche à oreille</SelectItem>
                      <SelectItem value="reseaux-sociaux">Réseaux sociaux</SelectItem>
                      <SelectItem value="panneau-vitrine">Panneau ou vitrine</SelectItem>
                      <SelectItem value="leboncoin">Leboncoin</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start space-x-2 bg-muted p-4 rounded-lg">
                  <Checkbox
                    id="rgpd"
                    checked={formData.rgpd}
                    onCheckedChange={(checked) => handleInputChange("rgpd", checked as boolean)}
                  />
                  <label htmlFor="rgpd" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    J'accepte que mes données soient utilisées par ERA DUPONT ROMAIN IMMOBILIER pour me recontacter au sujet de ma demande d'estimation. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. * Vos données sont conservées 3 ans maximum. En savoir plus dans notre{" "}
                    <a href="/confidentialite" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                      Politique de confidentialité
                    </a>.
                  </label>

                </div>
                {validationErrors.rgpd && (
                  <p className="text-xs text-destructive mt-1">{validationErrors.rgpd}</p>
                )}

                <div className="flex gap-3">
                  <Button type="button" onClick={handleBack} variant="outline" size="lg" className="flex-1">
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || isBlocked}
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    {loading ? "Envoi..." : "Recevoir mon estimation"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Card>

        {/* Mini-témoignage social proof */}
        <div className="mt-6 text-center text-sm text-muted-foreground italic">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
          </span>
          <span className="ml-2">
            « Estimation précise et équipe ultra-réactive » — un propriétaire à Perpignan
          </span>
        </div>
      </div>
    </section>
  );
};

export default EstimationForm;
