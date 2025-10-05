# 🚀 Manuel d'utilisation - Agent OS Mobile

Guide complet pour utiliser Agent OS Mobile avec React Native + Expo

---

## 📋 Le concept

Agent OS Mobile est un **système de développement piloté par spécifications** pour React Native + Expo. Au lieu de demander directement à l'IA "construis-moi une feature", vous suivez un workflow structuré :

### Workflow traditionnel ❌
```
Vous → "Construis un écran de login" → IA → Code incohérent
```

### Workflow Agent OS Mobile ✅
```
Vous → Spec détaillée → Tasks structurées → TDD → IA → Code de qualité
```

---

## 🎯 Le workflow complet (4 étapes)

### **Étape 1 : Planifier votre produit** 📝

**Quand :** Au démarrage du projet

**Commande :**
```
@.agent-os/instructions/core/plan-product.md

Je développe [NOM_APP] - une application mobile pour [USAGE]
Utilisateurs cibles : [QUI]
Features clés :
- [FEATURE 1]
- [FEATURE 2]
- [FEATURE 3]
```

**Ce qui est créé :**
```
.agent-os/product/
├── mission.md          # Vision du produit
├── mission-lite.md     # Version condensée
├── tech-stack.md       # Stack technique
└── roadmap.md          # Phases de développement
```

**Exemple concret :**
```
Je développe "FitTracker" - une app mobile de suivi fitness
Utilisateurs : Sportifs amateurs 25-40 ans
Features clés :
- Enregistrement des séances d'entraînement
- Statistiques et graphiques de progression
- Défis avec des amis
```

**💡 Astuce 1 : Spécifier les MCP (Model Context Protocol)**

Vous pouvez préciser les outils MCP à utiliser dans votre projet :

**Niveau global (dans la description initiale) :**
```
Je développe "FitTracker" - une app mobile de suivi fitness

MCP Tools utilisés :
- filesystem : Gestion des fichiers d'assets et images
- sqlite : Base de données locale pour mode offline
- fetch : Appels API vers le backend
- brave-search : Recherche d'exercices (optionnel)
```

Ces informations seront automatiquement ajoutées à `.agent-os/product/tech-stack.md`

**💡 Astuce 2 : Spécifier les maquettes Figma et références de design**

**Niveau global (dans la description initiale) :**
```
Je développe "FitTracker" - une app mobile de suivi fitness

Design & Maquettes :
- Figma : https://figma.com/file/xxx/FitTracker-Design
- Design System : Material Design / iOS Human Interface Guidelines
- Écrans de référence à dupliquer :
  * Écran de login : inspiré de Strava
  * Dashboard : style Nike Training Club
  * Graphiques : référence Apple Health
```

Ces informations seront automatiquement ajoutées à `.agent-os/product/mission.md` et référencées dans toutes les specs

**💡 Astuce 3 : Spécifier la documentation de référence**

**Niveau global (dans la description initiale) :**
```
Je développe "FitTracker" - une app mobile de suivi fitness

Documentation de référence :
- React Navigation : https://reactnavigation.org/docs/getting-started
- Expo SDK : https://docs.expo.dev/
- API Backend : https://api.fittracker.com/docs
- Design System interne : https://figma.com/design-system
- Documentation métier : https://notion.so/fittracker-business-rules

Standards à respecter :
- RGPD pour données santé
- Normes accessibilité WCAG 2.1
```

Ces références seront ajoutées dans `.agent-os/product/mission.md` et `tech-stack.md`

---

### **Étape 2 : Créer une spec de feature** 🎨

**Quand :** Pour chaque nouvelle fonctionnalité

**Commande :**
```
@.agent-os/instructions/core/create-spec.md

Je veux créer [FEATURE_NAME] qui permet à l'utilisateur de [ACTION]
Détails : [REQUIREMENTS]
```

**L'IA va vous poser des questions pour clarifier :**
- Scope exact ?
- Plateforme (iOS/Android/both) ?
- Offline ou online ?
- Permissions nécessaires ?

**Ce qui est créé :**
```
.agent-os/specs/2025-10-05-workout-tracker/
├── spec.md                          # Spécification complète
├── spec-lite.md                     # Résumé
└── sub-specs/
    ├── technical-spec.md            # Détails techniques
    ├── api-spec.md                  # Endpoints API (si besoin)
    └── database-schema.md           # Schéma DB (si besoin)
```

**Exemple concret :**
```
Je veux créer un tracker de séances d'entraînement qui permet
à l'utilisateur d'enregistrer ses exercices avec durée,
répétitions et poids.

Fonctionnalités :
- Créer/éditer/supprimer des séances
- Timer intégré pendant l'entraînement
- Historique des séances
- Graphiques de progression

Backend :
- Base de données : PostgreSQL
- API : REST avec authentification JWT
- Tables : users, workouts, exercises, workout_exercises

MCP Tools spécifiques à cette feature :
- sqlite : Cache local des séances pour mode offline
- fetch : Synchronisation avec l'API backend

Design spécifique à cette feature :
- Maquette Figma : https://figma.com/file/xxx/FitTracker-Design#workout-screen
- Composants Figma à utiliser : WorkoutCard, ExerciseRow, TimerButton
- Écran de référence : MyFitnessPal workout logger
- Palette de couleurs : #FF6B6B (primary), #4ECDC4 (secondary)

Documentation technique spécifique :
- Strava API v3 : https://developers.strava.com/docs/reference/
- OAuth2 Flow : https://developers.strava.com/docs/authentication/
- Rate limiting : 100 requests/15min, 1000/day
- Architecture sync : https://notion.so/sync-architecture
```

**💡 Note :** Les informations backend (BDD, tables, API), les MCP spécifiques, les références de design et la documentation technique seront automatiquement intégrés dans `technical-spec.md`, `database-schema.md` et `api-spec.md`

---

### **Étape 3 : Générer les tâches** ✅

**Quand :** Après validation de la spec

**Commande :**
```
@.agent-os/instructions/core/create-tasks.md
```

**Ce qui est créé :**
```
.agent-os/specs/2025-10-05-workout-tracker/tasks.md
```

**Contenu typique :**
```markdown
## Tasks

- [ ] 1. Workout creation and storage
  - [ ] 1.1 Write tests for workout model and CRUD operations
  - [ ] 1.2 Create Workout model with Zustand/Redux
  - [ ] 1.3 Implement AsyncStorage persistence
  - [ ] 1.4 Create API service for workout sync
  - [ ] 1.5 Verify all tests pass

- [ ] 2. Workout tracking screen
  - [ ] 2.1 Write tests for WorkoutScreen component
  - [ ] 2.2 Create WorkoutScreen with form
  - [ ] 2.3 Implement timer component
  - [ ] 2.4 Add exercise list with FlatList
  - [ ] 2.5 Verify all tests pass

- [ ] 3. History and statistics
  - [ ] 3.1 Write tests for history screen
  - [ ] 3.2 Create HistoryScreen component
  - [ ] 3.3 Add charts with react-native-chart-kit
  - [ ] 3.4 Implement filtering by date
  - [ ] 3.5 Verify all tests pass
```

---

### **Étape 4 : Exécuter les tâches** 🔨

**Quand :** Après avoir les tasks

**Commande :**
```
@.agent-os/instructions/core/execute-tasks.md
```

**Ce qui se passe automatiquement :**

#### 1. **Préparation**
- L'IA lit la spec
- Crée/switch vers une branche git
- Récupère le contexte nécessaire

#### 2. **Exécution TDD** (pour chaque tâche)
- ✅ Écrit les tests AVANT le code
- ✅ Implémente la fonctionnalité
- ✅ Fait passer les tests
- ✅ Vérifie sur iOS et Android
- ✅ Marque la tâche complète

#### 3. **Post-exécution**
- ✅ Run tous les tests
- ✅ Crée un commit git
- ✅ Push sur GitHub
- ✅ Crée une Pull Request
- ✅ Génère un recap
- ✅ Joue un son de notification

**Résultat final :**
```
✅ Tous les tests passent
✅ Code testé sur iOS et Android
✅ PR créée avec description complète
✅ Documentation à jour
✅ Recap sauvegardé
```

---

## 🎬 Exemple complet bout-en-bout

### Scenario : Ajouter un écran de profil utilisateur

#### 1. Créer la spec

**Vous dites à l'IA :**
```
@.agent-os/instructions/core/create-spec.md

Je veux créer un écran de profil utilisateur permettant de :
- Afficher les infos (nom, email, photo)
- Éditer les informations
- Changer la photo de profil
- Se déconnecter
```

#### 2. L'IA pose des questions

**L'IA demande :**
```
Questions pour clarifier :
1. La photo vient de la caméra, galerie ou les deux ?
2. Les changements sont sauvegardés en local ou API ?
3. Faut-il valider le format de l'email ?
```

#### 3. Vous répondez

**Vos réponses :**
```
1. Les deux (caméra + galerie)
2. API + cache local
3. Oui, validation format email
```

#### 4. Générer les tâches

**Commande :**
```
@.agent-os/instructions/core/create-tasks.md
```

#### 5. Exécuter

**Commande :**
```
@.agent-os/instructions/core/execute-tasks.md
```

#### 6. L'IA travaille automatiquement

**Progression en temps réel :**
```
[Tâche 1/3] Création du modèle User et state management
  ✓ Tests écrits (UserModel.test.ts)
  ✓ Modèle créé (types/User.ts)
  ✓ Store Zustand créé (stores/userStore.ts)
  ✓ Tests passent ✅

[Tâche 2/3] Écran ProfileScreen
  ✓ Tests écrits (ProfileScreen.test.tsx)
  ✓ Composant créé (screens/ProfileScreen.tsx)
  ✓ Intégration caméra/galerie (Expo ImagePicker)
  ✓ Formulaire avec validation
  ✓ Tests passent ✅

[Tâche 3/3] API integration et synchronisation
  ✓ Tests API (api/user.test.ts)
  ✓ Service API (services/userApi.ts)
  ✓ Gestion offline (AsyncStorage)
  ✓ Tests passent ✅

📦 Pull Request créée : #42
🎉 Feature terminée !
```

---

## 💡 Astuces pour bien utiliser Agent OS Mobile

### ✅ Bonnes pratiques

#### 1. Specs détaillées = meilleur code

**Mauvais ❌**
```
"Créer un écran de login"
```

**Bon ✅**
```
"Créer un écran de login avec :
- Formulaire email/password
- Validation en temps réel
- Lien 'Mot de passe oublié'
- Social login (Google + Apple)
- Option 'Se souvenir de moi'
- Authentification biométrique (Face ID/Touch ID)
- Gestion des erreurs réseau
- Mode offline avec mise en cache"
```

#### 2. Utiliser les exemples comme référence

```
"Créer un écran similaire à .agent-os/examples/react-native-expo/Screen.example.tsx
mais pour afficher une liste de produits avec:
- Pull-to-refresh
- Pagination infinie
- Recherche en temps réel
- Filtres par catégorie"
```

#### 3. Référencer les standards

```
"Utiliser les patterns de .agent-os/standards/best-practices.md
pour la gestion offline et synchronisation des données"
```

```
"Suivre les conventions de .agent-os/standards/code-style/typescript-react-native-style.md
pour la structure des composants"
```

#### 4. Une feature = une spec

**Mauvais ❌**
- Une seule spec pour : login + signup + profile + forgot password

**Bon ✅**
- Spec 1 : Authentification (login + signup)
- Spec 2 : Profil utilisateur
- Spec 3 : Récupération mot de passe

### 🎯 Commandes utiles en cours de route

#### Continuer une tâche en cours
```
@.agent-os/instructions/core/execute-tasks.md
Continue avec la prochaine tâche
```

#### Analyser un projet existant
```
@.agent-os/instructions/core/analyze-product.md

Analyse mon projet React Native existant
```

#### Créer juste une spec sans exécuter
```
@.agent-os/instructions/core/create-spec.md

Je veux créer [FEATURE]...

(puis ne pas lancer execute-tasks tout de suite)
```

#### Demander une révision de spec
```
Peux-tu réviser la spec dans .agent-os/specs/2025-10-05-user-profile/
pour ajouter la fonctionnalité de [NOUVELLE_FEATURE] ?
```

---

## 📂 Organisation des fichiers créés

```
votre-app-react-native/
├── src/                          # Votre code applicatif
│   ├── screens/
│   ├── components/
│   ├── hooks/
│   └── services/
│
├── .agent-os/                    # Agent OS Mobile
│   │
│   ├── product/                  # Documentation produit
│   │   ├── mission.md            # Vision complète
│   │   ├── mission-lite.md       # Version condensée
│   │   ├── roadmap.md            # Feuille de route
│   │   └── tech-stack.md         # Stack technique
│   │
│   ├── specs/                    # Spécifications des features
│   │   ├── 2025-10-05-user-auth/
│   │   │   ├── spec.md
│   │   │   ├── spec-lite.md
│   │   │   ├── tasks.md
│   │   │   └── sub-specs/
│   │   │       ├── technical-spec.md
│   │   │       └── api-spec.md
│   │   │
│   │   ├── 2025-10-06-workout-tracker/
│   │   │   └── ...
│   │   │
│   │   └── 2025-10-07-social-sharing/
│   │       └── ...
│   │
│   ├── recaps/                   # Historique des features
│   │   ├── 2025-10-05-user-auth.md
│   │   ├── 2025-10-06-workout-tracker.md
│   │   └── 2025-10-07-social-sharing.md
│   │
│   ├── instructions/             # Workflows Agent OS Mobile
│   ├── standards/                # Standards de code
│   ├── examples/                 # Templates
│   └── claude-code/              # Agents spécialisés
│
├── package.json
├── app.json
└── eas.json
```

---

## 🚀 Démarrage rapide (résumé)

### Installation

```bash
# 1. Installer Agent OS Mobile dans votre projet
cd votre-projet-react-native
cp -r /path/to/agent-os-mobile .agent-os
```

### Workflow

```bash
# 2. Planifier le produit (une seule fois)
"@.agent-os/instructions/core/plan-product.md

Je développe [VOTRE_APP] - [DESCRIPTION]
Utilisateurs : [CIBLE]
Features : [LISTE]"

# 3. Pour chaque feature (répéter) :

# 3a. Créer la spec
"@.agent-os/instructions/core/create-spec.md

Je veux créer [FEATURE] qui permet [DESCRIPTION]..."

# 3b. Générer les tâches
"@.agent-os/instructions/core/create-tasks.md"

# 3c. Exécuter
"@.agent-os/instructions/core/execute-tasks.md"

# 🎉 Répéter l'étape 3 pour chaque feature !
```

---

## 🔄 Workflow visuel

```
┌─────────────────────────────────────────────────┐
│  PHASE 1 : PLANIFICATION (une fois)            │
└─────────────────────────────────────────────────┘
                      ↓
        @.agent-os/instructions/core/plan-product.md
                      ↓
    ┌─────────────────────────────────────┐
    │  .agent-os/product/                 │
    │  ├── mission.md                     │
    │  ├── roadmap.md                     │
    │  └── tech-stack.md                  │
    └─────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  PHASE 2 : DÉVELOPPEMENT (par feature)         │
└─────────────────────────────────────────────────┘
                      ↓
        @.agent-os/instructions/core/create-spec.md
                      ↓
           📝 Questions/Réponses
                      ↓
    ┌─────────────────────────────────────┐
    │  .agent-os/specs/YYYY-MM-DD-name/   │
    │  ├── spec.md                        │
    │  └── sub-specs/                     │
    └─────────────────────────────────────┘
                      ↓
        @.agent-os/instructions/core/create-tasks.md
                      ↓
    ┌─────────────────────────────────────┐
    │  tasks.md                           │
    │  - [ ] Task 1                       │
    │    - [ ] 1.1 Tests                  │
    │    - [ ] 1.2 Implementation         │
    │  - [ ] Task 2                       │
    └─────────────────────────────────────┘
                      ↓
        @.agent-os/instructions/core/execute-tasks.md
                      ↓
    ┌─────────────────────────────────────┐
    │  EXÉCUTION TDD AUTOMATIQUE          │
    │  ✓ Tests → Code → Verify            │
    │  ✓ iOS + Android                    │
    │  ✓ Git commit + PR                  │
    │  ✓ Recap généré                     │
    └─────────────────────────────────────┘
                      ↓
              🎉 Feature terminée !
                      ↓
          Retour à PHASE 2 pour next feature
```

---

## 📚 Ressources supplémentaires

### Documentation

- **`README.md`** - Vue d'ensemble du projet
- **`QUICK-START.md`** - Guide de démarrage rapide
- **`MOBILE-ADAPTATION.md`** - Détails techniques de l'adaptation mobile
- **`examples/react-native-expo/README.md`** - Guide des templates

### Templates prêts à l'emploi

Dans `.agent-os/examples/react-native-expo/` :

- **`Screen.example.tsx`** - Écran complet avec navigation
- **`Component.example.tsx`** - Composants réutilisables
- **`CustomHook.example.tsx`** - 6 hooks production-ready
- **`Test.example.test.tsx`** - Exemples de tests

### Standards

- **`.agent-os/standards/tech-stack.md`** - Stack technique mobile
- **`.agent-os/standards/best-practices.md`** - Bonnes pratiques mobile
- **`.agent-os/standards/code-style/`** - Conventions de code

---

## ❓ FAQ

### Puis-je utiliser Agent OS Mobile sur un projet existant ?

**Oui !** Utilisez :
```
@.agent-os/instructions/core/analyze-product.md
```

### Dois-je créer une spec pour chaque petite modification ?

**Non.** Pour des petits bugs ou changements mineurs, demandez directement à l'IA.

**Utilisez des specs pour :**
- Nouvelles features complètes
- Refactoring majeur
- Modifications architecturales

### Que faire si l'IA ne suit pas les standards ?

**Rappelez les standards :**
```
"Suis les conventions de .agent-os/standards/code-style/typescript-react-native-style.md
pour cette implémentation"
```

### Puis-je modifier une spec existante ?

**Oui !** Les specs sont en Markdown. Éditez-les directement puis relancez :
```
@.agent-os/instructions/core/execute-tasks.md
```

### Comment gérer plusieurs développeurs ?

- Chacun travaille sur sa propre spec/branche
- Les specs sont versionnées avec Git
- Les PRs sont revues normalement
- Les recaps servent d'historique partagé

---

## 🎯 Points clés à retenir

1. **4 étapes** : Plan → Spec → Tasks → Execute
2. **TDD enforced** : Tests écrits en premier automatiquement
3. **Specs réutilisables** : Documentation vivante de votre app
4. **Standards cohérents** : Code uniforme grâce aux templates
5. **iOS + Android** : Tests sur les deux plateformes
6. **Git workflow** : Branches, commits, PRs automatiques

---

**Besoin d'aide ?**
- Consultez les exemples dans `.agent-os/examples/react-native-expo/`
- Référez-vous aux standards dans `.agent-os/standards/`
- Le QUICK-START.md pour un rappel rapide

**Bon développement mobile avec Agent OS ! 🚀📱**
