 import { useState, useRef, useEffect } from "react";
 import { Input } from "@/components/ui/input";
 import { cn } from "@/lib/utils";
 import { Commune, findCommunesByName, findCommunesByPostalCode, findExactCommune } from "@/lib/communesData";
 import { MapPin } from "lucide-react";
 
 interface CommuneAutocompleteProps {
   ville: string;
   codePostal: string;
   onVilleChange: (value: string) => void;
   onCodePostalChange: (value: string) => void;
   villeError?: string;
   codePostalError?: string;
 }
 
 export const CommuneAutocomplete = ({
   ville,
   codePostal,
   onVilleChange,
   onCodePostalChange,
   villeError,
   codePostalError,
 }: CommuneAutocompleteProps) => {
   const [villeSuggestions, setVilleSuggestions] = useState<Commune[]>([]);
   const [codePostalSuggestions, setCodePostalSuggestions] = useState<Commune[]>([]);
   const [showVilleSuggestions, setShowVilleSuggestions] = useState(false);
   const [showCodePostalSuggestions, setShowCodePostalSuggestions] = useState(false);
   
   const villeRef = useRef<HTMLDivElement>(null);
   const codePostalRef = useRef<HTMLDivElement>(null);
 
   // Handle click outside to close suggestions
   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (villeRef.current && !villeRef.current.contains(event.target as Node)) {
         setShowVilleSuggestions(false);
       }
       if (codePostalRef.current && !codePostalRef.current.contains(event.target as Node)) {
         setShowCodePostalSuggestions(false);
       }
     };
 
     document.addEventListener("mousedown", handleClickOutside);
     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);
 
   const handleVilleChange = (value: string) => {
     onVilleChange(value);
     
     if (value.length >= 2) {
       const suggestions = findCommunesByName(value);
       setVilleSuggestions(suggestions);
       setShowVilleSuggestions(suggestions.length > 0);
     } else {
       setVilleSuggestions([]);
       setShowVilleSuggestions(false);
     }
   };
 
   const handleCodePostalChange = (value: string) => {
     // Only allow numbers and max 5 chars
     const cleanValue = value.replace(/\D/g, "").slice(0, 5);
     onCodePostalChange(cleanValue);
     
     if (cleanValue.length === 5) {
       const suggestions = findCommunesByPostalCode(cleanValue);
       setCodePostalSuggestions(suggestions);
       setShowCodePostalSuggestions(suggestions.length > 0);
       
       // Auto-fill if only one commune matches
       if (suggestions.length === 1 && !ville) {
         onVilleChange(suggestions[0].nom);
         setShowCodePostalSuggestions(false);
       }
     } else {
       setCodePostalSuggestions([]);
       setShowCodePostalSuggestions(false);
     }
   };
 
   const selectVille = (commune: Commune) => {
     onVilleChange(commune.nom);
     onCodePostalChange(commune.codePostal);
     setShowVilleSuggestions(false);
   };
 
   const selectCodePostal = (commune: Commune) => {
     onVilleChange(commune.nom);
     onCodePostalChange(commune.codePostal);
     setShowCodePostalSuggestions(false);
   };
 
   const handleVilleBlur = () => {
     // Delay to allow click on suggestion
     setTimeout(() => {
       setShowVilleSuggestions(false);
       
       // If exact match found, auto-fill postal code
       if (ville && !codePostal) {
         const exactMatch = findExactCommune(ville);
         if (exactMatch) {
           onCodePostalChange(exactMatch.codePostal);
         }
       }
     }, 150);
   };
 
   return (
     <>
       {/* Ville with autocomplete */}
       <div className="group relative" ref={villeRef}>
         <label htmlFor="ville" className="text-sm font-semibold flex items-center gap-2 mb-2">
           <MapPin className="h-4 w-4 text-primary" />
           Ville *
         </label>
         <Input
           id="ville"
           value={ville}
           onChange={(e) => handleVilleChange(e.target.value)}
           onFocus={() => ville.length >= 2 && setShowVilleSuggestions(villeSuggestions.length > 0)}
           onBlur={handleVilleBlur}
           placeholder="Perpignan"
           className={cn(
             "transition-all focus:ring-2 focus:ring-primary/20",
             villeError && "border-destructive"
           )}
           autoComplete="off"
         />
         {villeError && <p className="text-sm text-destructive mt-1">{villeError}</p>}
         
         {/* Suggestions dropdown */}
         {showVilleSuggestions && villeSuggestions.length > 0 && (
           <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
             {villeSuggestions.map((commune, idx) => (
               <button
                 key={`${commune.nom}-${idx}`}
                 type="button"
                 className="w-full px-3 py-2 text-left hover:bg-muted flex items-center justify-between text-sm"
                 onMouseDown={() => selectVille(commune)}
               >
                 <span className="font-medium">{commune.nom}</span>
                 <span className="text-muted-foreground">{commune.codePostal}</span>
               </button>
             ))}
           </div>
         )}
       </div>
 
       {/* Code postal with autocomplete */}
       <div className="group relative" ref={codePostalRef}>
         <label htmlFor="codePostal" className="text-sm font-semibold flex items-center gap-2 mb-2">
           <MapPin className="h-4 w-4 text-primary" />
           Code postal *
         </label>
         <Input
           id="codePostal"
           type="text"
           inputMode="numeric"
           value={codePostal}
           onChange={(e) => handleCodePostalChange(e.target.value)}
           onFocus={() => codePostal.length === 5 && setShowCodePostalSuggestions(codePostalSuggestions.length > 0)}
           onBlur={() => setTimeout(() => setShowCodePostalSuggestions(false), 150)}
           placeholder="66000"
           maxLength={5}
           className={cn(
             "transition-all focus:ring-2 focus:ring-primary/20",
             codePostalError && "border-destructive"
           )}
           autoComplete="off"
         />
         {codePostalError && <p className="text-sm text-destructive mt-1">{codePostalError}</p>}
         
         {/* Suggestions dropdown for multiple communes with same postal code */}
         {showCodePostalSuggestions && codePostalSuggestions.length > 1 && (
           <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
             {codePostalSuggestions.map((commune, idx) => (
               <button
                 key={`${commune.nom}-${idx}`}
                 type="button"
                 className="w-full px-3 py-2 text-left hover:bg-muted flex items-center justify-between text-sm"
                 onMouseDown={() => selectCodePostal(commune)}
               >
                 <span className="font-medium">{commune.nom}</span>
                 <span className="text-muted-foreground">{commune.codePostal}</span>
               </button>
             ))}
           </div>
         )}
       </div>
     </>
   );
 };