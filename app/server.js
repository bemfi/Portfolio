const express = require('express');
const path = require('path');
const { db, closeDatabaseConnection, insertInitialData } = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Statische Dateien aus dem "public" Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Routen für die API
const dataController = require('./controllers/dataController');

// Abrufen aller Bewerber
app.get('/api/applicants', dataController.getApplicants);

// Abrufen eines Bewerbers anhand der ID
app.get('/api/applicants/:id', dataController.getApplicantById);

// Abrufen des akademischen Werdegangs eines Bewerbers anhand der Bewerber-ID
app.get('/api/applicants/:id/akademischerWerdegang', dataController.getAkademischerWerdegangByApplicantId);

// Abrufen der Fähigkeiten eines Bewerbers anhand der Bewerber-ID
app.get('/api/applicants/:id/faehigkeiten', dataController.getFaehigkeitenByApplicantId);

// Abrufen des beruflichen Werdegangs eines Bewerbers anhand der Bewerber-ID
app.get('/api/applicants/:id/beruflicherWerdegang', dataController.getBeruflicherWerdegangByApplicantId);

// Fallback für nicht gefundenen Seiten
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Datenbankverbindung herstellen
db.serialize(() => {
  // Weitere Datenbankoperationen hier durchführen

  // Einfügen von Initialdaten
  insertInitialData();
});

// Schließen der Datenbankverbindung am Ende des Programms
process.on('exit', () => {
  closeDatabaseConnection();
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
