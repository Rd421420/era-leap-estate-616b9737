import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import LouerDpeFG from "./pages/LouerDpeFG";
import LoyersImpayes from "./pages/LoyersImpayes";
import VacanceLocative from "./pages/VacanceLocative";
import GestionLocative from "./pages/GestionLocative";
import DeleguerOuGerer from "./pages/DeleguerOuGerer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/louer-bien-dpe-f-g-perpignan" element={<LouerDpeFG />} />
            <Route path="/loyers-impayes-perpignan" element={<LoyersImpayes />} />
            <Route path="/logement-ne-se-loue-pas-perpignan" element={<VacanceLocative />} />
            <Route path="/gestion-locative-perpignan" element={<GestionLocative />} />
            <Route path="/deleguer-ou-gerer-soi-meme" element={<DeleguerOuGerer />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          </Route>
          <Route path="/merci" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;