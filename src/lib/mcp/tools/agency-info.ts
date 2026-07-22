import { defineTool } from "@lovable.dev/mcp-js";

const AGENCY = {
  name: "ERA DUPONT ROMAIN IMMOBILIER",
  brand: "ERA Dupont Romain",
  phone: "04 68 66 57 18",
  phoneE164: "+33468665718",
  website: "https://era-dupontromain.immo",
  city: "Perpignan",
  region: "Pyrénées-Orientales (66)",
  country: "France",
  services: [
    "Estimation locative offerte",
    "Gestion locative",
    "Mise en location",
    "Accompagnement propriétaires (DPE F/G, loyers impayés, vacance locative)",
  ],
  googleReviews: { rating: 4.6, count: 136 },
};

export default defineTool({
  name: "get_agency_info",
  title: "Informations sur l'agence ERA Dupont Romain",
  description:
    "Retourne les coordonnées et services de l'agence ERA Dupont Romain (Perpignan et Pyrénées-Orientales) : téléphone, site web, zone d'intervention, note Google et prestations proposées.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: () => ({
    content: [
      {
        type: "text" as const,
        text:
          `${AGENCY.name}\n` +
          `Téléphone : ${AGENCY.phone}\n` +
          `Site : ${AGENCY.website}\n` +
          `Zone : ${AGENCY.city}, ${AGENCY.region}, ${AGENCY.country}\n` +
          `Avis Google : ${AGENCY.googleReviews.rating}/5 (${AGENCY.googleReviews.count} avis)\n` +
          `Services : ${AGENCY.services.join(", ")}`,
      },
    ],
    structuredContent: AGENCY,
  }),
});
