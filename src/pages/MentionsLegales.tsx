import { Link } from "react-router-dom";
import { ArrowLeft, Building2, CreditCard, Shield, Scale, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SeoHead from "@/components/SeoHead";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SeoHead
        title="Mentions légales | ERA DUPONT ROMAIN Perpignan"
        description="Mentions légales d'ERA DUPONT ROMAIN IMMOBILIER à Perpignan : informations société, carte professionnelle, RCS, contact et hébergeur."
        path="/mentions-legales"
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
          Mentions Légales
        </h1>

        <div className="space-y-8">
          {/* Informations société */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Informations sur la société</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p><strong className="text-foreground">Dénomination sociale :</strong> PERPIGNAN IMMOBILIER</p>
              <p><strong className="text-foreground">Nom commercial :</strong> ERA DUPONT ROMAIN IMMOBILIER</p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <span><strong className="text-foreground">Adresse du siège social :</strong> 2 rue Pierre Rameil, 66000 PERPIGNAN</span>
              </p>
              <p><strong className="text-foreground">Forme juridique :</strong> EURL</p>
              <p><strong className="text-foreground">Montant du capital social :</strong> 5 000 €</p>
              <p><strong className="text-foreground">N° SIREN :</strong> 530 560 697 RCS PERPIGNAN</p>
              <p><strong className="text-foreground">N° TVA intracommunautaire :</strong> FR82530560697</p>
            </div>
          </Card>

          {/* Cartes professionnelles */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Cartes professionnelles</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p><strong className="text-foreground">Carte Transaction :</strong> CPI 6601 2016 000 003 876 - CCI Perpignan</p>
              <p><strong className="text-foreground">Carte Gestion :</strong> [À COMPLÉTER — numéro de carte gestion] - CCI Perpignan</p>
            </div>
          </Card>

          {/* Garantie financière */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Garantie financière</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p><strong className="text-foreground">Nom et adresse du garant :</strong> GALIAN, 89 Rue La Boétie, 75008 PARIS</p>
              <p><strong className="text-foreground">Montant de la garantie financière :</strong> 120 000 €</p>
              <p><strong className="text-foreground">Détention de fonds :</strong> Oui</p>
              <p><strong className="text-foreground">Assurance responsabilité civile professionnelle :</strong> [À COMPLÉTER — nom de l'assureur et adresse]</p>
            </div>
          </Card>

          {/* Directeur de la publication */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Directeur de la publication</h2>
            </div>
            <p className="text-muted-foreground">Romain Dupont, gérant.</p>
          </Card>

          {/* Hébergeur */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Hébergeur</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Site hébergé par Lovable Labs Inc. —{" "}
                <a href="https://lovable.dev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  https://lovable.dev
                </a>
              </p>
              <p>Traitement des formulaires via Supabase Inc.</p>
              <p>Serveur d'automatisation hébergé par Hostinger International Ltd.</p>
            </div>
          </Card>


          {/* Médiation */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Médiation</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Tout client d'une agence immobilière ERA a la possibilité de saisir gratuitement un médiateur 
                en cas de litige avec celle-ci.
              </p>
              <Separator className="my-4" />
              <p className="font-semibold text-foreground">VIVONS MIEUX ENSEMBLE</p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <span>2 Impasse de Beauregard, 54000 Nancy</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:0661185097" className="hover:text-primary transition-colors">06 61 18 50 97</a>
              </p>
            </div>
          </Card>

          {/* Franchise */}
          <Card className="p-6 bg-muted/30">
            <p className="text-sm text-muted-foreground italic">
              Chaque agence franchisée ERA est juridiquement et financièrement indépendante.
            </p>
          </Card>

          {/* Contact */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Nous contacter</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:0468665718" className="hover:text-primary transition-colors whitespace-pre-line">{"\n"}04 68 66 57 18</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>2 rue Pierre Rameil, 66000 Perpignan</span>
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
