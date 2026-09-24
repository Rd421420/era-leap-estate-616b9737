 // Communes des Pyrénées-Orientales avec leurs codes postaux et variantes
 export interface Commune {
   nom: string;
   codePostal: string;
   variantes: string[];
 }
 
export const communes: Commune[] = [
  // 226 communes des Pyrénées-Orientales — source officielle geo.api.gouv.fr (COG INSEE), septembre 2026
  { nom: "Alénya", codePostal: "66200", variantes: ["Alenya"] },
  { nom: "Amélie-les-Bains-Palalda", codePostal: "66110", variantes: ["Amelie les Bains Palalda", "Amélie les Bains"] },
  { nom: "Angoustrine-Villeneuve-des-Escaldes", codePostal: "66760", variantes: [] },
  { nom: "Ansignan", codePostal: "66220", variantes: [] },
  { nom: "Arboussols", codePostal: "66320", variantes: [] },
  { nom: "Argelès-sur-Mer", codePostal: "66700", variantes: ["Argeles Plage", "Argeles-sur-Mer", "Argelès sur Mer"] },
  { nom: "Arles-sur-Tech", codePostal: "66150", variantes: ["Arles sur Tech"] },
  { nom: "Ayguatébia-Talau", codePostal: "66360", variantes: [] },
  { nom: "Bages", codePostal: "66670", variantes: [] },
  { nom: "Baho", codePostal: "66540", variantes: [] },
  { nom: "Baillestavy", codePostal: "66320", variantes: [] },
  { nom: "Baixas", codePostal: "66390", variantes: [] },
  { nom: "Banyuls-dels-Aspres", codePostal: "66300", variantes: [] },
  { nom: "Banyuls-sur-Mer", codePostal: "66650", variantes: ["Banyuls sur Mer"] },
  { nom: "Bélesta", codePostal: "66720", variantes: [] },
  { nom: "Bolquère", codePostal: "66210", variantes: ["Bolquere"] },
  { nom: "Bompas", codePostal: "66430", variantes: [] },
  { nom: "Boule-d'Amont", codePostal: "66130", variantes: ["Boule-d Amont"] },
  { nom: "Bouleternère", codePostal: "66130", variantes: [] },
  { nom: "Bourg-Madame", codePostal: "66760", variantes: [] },
  { nom: "Brouilla", codePostal: "66620", variantes: [] },
  { nom: "Cabestany", codePostal: "66330", variantes: [] },
  { nom: "Caixas", codePostal: "66300", variantes: [] },
  { nom: "Calce", codePostal: "66600", variantes: [] },
  { nom: "Calmeilles", codePostal: "66400", variantes: [] },
  { nom: "Camélas", codePostal: "66300", variantes: [] },
  { nom: "Campôme", codePostal: "66500", variantes: [] },
  { nom: "Campoussy", codePostal: "66730", variantes: [] },
  { nom: "Canaveilles", codePostal: "66360", variantes: [] },
  { nom: "Canet-en-Roussillon", codePostal: "66140", variantes: ["Canet Plage", "Canet en Roussillon"] },
  { nom: "Canohès", codePostal: "66680", variantes: ["Canohes"] },
  { nom: "Caramany", codePostal: "66720", variantes: [] },
  { nom: "Casefabre", codePostal: "66130", variantes: [] },
  { nom: "Cases-de-Pène", codePostal: "66600", variantes: [] },
  { nom: "Cassagnes", codePostal: "66720", variantes: [] },
  { nom: "Casteil", codePostal: "66820", variantes: [] },
  { nom: "Castelnou", codePostal: "66300", variantes: [] },
  { nom: "Catllar", codePostal: "66500", variantes: [] },
  { nom: "Caudiès-de-Conflent", codePostal: "66360", variantes: [] },
  { nom: "Caudiès-de-Fenouillèdes", codePostal: "66220", variantes: [] },
  { nom: "Cerbère", codePostal: "66290", variantes: ["Cerbere"] },
  { nom: "Céret", codePostal: "66400", variantes: ["Ceret"] },
  { nom: "Claira", codePostal: "66530", variantes: [] },
  { nom: "Clara-Villerach", codePostal: "66500", variantes: [] },
  { nom: "Codalet", codePostal: "66500", variantes: [] },
  { nom: "Collioure", codePostal: "66190", variantes: [] },
  { nom: "Conat", codePostal: "66500", variantes: [] },
  { nom: "Corbère", codePostal: "66130", variantes: [] },
  { nom: "Corbère-les-Cabanes", codePostal: "66130", variantes: ["Corberes les Cabanes", "Corbères-les-Cabanes"] },
  { nom: "Corneilla-de-Conflent", codePostal: "66820", variantes: ["Corneilla de Conflent"] },
  { nom: "Corneilla-del-Vercol", codePostal: "66200", variantes: ["Corneilla del Vercol"] },
  { nom: "Corneilla-la-Rivière", codePostal: "66550", variantes: ["Corneilla la Riviere"] },
  { nom: "Corsavy", codePostal: "66150", variantes: [] },
  { nom: "Coustouges", codePostal: "66260", variantes: [] },
  { nom: "Dorres", codePostal: "66760", variantes: [] },
  { nom: "Égat", codePostal: "66120", variantes: [] },
  { nom: "Elne", codePostal: "66200", variantes: [] },
  { nom: "Enveitg", codePostal: "66760", variantes: [] },
  { nom: "Err", codePostal: "66800", variantes: [] },
  { nom: "Escaro", codePostal: "66360", variantes: [] },
  { nom: "Espira-de-Conflent", codePostal: "66320", variantes: [] },
  { nom: "Espira-de-l'Agly", codePostal: "66600", variantes: ["Espira de l'Agly", "Espira de l Agly", "Espira-de-l Agly"] },
  { nom: "Estagel", codePostal: "66310", variantes: [] },
  { nom: "Estavar", codePostal: "66800", variantes: [] },
  { nom: "Estoher", codePostal: "66320", variantes: [] },
  { nom: "Eus", codePostal: "66500", variantes: [] },
  { nom: "Eyne", codePostal: "66800", variantes: [] },
  { nom: "Feilluns", codePostal: "66730", variantes: [] },
  { nom: "Fenouillet", codePostal: "66220", variantes: [] },
  { nom: "Fillols", codePostal: "66820", variantes: [] },
  { nom: "Finestret", codePostal: "66320", variantes: [] },
  { nom: "Font-Romeu-Odeillo-Via", codePostal: "66120", variantes: ["Font Romeu", "Font-Romeu"] },
  { nom: "Fontpédrouse", codePostal: "66360", variantes: [] },
  { nom: "Fontrabiouse", codePostal: "66210", variantes: [] },
  { nom: "Formiguères", codePostal: "66210", variantes: [] },
  { nom: "Fosse", codePostal: "66220", variantes: [] },
  { nom: "Fourques", codePostal: "66300", variantes: [] },
  { nom: "Fuilla", codePostal: "66820", variantes: [] },
  { nom: "Glorianes", codePostal: "66320", variantes: [] },
  { nom: "Ille-sur-Têt", codePostal: "66130", variantes: ["Ille sur Tet", "Ille-sur-Tet"] },
  { nom: "Joch", codePostal: "66320", variantes: [] },
  { nom: "Jujols", codePostal: "66360", variantes: [] },
  { nom: "L'Albère", codePostal: "66480", variantes: ["L Albère"] },
  { nom: "La Bastide", codePostal: "66110", variantes: [] },
  { nom: "La Cabanasse", codePostal: "66210", variantes: [] },
  { nom: "La Llagonne", codePostal: "66210", variantes: [] },
  { nom: "Lamanère", codePostal: "66230", variantes: [] },
  { nom: "Lansac", codePostal: "66720", variantes: [] },
  { nom: "Laroque-des-Albères", codePostal: "66740", variantes: [] },
  { nom: "Latour-Bas-Elne", codePostal: "66200", variantes: ["Latour Bas Elne"] },
  { nom: "Latour-de-Carol", codePostal: "66760", variantes: [] },
  { nom: "Latour-de-France", codePostal: "66720", variantes: [] },
  { nom: "Le Barcarès", codePostal: "66420", variantes: ["Le Barcares", "Barcarès", "Barcares"] },
  { nom: "Le Boulou", codePostal: "66160", variantes: [] },
  { nom: "Le Perthus", codePostal: "66480", variantes: [] },
  { nom: "Le Soler", codePostal: "66270", variantes: [] },
  { nom: "Le Tech", codePostal: "66230", variantes: [] },
  { nom: "Le Vivier", codePostal: "66730", variantes: [] },
  { nom: "Les Angles", codePostal: "66210", variantes: [] },
  { nom: "Les Cluses", codePostal: "66480", variantes: [] },
  { nom: "Lesquerde", codePostal: "66220", variantes: [] },
  { nom: "Llauro", codePostal: "66300", variantes: [] },
  { nom: "Llo", codePostal: "66800", variantes: [] },
  { nom: "Llupia", codePostal: "66300", variantes: [] },
  { nom: "Los Masos", codePostal: "66500", variantes: [] },
  { nom: "Mantet", codePostal: "66360", variantes: [] },
  { nom: "Marquixanes", codePostal: "66320", variantes: [] },
  { nom: "Matemale", codePostal: "66210", variantes: [] },
  { nom: "Maureillas-las-Illas", codePostal: "66480", variantes: ["Maureillas las Illas"] },
  { nom: "Maury", codePostal: "66460", variantes: [] },
  { nom: "Millas", codePostal: "66170", variantes: [] },
  { nom: "Molitg-les-Bains", codePostal: "66500", variantes: [] },
  { nom: "Mont-Louis", codePostal: "66210", variantes: [] },
  { nom: "Montalba-le-Château", codePostal: "66130", variantes: ["Montalba le Chateau"] },
  { nom: "Montauriol", codePostal: "66300", variantes: [] },
  { nom: "Montbolo", codePostal: "66110", variantes: [] },
  { nom: "Montescot", codePostal: "66200", variantes: [] },
  { nom: "Montesquieu-des-Albères", codePostal: "66740", variantes: [] },
  { nom: "Montferrer", codePostal: "66150", variantes: [] },
  { nom: "Montner", codePostal: "66720", variantes: [] },
  { nom: "Mosset", codePostal: "66500", variantes: [] },
  { nom: "Nahuja", codePostal: "66340", variantes: [] },
  { nom: "Néfiach", codePostal: "66170", variantes: ["Nefiach"] },
  { nom: "Nohèdes", codePostal: "66500", variantes: [] },
  { nom: "Nyer", codePostal: "66360", variantes: [] },
  { nom: "Olette", codePostal: "66360", variantes: [] },
  { nom: "Oms", codePostal: "66400", variantes: [] },
  { nom: "Opoul-Périllos", codePostal: "66600", variantes: [] },
  { nom: "Oreilla", codePostal: "66360", variantes: [] },
  { nom: "Ortaffa", codePostal: "66560", variantes: [] },
  { nom: "Osséja", codePostal: "66340", variantes: ["Osseja"] },
  { nom: "Palau-de-Cerdagne", codePostal: "66340", variantes: [] },
  { nom: "Palau-del-Vidre", codePostal: "66690", variantes: ["Palau-Del-Vidre", "Palau del Vidre"] },
  { nom: "Passa", codePostal: "66300", variantes: [] },
  { nom: "Perpignan", codePostal: "66000", variantes: ["66100", "66001"] },
  { nom: "Peyrestortes", codePostal: "66600", variantes: [] },
  { nom: "Pézilla-de-Conflent", codePostal: "66730", variantes: [] },
  { nom: "Pézilla-la-Rivière", codePostal: "66370", variantes: [] },
  { nom: "Pia", codePostal: "66380", variantes: [] },
  { nom: "Planès", codePostal: "66210", variantes: [] },
  { nom: "Planèzes", codePostal: "66720", variantes: [] },
  { nom: "Pollestres", codePostal: "66450", variantes: [] },
  { nom: "Ponteilla", codePostal: "66300", variantes: [] },
  { nom: "Port-Vendres", codePostal: "66660", variantes: ["Port Vendres"] },
  { nom: "Porta", codePostal: "66760", variantes: [] },
  { nom: "Porté-Puymorens", codePostal: "66760", variantes: [] },
  { nom: "Prades", codePostal: "66500", variantes: [] },
  { nom: "Prats-de-Mollo-la-Preste", codePostal: "66230", variantes: [] },
  { nom: "Prats-de-Sournia", codePostal: "66730", variantes: [] },
  { nom: "Prugnanes", codePostal: "66220", variantes: [] },
  { nom: "Prunet-et-Belpuig", codePostal: "66130", variantes: [] },
  { nom: "Puyvalador", codePostal: "66210", variantes: [] },
  { nom: "Py", codePostal: "66360", variantes: [] },
  { nom: "Rabouillet", codePostal: "66730", variantes: [] },
  { nom: "Railleu", codePostal: "66360", variantes: [] },
  { nom: "Rasiguères", codePostal: "66720", variantes: [] },
  { nom: "Réal", codePostal: "66210", variantes: [] },
  { nom: "Reynès", codePostal: "66400", variantes: [] },
  { nom: "Ria-Sirach", codePostal: "66500", variantes: [] },
  { nom: "Rigarda", codePostal: "66320", variantes: [] },
  { nom: "Rivesaltes", codePostal: "66600", variantes: [] },
  { nom: "Rodès", codePostal: "66320", variantes: [] },
  { nom: "Sahorre", codePostal: "66360", variantes: [] },
  { nom: "Saillagouse", codePostal: "66800", variantes: [] },
  { nom: "Saint-André", codePostal: "66690", variantes: ["St André", "St Andre", "Saint-Andre"] },
  { nom: "Saint-Arnac", codePostal: "66220", variantes: ["St Arnac"] },
  { nom: "Saint-Cyprien", codePostal: "66750", variantes: ["St Cyprien", "Saint-Cyprien Plage"] },
  { nom: "Saint-Estève", codePostal: "66240", variantes: ["St Estève"] },
  { nom: "Saint-Féliu-d'Amont", codePostal: "66170", variantes: ["Saint-Féliu-d Amont", "St Féliu d'Amont"] },
  { nom: "Saint-Féliu-d'Avall", codePostal: "66170", variantes: ["Saint-Féliu-d Avall", "St Féliu d'Avall"] },
  { nom: "Saint-Génis-des-Fontaines", codePostal: "66740", variantes: ["St Génis des Fontaines"] },
  { nom: "Saint-Hippolyte", codePostal: "66510", variantes: ["St Hippolyte"] },
  { nom: "Saint-Jean-Lasseille", codePostal: "66300", variantes: ["St Jean Lasseille"] },
  { nom: "Saint-Jean-Pla-de-Corts", codePostal: "66490", variantes: ["St Jean Pla de Corts"] },
  { nom: "Saint-Laurent-de-Cerdans", codePostal: "66260", variantes: ["St Laurent de Cerdans"] },
  { nom: "Saint-Laurent-de-la-Salanque", codePostal: "66250", variantes: ["St Laurent de la Salanque"] },
  { nom: "Saint-Marsal", codePostal: "66110", variantes: ["St Marsal"] },
  { nom: "Saint-Martin-de-Fenouillet", codePostal: "66220", variantes: ["St Martin de Fenouillet"] },
  { nom: "Saint-Michel-de-Llotes", codePostal: "66130", variantes: ["St Michel de Llotes"] },
  { nom: "Saint-Nazaire", codePostal: "66570", variantes: ["St Nazaire"] },
  { nom: "Saint-Paul-de-Fenouillet", codePostal: "66220", variantes: ["St Paul de Fenouillet"] },
  { nom: "Saint-Pierre-dels-Forcats", codePostal: "66210", variantes: ["St Pierre dels Forcats"] },
  { nom: "Sainte-Colombe-de-la-Commanderie", codePostal: "66300", variantes: ["Ste Colombe de la Commanderie"] },
  { nom: "Sainte-Léocadie", codePostal: "66800", variantes: ["Ste Léocadie"] },
  { nom: "Sainte-Marie-la-Mer", codePostal: "66470", variantes: ["Ste Marie", "Sainte Marie la Mer", "Ste Marie la Mer"] },
  { nom: "Saleilles", codePostal: "66280", variantes: [] },
  { nom: "Salses-le-Château", codePostal: "66600", variantes: ["Salses le Chateau", "Salses"] },
  { nom: "Sansa", codePostal: "66360", variantes: [] },
  { nom: "Sauto", codePostal: "66210", variantes: [] },
  { nom: "Serdinya", codePostal: "66360", variantes: [] },
  { nom: "Serralongue", codePostal: "66230", variantes: [] },
  { nom: "Sorède", codePostal: "66690", variantes: ["Sorede"] },
  { nom: "Souanyas", codePostal: "66360", variantes: [] },
  { nom: "Sournia", codePostal: "66730", variantes: [] },
  { nom: "Taillet", codePostal: "66400", variantes: [] },
  { nom: "Tarerach", codePostal: "66320", variantes: [] },
  { nom: "Targasonne", codePostal: "66120", variantes: ["Targassonne"] },
  { nom: "Taulis", codePostal: "66110", variantes: [] },
  { nom: "Taurinya", codePostal: "66500", variantes: [] },
  { nom: "Tautavel", codePostal: "66720", variantes: [] },
  { nom: "Terrats", codePostal: "66300", variantes: [] },
  { nom: "Théza", codePostal: "66200", variantes: ["Theza"] },
  { nom: "Thuès-Entre-Valls", codePostal: "66360", variantes: [] },
  { nom: "Thuir", codePostal: "66300", variantes: [] },
  { nom: "Tordères", codePostal: "66300", variantes: [] },
  { nom: "Torreilles", codePostal: "66440", variantes: ["Torreilles Plage"] },
  { nom: "Toulouges", codePostal: "66350", variantes: [] },
  { nom: "Tresserre", codePostal: "66300", variantes: [] },
  { nom: "Trévillach", codePostal: "66130", variantes: [] },
  { nom: "Trilla", codePostal: "66220", variantes: [] },
  { nom: "Trouillas", codePostal: "66300", variantes: [] },
  { nom: "Ur", codePostal: "66760", variantes: [] },
  { nom: "Urbanya", codePostal: "66500", variantes: [] },
  { nom: "Valcebollère", codePostal: "66340", variantes: [] },
  { nom: "Valmanya", codePostal: "66320", variantes: [] },
  { nom: "Vernet-les-Bains", codePostal: "66820", variantes: ["Vernet les Bains"] },
  { nom: "Villefranche-de-Conflent", codePostal: "66500", variantes: [] },
  { nom: "Villelongue-de-la-Salanque", codePostal: "66410", variantes: ["Villelongue de la Salanque"] },
  { nom: "Villelongue-dels-Monts", codePostal: "66740", variantes: [] },
  { nom: "Villemolaque", codePostal: "66300", variantes: [] },
  { nom: "Villeneuve-de-la-Raho", codePostal: "66180", variantes: ["Villeneuve de la Raho"] },
  { nom: "Villeneuve-la-Rivière", codePostal: "66610", variantes: [] },
  { nom: "Vinça", codePostal: "66320", variantes: ["Vinca"] },
  { nom: "Vingrau", codePostal: "66600", variantes: [] },
  { nom: "Vira", codePostal: "66220", variantes: [] },
  { nom: "Vivès", codePostal: "66490", variantes: [] },
];
 
 // Normalise une chaîne pour la recherche (enlève accents, met en minuscules)
 const normalizeString = (str: string): string => {
   return str
     .toLowerCase()
     .normalize("NFD")
     .replace(/[\u0300-\u036f]/g, "")
     .replace(/-/g, " ")
     .trim();
 };
 
 // Recherche les communes par code postal
 export const findCommunesByPostalCode = (codePostal: string): Commune[] => {
   const code = codePostal.trim();
   return communes.filter(
     (c) => c.codePostal === code || c.variantes.includes(code)
   );
 };
 
 // Recherche les communes par nom (partiel)
 export const findCommunesByName = (search: string): Commune[] => {
   if (search.length < 2) return [];
   
   const normalizedSearch = normalizeString(search);
   
   return communes.filter((c) => {
     const normalizedNom = normalizeString(c.nom);
     if (normalizedNom.includes(normalizedSearch)) return true;
     
     return c.variantes.some((v) =>
       normalizeString(v).includes(normalizedSearch)
     );
   });
 };
 
 // Trouve une commune exacte par nom
 export const findExactCommune = (name: string): Commune | undefined => {
   const normalizedSearch = normalizeString(name);
   
  return communes.find((c) => {
    if (normalizeString(c.nom) === normalizedSearch) return true;
    return c.variantes.some((v) => normalizeString(v) === normalizedSearch);
  });
};

// Confirme qu'un couple ville + code postal correspond bien à une commune connue
export const getConfirmedCommune = (nom: string, codePostal: string): Commune | undefined => {
  const cp = codePostal.trim();
  const commune = findExactCommune(nom);
  if (!commune) return undefined;
  const cpOk = commune.codePostal === cp || commune.variantes.includes(cp);
  return cpOk ? commune : undefined;
};