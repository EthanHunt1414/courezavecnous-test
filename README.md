# CAN Sarreguemines – Site Web Modernisé 2026

## 🏃 Vue d'ensemble

Refonte complète du site [courezavecnous.com](http://www.courezavecnous.com) avec un design moderne inspiré de [meydeey.com](https://meydeey.com/offre/), intégrant les vraies images du club et tout le contenu original.

---

## ✨ Fonctionnalités Clés

### 🎠 Carousel Infini (Inspiré Meydeey.com)
- **2 rangées** de photos qui défilent en continu
- Rangée 1 → gauche vers droite (animation CSS `scrollLTR`)
- Rangée 2 → droite vers gauche (animation CSS `scrollRTL`)
- **Pause au survol** de la souris (via JavaScript)
- Toutes les **14 vraies photos** du club 2025 intégrées
- Légendes apparaissant au survol de chaque photo

### 🖼️ Hero avec Slideshow
- Défilement automatique des vraies photos de course (toutes les 5s)
- Transition douce entre les slides
- Points de navigation cliquables
- Compteurs animés : 150+ membres, 30+ courses/an, 45 ans d'histoire

### 📱 Navigation Complète
- **Menu sticky** avec effet au scroll
- **Mega-menus déroulants** : Nos Courses, Archives (2015–2024), Médias, Liens
- **Hamburger mobile** responsive avec overlay
- Liens actifs dynamiques selon la section visible

### 📋 Contenu Intégral du Site Original
Toutes les sections extraites de courezavecnous.com :

| Section | Contenu |
|---------|---------|
| **Nos Courses** | 10km Sarreguemines, Sarregueminoises, Backyard Ultra — avec onglets |
| **Archives** | 2015 à 2024 avec liens directs vers le site original |
| **Médias** | Flickr (photos), YouTube (vidéos), Facebook, Le Caniste |
| **Liens Utiles** | 10 liens vers clubs et organisateurs régionaux |
| **Partenaires** | Décathlon, Ville de Sarreguemines, Continental, Crédit Mutuel... |
| **Le Club** | Historique, adhésions (20€/pers, 30€/couple), comité 2024, entraînements |
| **Challenge CAN** | Classement 2025 avec top 5, description du système |
| **Contact** | can.sarreguemines@gmail.com, adresse siège, horaires entraînements |

---

## 📁 Structure des Fichiers

```
can-website/
├── index.html          # Page principale (tout en une seule page)
├── styles.css          # Styles modernes (CSS variables, Grid, Flexbox)
├── script.js           # JavaScript vanilla (no dependencies)
├── README.md           # Cette documentation
└── images/
    ├── Sans-titre-2_01.jpg    # Logo CAN (header & footer)
    ├── Sans-titre-2_02.jpg    # Image header
    ├── facebook-logo.gif      # Logo Facebook original
    ├── freyming.jpg           # La Ronde des Belvédères 2025
    ├── diebling.jpg           # La Dieblingeoise 2025
    ├── hilsprich.jpg          # Course des Mollets Hilsprich 2025
    ├── walscheid.jpg          # Trail de Walscheid 2025
    ├── spitrail.jpg           # Spit'Trail L'Hôpital 2025
    ├── cobach.jpg             # Grand 8 de la Cobach 2025
    ├── verriers.png           # Trail des Verriers 2025
    ├── walditrail.png         # Walditrail de Neufgrange 2025
    ├── niderbronn.jpg         # Trails de Niederbronn 2025
    ├── crehange.jpg           # Trail des Comtes de Créhange 2025
    └── epiphanie.jpg          # Sortie de l'Épiphanie 2025
```

---

## 🚀 Mise en Production

### Option 1 : GitHub Pages (Recommandé — Gratuit)
```bash
# 1. Créer un repo sur github.com
# 2. Uploader tous les fichiers (index.html, styles.css, script.js + dossier images/)
# 3. Settings → Pages → Branch: main → Save
# URL: https://votre-username.github.io/can-sarreguemines/
```

### Option 2 : Netlify Drop (2 minutes)
1. Aller sur https://app.netlify.com/drop
2. Glisser-déposer le dossier `can-website/`
3. Site en ligne immédiatement avec URL gratuite
4. Connecter le domaine `courezavecnous.com` dans les paramètres

### Option 3 : Hébergement Actuel (FTP)
```
1. Se connecter via FTP (FileZilla, Cyberduck...)
2. Uploader index.html, styles.css, script.js à la racine
3. Créer le dossier /images/ et y uploader toutes les photos
4. Vérifier que l'accès https://www.courezavecnous.com/ fonctionne
```

---

## 🎨 Personnalisation Rapide

### Couleurs (styles.css, lignes 20-35)
```css
:root {
  --blue:   #1d4ed8;   /* Couleur principale */
  --orange: #f97316;   /* Couleur accent */
  --purple: #7c3aed;   /* Couleur secondaire */
}
```

### Vitesse du Carousel (styles.css)
```css
.track-ltr { animation: scrollLTR 40s linear infinite; }
.track-rtl { animation: scrollRTL 40s linear infinite; }
/* Changer 40s → 30s (plus rapide) ou 60s (plus lent) */
```

### Ajouter des Photos au Carousel
Dans `index.html`, chercher `<!-- Row 1 -->` et ajouter :
```html
<div class="carousel-item">
  <img src="images/nouvelle-photo.jpg" alt="Description">
  <span>Nom de la course</span>
</div>
```

### Mise à Jour Résultats
- Chercher `class="challenge-board"` dans index.html
- Modifier les noms et points dans les `cb-row`
- Mettre à jour les liens des classements dans les `result-card`

---

## 📐 Sections de la Page

| ID | Section | Description |
|----|---------|-------------|
| `#accueil` | Hero | Slideshow + stats + CTAs |
| `.carousel-strip` | Carousel | Défilement infini des photos |
| `#actualites` | Actualités | 3 dernières nouvelles |
| `#evenements` | Événements | Agenda filtrable |
| `#resultats` | Résultats | Derniers résultats + Challenge |
| `#nos-courses` | Nos Courses | Onglets 10km/Sarregueminoises/Backyard |
| `#archives` | Archives | Liens 2015–2024 |
| `#medias` | Médias | Flickr, YouTube, Facebook, Caniste |
| `#liens-utiles` | Liens | Liens utiles + Partenaires |
| `#club` | Le Club | Histoire, adhésion, comité |
| `.cta-section` | Adhérer | Call-to-action |
| `#contact` | Contact/Footer | Coordonnées complètes |

---

## 📊 Compatibilité & Performance

- ✅ Chrome, Firefox, Safari, Edge (versions 2022+)
- ✅ iOS Safari, Android Chrome
- ✅ Aucune dépendance JavaScript externe
- ✅ CSS Variables (IE non supporté — obsolète)
- ✅ Fonts Google + Font Awesome via CDN
- ⚡ Score Lighthouse estimé : 90+/100

---

## 🔗 Liens de Référence

- **Site original** : http://www.courezavecnous.com
- **Site pilote** : https://ethanhunt1414.github.io/courezavecnous-test/
- **Inspiration carousel** : https://meydeey.com/offre/
- **Facebook CAN** : https://www.facebook.com/people/CAN-Sarreguemines/100083086042865
- **Flickr** : https://www.flickr.com/photos/127451228@N05/collections/
- **YouTube** : https://www.youtube.com/channel/UCToA7cgLOyE8D9TNn8tlWJQ
- **Inscription 10km** : https://www.le-sportif.com

---

*Courez Avec Nous — CAN Sarreguemines depuis 1980* 🏃‍♂️🏃‍♀️
