import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, ChevronLeft, Home, Building2, Send, MapPin, Square, Bed, Calendar, Thermometer, Trees, Armchair, Car, Zap, AlertTriangle, Clock } from "lucide-react";
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
import { validateStep1, validateStep2, sanitizeString } from "@/lib/formValidation";

interface FormData {
  // Property details
  adresse: string;
  type: string;
  surface: string;
  pieces: string;
  chambres: string;
  etat: string;
  annee: string;
  chauffage: string;
  exterieur: string;
  ville: string;
  codePostal: string;
  nbLogements: string;
  typesLogements: string;
  meuble: string;
  parkingExterieur: string;
  parkingInterieur: string;
  garage: string;
  dpe: string;
  // Owner details
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  gestion: string;
  rgpd: boolean;
}

// Rate limit: 3 submissions per hour
const RATE_LIMIT_CONFIG = {
  maxAttempts: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  storageKey: "era_estimation_rate_limit",
};

const EstimationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { checkRateLimit, recordAttempt, isBlocked, remainingTime, getRemainingAttempts } = useRateLimit(RATE_LIMIT_CONFIG);
  
  const [formData, setFormData] = useState<FormData>({
    adresse: "",
    type: "",
    surface: "",
    pieces: "",
    chambres: "",
    etat: "",
    annee: "",
    chauffage: "",
    exterieur: "",
    ville: "",
    codePostal: "",
    nbLogements: "",
    typesLogements: "",
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
    rgpd: false,
  });

  const progress = (step / 2) * 100;

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    // Sanitize string inputs
    const sanitizedValue = typeof value === "string" ? sanitizeString(value) : value;
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleValidateStep1 = () => {
    const result = validateStep1(formData as unknown as Record<string, unknown>);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
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

  const handleValidateStep2 = () => {
    const result = validateStep2(formData as unknown as Record<string, unknown>);
    
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
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
    if (step === 1 && handleValidateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!handleValidateStep2()) return;

    // Check rate limit before submission
    if (!checkRateLimit()) {
      toast({
        title: "Trop de demandes",
        description: `Vous avez atteint la limite de soumissions. Veuillez réessayer dans ${remainingTime} minute(s).`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare sanitized data for submission
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
        timestamp: new Date().toISOString(),
        source: 'estimation-form'
      };

      const response = await fetch('https://n8n.srv864634.hstgr.cloud/webhook/c15fe03b-332b-405e-b285-3c660fb06c0e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        // Record successful attempt for rate limiting
        recordAttempt();
        
        toast({
          title: "✅ Demande envoyée !",
          description: "Votre estimation arrive dans quelques instants par email.",
        });
        navigate('/merci', { state: { prenom: formData.prenom } });
      } else {
        throw new Error('Erreur serveur');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show rate limit warning
  const remainingAttempts = getRemainingAttempts();

  return (
    <section id="estimation-form" className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-6 md:p-10 shadow-era border-2 border-primary/10 transition-all duration-500 hover:shadow-xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground flex items-center gap-3">
                {step === 1 ? (
                  <>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Home className="h-7 w-7 text-primary" />
                    </div>
                    <span className="animate-fade-in">Votre bien</span>
                  </>
                ) : (
                  <>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="h-7 w-7 text-primary" />
                    </div>
                    <span className="animate-fade-in">Vos coordonnées</span>
                  </>
                )}
              </h2>
              <span className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full">
                Étape {step}/2
              </span>
            </div>
            <Progress value={progress} className="h-3 transition-all duration-500" />
          </div>

          {/* Rate limit warning */}
          {isBlocked && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <Clock className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm">
                <strong>Limite atteinte :</strong> Vous avez effectué trop de demandes. 
                Veuillez réessayer dans {remainingTime} minute(s).
              </AlertDescription>
            </Alert>
          )}
          
          {remainingAttempts <= 1 && remainingAttempts > 0 && (
            <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-900/10">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Attention :</strong> Il vous reste {remainingAttempts} demande(s) disponible(s) cette heure.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="group">
                  <Label htmlFor="type" className="text-sm font-semibold flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    Type de bien *
                  </Label>
                  <Select value={formData.type} onValueChange={(val) => handleInputChange('type', val)}>
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
                </div>

                {formData.type === 'immeuble' && (
                  <>
                    <div>
                      <Label htmlFor="nbLogements">Nombre de logements *</Label>
                      <Input
                        type="number"
                        value={formData.nbLogements}
                        onChange={(e) => handleInputChange('nbLogements', e.target.value)}
                        placeholder="Ex: 5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="typesLogements">Types de logements</Label>
                      <Input
                        value={formData.typesLogements}
                        onChange={(e) => handleInputChange('typesLogements', e.target.value)}
                        placeholder="Ex: 3 T2, 2 T3"
                      />
                    </div>
                  </>
                )}

                <div className="group">
                  <Label htmlFor="adresse" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Adresse complète *
                  </Label>
                  <Input
                    value={formData.adresse}
                    onChange={(e) => handleInputChange('adresse', e.target.value)}
                    placeholder="12 rue de la République"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <CommuneAutocomplete
                    ville={formData.ville}
                    codePostal={formData.codePostal}
                    onVilleChange={(val) => handleInputChange('ville', val)}
                    onCodePostalChange={(val) => handleInputChange('codePostal', val)}
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
                      value={formData.surface}
                      onChange={(e) => handleInputChange('surface', e.target.value)}
                      placeholder="75"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <Label htmlFor="pieces" className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-primary" />
                      Nombre de pièces *
                    </Label>
                    <Select value={formData.pieces} onValueChange={(val) => handleInputChange('pieces', val)}>
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {['1', '2', '3', '4', '5', '6+'].map(n => (
                          <SelectItem key={n} value={n}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="group">
                    <Label htmlFor="chambres" className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-primary" />
                      Chambres
                    </Label>
                    <Select value={formData.chambres} onValueChange={(val) => handleInputChange('chambres', val)}>
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {['0', '1', '2', '3', '4', '5+'].map(n => (
                          <SelectItem key={n} value={n}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <Label htmlFor="etat">État général</Label>
                    <Select value={formData.etat} onValueChange={(val) => handleInputChange('etat', val)}>
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
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
                  <div className="group">
                    <Label htmlFor="annee" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Année de construction
                    </Label>
                    <Input
                      type="number"
                      value={formData.annee}
                      onChange={(e) => handleInputChange('annee', e.target.value)}
                      placeholder="2010"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <Label htmlFor="chauffage" className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-primary" />
                      Chauffage
                    </Label>
                    <Select value={formData.chauffage} onValueChange={(val) => handleInputChange('chauffage', val)}>
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
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
                  <div className="group">
                    <Label htmlFor="exterieur" className="flex items-center gap-2">
                      <Trees className="h-4 w-4 text-primary" />
                      Extérieurs
                    </Label>
                    <Select value={formData.exterieur} onValueChange={(val) => handleInputChange('exterieur', val)}>
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
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
                </div>

                <div className="group">
                  <Label htmlFor="meuble" className="flex items-center gap-2">
                    <Armchair className="h-4 w-4 text-primary" />
                    Meublé
                  </Label>
                  <Select value={formData.meuble} onValueChange={(val) => handleInputChange('meuble', val)}>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oui">Oui</SelectItem>
                      <SelectItem value="non">Non</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="group">
                  <Label htmlFor="dpe" className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Diagnostic de Performance Énergétique (DPE)
                  </Label>
                  <Select value={formData.dpe} onValueChange={(val) => handleInputChange('dpe', val)}>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Choisir la note DPE" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                      <SelectItem value="non-renseigne">Non renseigné</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {(formData.dpe === 'F' || formData.dpe === 'G') && (
                    <Alert className="mt-3 border-destructive/50 bg-destructive/10">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <AlertDescription className="text-sm">
                        <strong>Attention :</strong> Les logements classés F et G sont progressivement interdits à la location. 
                        Nous vous proposons une <strong>étude personnalisée gratuite</strong> pour faire le point sur les travaux nécessaires 
                        et vous accompagner dans l'amélioration de votre note DPE à moindre frais.
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

                <div className="bg-muted/30 p-5 rounded-lg border border-primary/10">
                  <Label className="text-base font-semibold mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Stationnement
                  </Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="group">
                      <Label htmlFor="parkingExterieur" className="text-sm text-muted-foreground">Parking extérieur</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.parkingExterieur}
                        onChange={(e) => handleInputChange('parkingExterieur', e.target.value)}
                        placeholder="0"
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="group">
                      <Label htmlFor="parkingInterieur" className="text-sm text-muted-foreground">Parking intérieur</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.parkingInterieur}
                        onChange={(e) => handleInputChange('parkingInterieur', e.target.value)}
                        placeholder="0"
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="group">
                      <Label htmlFor="garage" className="text-sm text-muted-foreground">Garage</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.garage}
                        onChange={(e) => handleInputChange('garage', e.target.value)}
                        placeholder="0"
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  Suivant
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
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
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
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
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder="06 XX XX XX XX"
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
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre@email.fr"
                    className={validationErrors.email ? "border-destructive" : ""}
                  />
                  {validationErrors.email && (
                    <p className="text-xs text-destructive mt-1">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gestion">Type de gestion souhaité</Label>
                  <Select value={formData.gestion} onValueChange={(val) => handleInputChange('gestion', val)}>
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

                <div className="flex items-start space-x-2 bg-muted p-4 rounded-lg">
                  <Checkbox
                    id="rgpd"
                    checked={formData.rgpd}
                    onCheckedChange={(checked) => handleInputChange('rgpd', checked as boolean)}
                  />
                  <label
                    htmlFor="rgpd"
                    className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    J'accepte que mes données soient utilisées par ERA DUPONT ROMAIN IMMOBILIER pour me recontacter au sujet de ma demande d'estimation. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. *
                  </label>
                </div>
                {validationErrors.rgpd && (
                  <p className="text-xs text-destructive mt-1">{validationErrors.rgpd}</p>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
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
      </div>
    </section>
  );
};

export default EstimationForm;