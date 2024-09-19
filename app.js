const express = require('express');
const app = express();
const port = 3000;

// Middleware pour vérifier les heures d'ouverture
function checkBusinessHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // 0 (Dimanche) à 6 (Samedi)
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Heures ouvrables
  } else {
    res.send('L’application web n’est disponible que pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
}

app.use(checkBusinessHours);

// Configurer le moteur de modèle (EJS dans cet exemple)
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour servir les fichiers statiques (CSS)
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
