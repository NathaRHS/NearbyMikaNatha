diff --git a/d:\not ITU\nearbyHtml\frontend\seo-audit.md b/d:\not ITU\nearbyHtml\frontend\seo-audit.md
new file mode 100644
--- /dev/null
+++ b/d:\not ITU\nearbyHtml\frontend\seo-audit.md
@@ -0,0 +1,185 @@
+# Mini Audit SEO
+
+## Verdict rapide
+En l'etat actuel, le site est indexable, mais il n'est pas encore bien prepare pour un bon referencement naturel.
+
+Niveau estime :
+- Indexation : correcte
+- SEO technique : moyen
+- SEO contenu : faible a moyen
+- Potentiel e-commerce : bon, si la base est amelioree rapidement
+
+## Ce qui est deja bon
+- Le site a maintenant des pages distinctes et accessibles en URL separees.
+- Le build React multi-page fonctionne, donc les pages peuvent etre servies proprement.
+- Les pages legales existent, ce qui aide la confiance et la legitimite.
+- Les performances devraient rester correctes vu la simplicite du front.
+
+## Ce qui bloque vraiment aujourd'hui
+
+### 1. Titres de pages trop faibles
+Exemple visible :
+- [index.html](/d:/not%20ITU/nearbyHtml/frontend/index.html#L6) utilise `Document`
+
+Probleme :
+- un titre comme `Document` n'aide ni Google ni l'utilisateur
+- plusieurs pages ont des titres generiques ou faibles
+
+Impact SEO :
+- mauvaise comprehension du sujet de chaque page
+- CTR plus faible dans les resultats de recherche
+
+### 2. Aucune meta description exploitable
+Dans les pages HTML d'entree, il n'y a pas de vraie `meta description`.
+
+Impact SEO :
+- Google doit improviser l'extrait
+- moins de controle sur l'affichage dans les resultats
+
+### 3. URLs peu propres
+Exemple :
+- `conditionsGenerales..html`
+- `ProductDetail.html`
+- `compte.html`
+
+Probleme :
+- URL peu lisibles
+- nommage melange francais/anglais
+- double point dans `conditionsGenerales..html`
+
+Impact SEO :
+- ce n'est pas bloquant pour l'indexation
+- mais c'est faible pour la proprete, la confiance et le partage
+
+### 4. Balises `alt` d'images vides
+Exemple sur la home :
+- [HomePage.jsx](/d:/not%20ITU/nearbyHtml/frontend/src/pages/HomePage.jsx#L27)
+- [HomePage.jsx](/d:/not%20ITU/nearbyHtml/frontend/src/pages/HomePage.jsx#L50)
+
+Probleme :
+- presque toutes les images ont `alt=""`
+
+Impact SEO :
+- perte de contexte pour Google Images
+- accessibilite plus faible
+- signal semantique produit tres limite
+
+### 5. Contenu produit tres repetitif
+Sur la home, plusieurs produits ont le meme nom et les memes prix affiches.
+
+Exemple :
+- [HomePage.jsx](/d:/not%20ITU/nearbyHtml/frontend/src/pages/HomePage.jsx#L52)
+- [HomePage.jsx](/d:/not%20ITU/nearbyHtml/frontend/src/pages/HomePage.jsx#L63)
+
+Probleme :
+- peu de richesse semantique
+- contenu duplique visuellement
+
+Impact SEO :
+- faible pertinence sur les requetes produit
+- pages peu differenciantes
+
+### 6. Peu de contenu cible "recherche Google"
+Le site presente des sections visuelles, mais il manque du contenu qui repond a de vraies intentions de recherche :
+- categories claires
+- descriptions de collection
+- textes utiles par produit
+- FAQ orientee utilisateur/requete
+
+Impact SEO :
+- difficile de se positionner sur des requetes non brand
+
+### 7. Pas de signaux techniques SEO visibles
+Je ne vois pas encore de mise en place explicite pour :
+- sitemap XML
+- robots.txt
+- canonical
+- Open Graph
+- structured data schema.org
+
+Impact SEO :
+- indexation moins bien guidee
+- resultats enrichis absents
+- partage social moins propre
+
+### 8. Encodage de certains textes degrade
+Exemple :
+- [conditionsGenerales..html](/d:/not%20ITU/nearbyHtml/frontend/conditionsGenerales..html#L6)
+
+On voit des caracteres comme `GÃƒÂ©nÃƒÂ©rales` dans certains titres ou contenus migrés.
+
+Impact SEO :
+- qualite percue plus faible
+- risque de snippets bizarres
+- mauvais signal de finition
+
+## Priorites a corriger tout de suite
+
+### Priorite 1
+Remplacer tous les titres de pages par de vrais titres SEO.
+
+Exemples cibles :
+- Home : `Nearby Shop | Trendy Hats and Everyday Essentials`
+- Product detail : `Elegant Wide-Brim Sun Hat | Nearby Shop`
+- Terms : `Terms of Service | Nearby Shop`
+- Privacy : `Privacy Policy | Nearby Shop`
+
+### Priorite 2
+Ajouter une `meta description` unique sur chaque page.
+
+### Priorite 3
+Mettre des `alt` descriptifs sur les images utiles.
+
+Exemple :
+- `alt="Wide-brim straw hat with leather band in natural beige"`
+
+### Priorite 4
+Corriger l'encodage casse dans les titres et textes.
+
+### Priorite 5
+Rendre les URLs plus propres si tu acceptes une petite evolution technique.
+
+Exemples :
+- `/terms-of-service`
+- `/privacy-policy`
+- `/legal-notice`
+- `/about-us`
+
+### Priorite 6
+Ajouter du vrai contenu produit et categorie non duplique.
+
+### Priorite 7
+Ajouter au minimum :
+- `robots.txt`
+- `sitemap.xml`
+- balises canonical
+- Open Graph de base
+
+## Recommandation e-commerce
+Si ton objectif est de vendre, il faut surtout renforcer 3 choses :
+- pages produit uniques
+- categories mieux redigees
+- confiance technique et semantique
+
+Le SEO d'un shop ne repose pas seulement sur le design. Il repose surtout sur :
+- la qualite des pages produit
+- la clarte des categories
+- la structure technique
+- la coherence des contenus
+
+## Note finale
+Si tu lances le site tel quel :
+- il peut etre visible sur Google
+- il peut etre indexe
+- mais il aura du mal a bien se positionner sur des requetes competitives
+
+Si tu appliques les corrections prioritaires :
+- tu passes vite d'un SEO "present mais faible" a une base "propre et exploitable"
+
+## Ordre conseille des prochaines actions
+1. Corriger les titres et metas.
+2. Corriger les `alt` et l'encodage.
+3. Nettoyer les URLs.
+4. Ajouter sitemap, robots et canonical.
+5. Ameliorer les pages produit et categories.
+6. Ajouter des donnees structurees produit.
    