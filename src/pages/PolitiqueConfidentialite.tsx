import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Database, Clock, UserCheck, Mail, Cookie, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SeoHead from "@/components/SeoHead";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SeoHead
        title="Politique de confidentialité | ERA DUPONT ROMAIN"
        description="Politique de confidentialité d'ERA DUPONT ROMAIN IMMOBILIER : données collectées, finalités, durée de conservation, droits RGPD et contact DPO."
        path="/confidentialite"
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
          Politique de Confidentialité
        </h1>
        <p className="text-lg text-muted-foreground mb-1">Données Personnelles</p>
        <p className="text-sm text-muted-foreground mb-8">
          Dernière mise à jour : 21 août 2026
        </p>

        <div className="space-y-8">
          {/* Qui sommes-nous */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Qui sommes-nous ?</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                La société <strong className="text-foreground">PERPIGNAN IMMOBILIER (nom commercial : ERA DUPONT ROMAIN IMMOBILIER)</strong>,<br />
                EURL au capital social de 5.000 €,<br />
                dont le siège social est situé 2 rue Pierre Rameil, 66000 Perpignan,<br />
                immatriculée au RCS de Perpignan sous le numéro 530 560 697 00043,<br />
                exerce une activité d'agence immobilière sous l'enseigne ERA Immobilier.
              </p>
              <p>
                L'agence PERPIGNAN IMMOBILIER (nom commercial : ERA DUPONT ROMAIN IMMOBILIER) est juridiquement et financièrement indépendante.
                Elle appartient au réseau de franchise ERA Immobilier sans lien de subordination juridique 
                ou financière avec ERA France.
              </p>
              <p>
                La présente politique de confidentialité a pour objet d'informer les utilisateurs du site{" "}
                <a href="https://era-dupontromain.immo" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  https://era-dupontromain.immo
                </a>{" "}
                des modalités de collecte, d'utilisation et de protection de leurs données à caractère personnel.
              </p>
            </div>
          </Card>


          {/* Cadre légal */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Cadre légal</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Conformément :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>à la loi n°78-17 du 6 janvier 1978 modifiée (Informatique et Libertés),</li>
                <li>au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD),</li>
              </ul>
              <p>
                ERA DUPONT ROMAIN IMMOBILIER, en qualité de responsable de traitement, met en œuvre toutes 
                les mesures techniques et organisationnelles appropriées afin de garantir la confidentialité, 
                la sécurité et l'intégrité des données personnelles traitées.
              </p>
            </div>
          </Card>

          {/* Comment et pourquoi */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Comment et pourquoi vos données sont-elles collectées ?</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Les données personnelles sont collectées lorsque vous :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>remplissez un formulaire de contact ou d'estimation,</li>
                <li>demandez à être recontacté,</li>
                <li>sollicitez une estimation de logement,</li>
                <li>communiquez avec l'agence par email ou téléphone.</li>
              </ul>
              <p>Les données collectées sont strictement nécessaires au traitement de votre demande.</p>
              
              <Separator className="my-4" />
              
              <p className="font-semibold text-foreground">Données collectées :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nom</li>
                <li>Prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse du logement à estimer</li>
                <li>Informations liées à votre projet immobilier</li>
              </ul>
              <p className="text-sm italic">
                Les champs obligatoires sont signalés lors de la saisie. À défaut, la demande ne pourra pas être traitée.
              </p>
            </div>
          </Card>

          {/* Outils et moyens */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Outils et moyens de traitement</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Les traitements sont réalisés :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>via des webhooks automatisés (outil n8n),</li>
                <li>sur un serveur VPS hébergé chez Hostinger,</li>
                <li>avec un stockage sécurisé sur Google Drive et Google Sheets (Google Workspace).</li>
              </ul>
              <p>Ces outils sont utilisés exclusivement pour le fonctionnement interne de l'agence.</p>
            </div>
          </Card>

          {/* Destinataires */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Qui est destinataire de vos données ?</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Les données collectées sont destinées exclusivement à <strong className="text-foreground">ERA DUPONT ROMAIN IMMOBILIER</strong>.
              </p>
              <p className="font-semibold text-primary">
                👉 Aucune donnée n'est vendue, cédée ou transmise à des tiers à des fins commerciales.
              </p>
              <p>Les données peuvent être accessibles :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>aux membres habilités de l'agence,</li>
                <li>aux prestataires techniques agissant en qualité de sous-traitants (hébergement, automatisation), 
                    uniquement dans le cadre strict de leur mission.</li>
              </ul>
            </div>
          </Card>

          {/* Finalités et base légale */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Finalités et base légale des traitements</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Finalité</TableHead>
                    <TableHead>Catégories de données</TableHead>
                    <TableHead>Base légale</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Mise en relation et suivi de projet immobilier</TableCell>
                    <TableCell>Données d'identification et projet immobilier</TableCell>
                    <TableCell>Consentement</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Estimation de biens immobiliers</TableCell>
                    <TableCell>Adresse, caractéristiques du bien</TableCell>
                    <TableCell>Consentement</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Communication et échanges avec l'agence</TableCell>
                    <TableCell>Nom, email, téléphone</TableCell>
                    <TableCell>Intérêt légitime</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gestion administrative interne</TableCell>
                    <TableCell>Données de contact</TableCell>
                    <TableCell>Intérêt légitime</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Respect des obligations légales</TableCell>
                    <TableCell>Données nécessaires à l'activité d'agent immobilier</TableCell>
                    <TableCell>Obligation légale</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Durée de conservation */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Durée de conservation des données</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Les données sont conservées :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-foreground">Prospects :</strong> 3 ans à compter du dernier contact,</li>
                <li><strong className="text-foreground">Clients :</strong> durée légale liée aux obligations comptables et contractuelles,</li>
                <li><strong className="text-foreground">Demandes RGPD :</strong> durée nécessaire au traitement et à l'archivage légal.</li>
              </ul>
            </div>
          </Card>

          {/* Vos droits */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Vos droits</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>droit d'accès,</li>
                <li>droit de rectification,</li>
                <li>droit d'effacement,</li>
                <li>droit à la limitation,</li>
                <li>droit à la portabilité,</li>
                <li>droit d'opposition.</li>
              </ul>
              
              <Separator className="my-4" />
              
              <p className="font-semibold text-foreground">Vous pouvez exercer vos droits :</p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email : </span>
                <a href="mailto:dupontimmobilier@erafrance.com" className="text-primary hover:underline">
                  dupontimmobilier@erafrance.com
                </a>
              </p>
              <p>📮 Courrier : ERA DUPONT ROMAIN IMMOBILIER – 2 rue Pierre Rameil, 66000 Perpignan</p>
              <p className="text-sm italic">Toute demande doit être accompagnée d'un justificatif d'identité.</p>
              <p>
                En cas de litige, vous pouvez saisir la CNIL :{" "}
                <a href="https://www.cnil.fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  www.cnil.fr
                </a>
              </p>
            </div>
          </Card>

          {/* Opposition au démarchage */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Opposition au démarchage</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>Pour les emails ou SMS, un lien de désinscription est présent ou vous pouvez contacter l'agence.</p>
              <p>
                Pour le démarchage téléphonique, vous pouvez vous inscrire sur :{" "}
                <a href="https://www.bloctel.gouv.fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  👉 www.bloctel.gouv.fr
                </a>
              </p>
            </div>
          </Card>

          {/* Données des mineurs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Données des mineurs</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>Le site ne s'adresse pas aux personnes de moins de 16 ans.</p>
              <p>Aucune collecte volontaire de données concernant des mineurs n'est autorisée.</p>
            </div>
          </Card>

          {/* Cookies */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Cookies</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Le site peut utiliser des cookies à des fins :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>techniques,</li>
                <li>de mesure d'audience,</li>
                <li>d'amélioration de l'expérience utilisateur.</li>
              </ul>
              <p>Les cookies ne permettent pas de vous identifier personnellement.</p>
              <p>Un bandeau de gestion du consentement permet d'accepter ou refuser les cookies non essentiels.</p>
              <p>Vous pouvez également configurer votre navigateur pour bloquer les cookies.</p>
            </div>
          </Card>

          {/* Conclusion */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <p className="text-center text-muted-foreground">
              ✔️ Cette politique est <strong className="text-foreground">conforme RGPD</strong>, 
              cohérente avec un site automatisé et adaptée à une agence immobilière de gestion/location.
            </p>
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

export default PolitiqueConfidentialite;
