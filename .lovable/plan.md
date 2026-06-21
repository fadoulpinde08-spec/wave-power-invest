# Fadoul Investment — Démo pédagogique sur les systèmes de Ponzi

Un site complet et crédible qui reproduit l'esthétique d'une vraie plateforme d'investissement solaire en Afrique de l'Ouest, avec un **"Mode Démo / Décryptage"** activable à tout moment qui révèle les mécanismes du Ponzi sous-jacent. Conçu pour une exposition.

## Identité de marque

- **Nom** : Fadoul Investment
- **Tagline** : « Investissez dans le soleil de l'Afrique. Récoltez chaque jour. »
- **Palette** : vert solaire (#16A34A) + or africain (#F59E0B) + nuit profonde (#0B1220) + sable (#FAF7F2)
- **Typo** : Sora (titres) + Manrope (corps) — pro fintech avec une chaleur africaine
- **Logo** : panneau solaire stylisé en forme de soleil
- **Animations** : framer-motion (parallaxe hero, compteurs animés, fade-in au scroll), tickers de "retraits récents", effet shimmer sur CTA, particules dorées discrètes

## Bandeau "Mode Démo"

- Switch flottant en haut à droite : **"Mode normal" ↔ "🔍 Mode Décryptage"**
- En Décryptage : surlignages rouges sur les zones suspectes (rendements irréalistes, parrainage, faux témoignages, urgence artificielle, faux retraits) avec bulles explicatives "Pourquoi c'est un signe de Ponzi"
- Page dédiée `/decryptage` qui détaille les 10 signaux d'alerte avec le site comme cas d'étude

## Structure des routes

```
/                    Landing (hero, simulateur, panneaux, témoignages, FAQ)
/panneaux            Catalogue des 6 panneaux solaires
/simulateur          Calculateur de gains animé
/parrainage          Programme de filleuls + commissions
/temoignages         Faux témoignages d'investisseurs (avec photos générées)
/auth                Inscription / connexion (Lovable Cloud)
/dashboard           Tableau de bord investisseur (protégé)
/dashboard/depot     Dépôt simulé (Wave, Orange Money, Moov)
/dashboard/retrait   Retrait simulé
/dashboard/parrainage Lien de parrainage + arbre de filleuls
/decryptage          Page pédagogique sur les Ponzi
/mentions            Mentions légales avec disclaimer exposition
```

## Catalogue des panneaux

| Panneau | Prix | Gain quotidien | Durée | Total |
|---|---|---|---|---|
| Starter | 10 000 FCFA | 10% (1 000) | 60 j | 60 000 |
| Bronze | 30 000 FCFA | 11% (3 300) | 60 j | 198 000 |
| Argent | 50 000 FCFA | 12% | 60 j | 360 000 |
| Or | 100 000 FCFA | 13% | 60 j | 780 000 |
| Platine | 250 000 FCFA | 14% | 60 j | 2 100 000 |
| Diamant | 500 000 FCFA | 15% | 60 j | 4 500 000 |

Chaque carte panneau a une animation hover (tilt 3D), un badge "Populaire" et un compteur "X investisseurs ce mois".

## Fonctionnalités

### Vitrine
- Hero animé avec mockup dashboard
- Compteurs live : "X FCFA distribués", "Y investisseurs", "Z panneaux installés" (faux, animés)
- Ticker temps réel : "Aminata D. vient de retirer 45 000 FCFA via Wave" (généré aléatoirement)
- Simulateur interactif (slider montant + résultats animés)
- Section "Comment ça marche" en 4 étapes illustrées
- Témoignages + photos générées
- FAQ
- Footer avec faux numéros, faux RCCM, faux siège à Dakar

### Auth (Lovable Cloud)
- Email + mot de passe + numéro de téléphone (champ texte)
- Pas de profils complexes — juste auth.users + table `investors` (solde, parrain, pack actif)
- Trigger d'auto-création de profil investisseur à l'inscription

### Dashboard
- Solde principal + solde de parrainage (animés)
- Liste des panneaux actifs avec barre de progression "Jour X / 60"
- Historique des gains quotidiens (table)
- Cron simulé côté client : chaque "jour" écoulé crédite le pourcentage

### Dépôt / Retrait simulé
- Sélection moyen : Wave (bleu), Orange Money (orange), Moov (cyan) — logos stylisés
- Formulaire numéro de téléphone + montant
- Animation de chargement → écran de confirmation factice "Transaction approuvée"
- En Mode Décryptage : message superposé "Aucune vraie transaction. Dans un vrai Ponzi, l'argent va dans la poche de l'organisateur."
- Aucune intégration réelle aux APIs Wave/OM/Moov

### Parrainage
- Lien unique généré par utilisateur
- Arbre visuel des filleuls (3 niveaux : 10%, 5%, 2%)
- Tableau des commissions

## Page Décryptage (`/decryptage`)

Mise en page éditoriale qui expose :
1. Définition du Ponzi (Charles Ponzi, Madoff, et cas ouest-africains récents)
2. Les 10 signaux d'alerte avec captures du site lui-même
3. Pourquoi un rendement de 10-15%/jour est mathématiquement impossible
4. L'effondrement inévitable (graphique animé montrant la pyramide)
5. Conseils pour reconnaître et éviter ces arnaques
6. Ressources officielles (BCEAO, autorités de régulation)

## Détails techniques

- **Stack** : TanStack Start + Tailwind v4 + shadcn + framer-motion
- **Backend** : Lovable Cloud (auth email/password, table `investors`, table `transactions`, table `referrals`, table `panels`)
- **RLS** : chaque utilisateur ne lit/écrit que ses propres lignes
- **Seed** : migration qui insère les 6 panneaux + quelques faux investisseurs publics pour le ticker
- **Mode Démo** : stocké dans localStorage + context React, applique une classe globale `demo-mode` qui révèle les overlays
- **Disclaimer permanent** : petite mention dans le footer "Site démonstratif à but pédagogique — Exposition sur les systèmes de Ponzi" + bannière au premier chargement à accepter
- **Données fictives** : tous les noms, témoignages, numéros RCCM, adresses sont marqués `[DEMO]` en Mode Décryptage

## Hors-scope (à confirmer si voulu plus tard)

- Vraie intégration paiement (interdit — c'est une démo)
- Envoi SMS/email réel
- Admin panel pour l'organisateur Ponzi (intéressant pédagogiquement mais ajoute du scope)
- Multi-langue (wolof, anglais)

Je propose de démarrer par la landing + auth + dashboard + mode démo, puis d'ajouter la page Décryptage en finition.
