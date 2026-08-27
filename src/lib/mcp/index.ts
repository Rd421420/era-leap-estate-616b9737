import { auth, defineMcp } from "@lovable.dev/mcp-js";
import agencyInfoTool from "./tools/agency-info";
import submitEstimationTool from "./tools/submit-estimation";

export default defineMcp({
  name: "era-dupont-romain-mcp",
  title: "ERA Dupont Romain — Estimation locative",
  version: "0.1.0",
  instructions:
    "Outils de l'agence ERA Dupont Romain (Perpignan, Pyrénées-Orientales). Utilise `get_agency_info` pour obtenir les coordonnées et prestations, et `submit_estimation` pour transmettre une demande d'estimation locative à l'agence (réponse sous 24 h). Accès réservé aux clients authentifiés.",
  auth: auth.oauth.issuer({
    issuer: "https://ticlsjtqihljeixwzeqx.supabase.co/auth/v1",
    acceptedAudiences: "authenticated",
    resourceName: "ERA Dupont Romain — MCP",
  }),
  tools: [agencyInfoTool, submitEstimationTool],
});

