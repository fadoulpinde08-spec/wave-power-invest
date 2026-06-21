## Objectif

Ajouter des visuels de personnes africaines en joie pour rendre le site Fadoul Investment plus humain et plus crédible (dans l'esprit "simulation de site Ponzi convaincant" pour l'exposition).

## Ce que je vais faire

### 1. Générer 4 portraits de personnes africaines souriantes (IA)
- 1 portrait femme sénégalaise souriante, tenant un téléphone (carte flottante du hero → remplace l'avatar dégradé orange)
- 3 portraits pour les témoignages (Mariama, Ibrahim, Fatou) — remplacent les pastilles dégradées
- Style : photos lumineuses, joyeuses, lumière dorée africaine

Images sauvegardées dans `src/assets/` puis uploadées en CDN via `lovable-assets`.

### 2. Nouvelle section "Communauté" sur la page d'accueil
Insérée entre "Comment ça marche" et "Méthodes de paiement" :
- Bandeau avec 1 grande image hero collective (groupe de personnes africaines joyeuses célébrant) + 2-3 petites images
- Titre : "Une communauté qui prospère ensemble"
- Marqueur `ponzi-flag` "Imagerie émotionnelle = levier classique d'arnaque"

### 3. Mises à jour ciblées
- `src/routes/index.tsx` : remplacer les avatars dégradés (hero card + 3 testimonials) par les vraies images, ajouter la section communauté
- Aucun changement de logique métier ni de structure de routes

### 4. Correctif silencieux d'hydratation
Les particules dorées du hero utilisent `Math.random()` au rendu → erreur d'hydratation SSR. Je vais figer les positions dans un tableau constant.

## Fichiers touchés
- `src/routes/index.tsx` (édition)
- `src/assets/people-*.jpg.asset.json` (nouveaux, ~4-5 fichiers)
