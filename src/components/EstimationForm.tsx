import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, Home, Building2, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
  nbLogements: string;
  typesLogements: string;
  meuble: string;
  parkingExterieur: string;
  parkingInterieur: string;
  garage: string;
  // Owner details
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  gestion: string;
  rgpd: boolean;
}

const EstimationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    nbLogements: "",
    typesLogements: "",
    meuble: "",
    parkingExterieur: "",
    parkingInterieur: "",
    garage: "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    gestion: "",
    rgpd: false,
  });

  const progress = (step / 2) * 100;

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    const required = ['adresse', 'type', 'surface', 'pieces', 'ville'];
    const missing = required.filter(field => !formData[field as keyof FormData]);
    
    if (missing.length > 0) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const required = ['nom', 'prenom', 'telephone', 'email'];
    const missing = required.filter(field => !formData[field as keyof FormData]);
    
    if (missing.length > 0) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous vos coordonnées.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.rgpd) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter la politique de confidentialité.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setLoading(true);

    try {
      const response = await fetch('https://n8n.srv864634.hstgr.cloud/webhook/c15fe03b-332b-405e-b285-3c660fb06c0e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'estimation-form'
        }),
      });

      if (response.ok) {
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

  return (
    <section id="estimation-form" className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-6 md:p-10 shadow-era">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                {step === 1 ? (
                  <><Home className="inline mr-2 h-7 w-7 text-primary" />Votre bien</>
                ) : (
                  <><Building2 className="inline mr-2 h-7 w-7 text-primary" />Vos coordonnées</>
                )}
              </h2>
              <span className="text-sm text-muted-foreground">
                Étape {step}/2
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="type" className="text-sm font-semibold">Type de bien *</Label>
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

                <div>
                  <Label htmlFor="adresse">Adresse complète *</Label>
                  <Input
                    value={formData.adresse}
                    onChange={(e) => handleInputChange('adresse', e.target.value)}
                    placeholder="12 rue de la République"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ville">Ville *</Label>
                    <Input
                      value={formData.ville}
                      onChange={(e) => handleInputChange('ville', e.target.value)}
                      placeholder="Perpignan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="surface">Surface (m²) *</Label>
                    <Input
                      type="number"
                      value={formData.surface}
                      onChange={(e) => handleInputChange('surface', e.target.value)}
                      placeholder="75"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pieces">Nombre de pièces *</Label>
                    <Select value={formData.pieces} onValueChange={(val) => handleInputChange('pieces', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {['1', '2', '3', '4', '5', '6+'].map(n => (
                          <SelectItem key={n} value={n}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="chambres">Chambres</Label>
                    <Select value={formData.chambres} onValueChange={(val) => handleInputChange('chambres', val)}>
                      <SelectTrigger>
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
                  <div>
                    <Label htmlFor="etat">État général</Label>
                    <Select value={formData.etat} onValueChange={(val) => handleInputChange('etat', val)}>
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
                  <div>
                    <Label htmlFor="annee">Année de construction</Label>
                    <Input
                      type="number"
                      value={formData.annee}
                      onChange={(e) => handleInputChange('annee', e.target.value)}
                      placeholder="2010"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="chauffage">Chauffage</Label>
                    <Select value={formData.chauffage} onValueChange={(val) => handleInputChange('chauffage', val)}>
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
                  <div>
                    <Label htmlFor="exterieur">Extérieurs</Label>
                    <Select value={formData.exterieur} onValueChange={(val) => handleInputChange('exterieur', val)}>
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
                </div>

                <div>
                  <Label htmlFor="meuble">Meublé</Label>
                  <Select value={formData.meuble} onValueChange={(val) => handleInputChange('meuble', val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oui">Oui</SelectItem>
                      <SelectItem value="non">Non</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Stationnement</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="parkingExterieur" className="text-sm">Parking extérieur</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.parkingExterieur}
                        onChange={(e) => handleInputChange('parkingExterieur', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parkingInterieur" className="text-sm">Parking intérieur</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.parkingInterieur}
                        onChange={(e) => handleInputChange('parkingInterieur', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="garage" className="text-sm">Garage</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.garage}
                        onChange={(e) => handleInputChange('garage', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
                >
                  Suivant
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      placeholder="Dupont"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      value={formData.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      placeholder="Marie"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    placeholder="06 XX XX XX XX"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre@email.fr"
                  />
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
                    className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
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