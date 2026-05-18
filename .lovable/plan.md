
# Plan — Augmenter le nombre de leads via le formulaire

Objectif : maximiser le taux de complétion et de soumission du formulaire d'estimation locative, sans toucher au back-end.

## 1. Réduire la friction de l'étape 1 (le plus gros levier)

Aujourd'hui l'étape 1 demande ~15 champs avant même de pouvoir continuer. C'est la principale cause d'abandon.

- **Passer de 2 à 3 étapes courtes** avec une barre de progression plus encourageante :
  - Étape 1 : Type de bien + Ville/CP + Surface + Pièces (4 champs, "30 secondes")
  - Étape 2 : Détails du bien (état, année, chauffage, extérieur, parking, DPE…) — tous optionnels sauf 1
  - Étape 3 : Coordonnées (nom, prénom, téléphone, email, RGPD)
- **Marquer clairement "facultatif"** sur tous les champs non essentiels de l'étape 2 (étiquette grise discrète).
- **Sauvegarde automatique** dans `localStorage` à chaque changement : si l'utilisateur revient, le formulaire est pré-rempli (bandeau "Reprendre votre estimation").

## 2. Renforcer la confiance autour du formulaire

- **Bandeau de réassurance** au-dessus du formulaire avec 3 pictos : "100% offert", "Sous 24h", "Sans engagement", + note Google (★ 4,9/5) reprise de la section avis.
- **Mini-témoignage** affiché en sticky sur le côté droit du formulaire (desktop) — 1 avis Google court avec photo/initiales.
- **Compteur social** : "X propriétaires ont déjà reçu leur estimation ce mois-ci" (chiffre statique configurable).
- **Photo + nom de l'expert** qui va rappeler ("Romain vous rappelle sous 24h"), avec micro-bio.

## 3. CTA et micro-interactions

- **Bouton "Suivant" toujours visible** (sticky en bas sur mobile) avec libellé orienté bénéfice : "Continuer →" puis "Recevoir mon estimation".
- **Feedback visuel** : champ valide = bordure verte + ✓, transitions douces.
- **Validation au blur**, pas seulement à la soumission, pour éviter les frustrations en fin de parcours.
- **Message de progression** : "Plus que 2 champs avant votre estimation !" sous la barre.

## 4. Capture des abandons (exit-intent)

- **Pop-up exit-intent** (desktop) si l'utilisateur a commencé le formulaire et tente de quitter : "Vous partez sans votre estimation ? Laissez juste votre email, on vous l'envoie."
- Mini-formulaire 1 champ (email) → même webhook avec flag `lead_partiel: true`.

## 5. Variantes du Hero pour augmenter le clic vers le formulaire

- Ajouter une **preuve sociale immédiate** sous le H1 ("+150 propriétaires accompagnés à Perpignan").
- Remplacer "Sous 24h" par un **engagement plus fort** : "Estimation envoyée en moins de 2h ouvrées".
- CTA secondaire "Voir un exemple d'estimation" (lien vers une image PDF d'exemple) — lève l'inconnu.

## 6. Optimisations mobiles (≈60% du trafic estimé)

- `inputMode` correct sur tous les champs numériques (déjà OK sur le CP, à étendre à surface, année, téléphone).
- Champ téléphone avec masque automatique `06 12 34 56 78`.
- Réduire la hauteur des champs/spacing sur mobile pour voir le bouton "Suivant" sans scroll.

## 7. Mesure (indispensable pour itérer)

- Ajouter des **events Google Ads / GA** (via le pixel G-JD27BBNDM5 déjà installé) :
  - `form_start` (premier champ rempli)
  - `form_step_1_complete`, `form_step_2_complete`
  - `form_submit` (déjà via /merci)
  - `form_abandon` (exit-intent)
- Permettra de voir où sont les abandons et d'itérer en données.

---

## Priorisation suggérée (par impact / effort)

1. **Découpage en 3 étapes + champs facultatifs marqués** ⭐⭐⭐ (gros impact)
2. **Sauvegarde localStorage + bandeau de reprise** ⭐⭐⭐
3. **Réassurance + témoignage à côté du formulaire** ⭐⭐
4. **Events de tracking pour mesurer** ⭐⭐
5. **Exit-intent pop-up** ⭐⭐
6. **Améliorations mobiles (masque tel, inputMode)** ⭐

## Détails techniques

- Fichiers principalement modifiés : `EstimationForm.tsx` (refonte en 3 étapes), nouveau `ExitIntentModal.tsx`, nouveau `FormSidebar.tsx` (réassurance), `useFormPersistence.ts` (hook localStorage), `useFormAnalytics.ts` (events GA).
- Pas de changement back-end : même webhook n8n, payload identique (juste un flag `lead_partiel` pour l'exit-intent).
- Respect des règles : ville/CP en MAJUSCULES, pas de scroll vers le haut au changement d'étape, animations fade.

---

**Question avant d'implémenter** : tu veux que je fasse les **3 premières priorités** (découpage 3 étapes + sauvegarde auto + réassurance/témoignage), ou tu préfères qu'on commence par un seul item pour valider la direction ?
