const { db } = require('../config/database');

// Funktion zum Abrufen aller Bewerber
const getApplicants = (req, res) => {
  db.all('SELECT * FROM applicants', (err, rows) => {
    if (err) {
      console.error('Fehler beim Abrufen der Bewerber:', err);
      res.status(500).json({ error: 'Fehler beim Abrufen der Bewerber' });
    } else {
      res.json(rows);
    }
  });
};

// Funktion zum Abrufen eines Bewerbers anhand der ID
const getApplicantById = (req, res) => {
  const applicantId = req.params.id;
  db.get('SELECT * FROM applicants WHERE id = ?', [applicantId], (err, row) => {
    if (err) {
      console.error('Fehler beim Abrufen des Bewerbers:', err);
      res.status(500).json({ error: 'Fehler beim Abrufen des Bewerbers' });
    } else if (!row) {
      res.status(404).json({ error: 'Bewerber nicht gefunden' });
    } else {
      res.json(row);
    }
  });
};

// Funktion zum Abrufen des akademischen Werdegangs eines Bewerbers anhand der Bewerber-ID
const getAkademischerWerdegangByApplicantId = (req, res) => {
  const applicantId = req.params.id;
  db.all('SELECT * FROM akademischerWerdegang WHERE applicantId = ?', [applicantId], (err, rows) => {
    if (err) {
      console.error('Fehler beim Abrufen des akademischen Werdegangs:', err);
      res.status(500).json({ error: 'Fehler beim Abrufen des akademischen Werdegangs' });
    } else {
      res.json(rows);
    }
  });
};

// Funktion zum Abrufen der Fähigkeiten eines Bewerbers anhand der Bewerber-ID
const getFaehigkeitenByApplicantId = (req, res) => {
  const applicantId = req.params.id;
  db.all('SELECT * FROM faehigkeiten WHERE applicantId = ?', [applicantId], (err, rows) => {
    if (err) {
      console.error('Fehler beim Abrufen der Fähigkeiten:', err);
      res.status(500).json({ error: 'Fehler beim Abrufen der Fähigkeiten' });
    } else {
      res.json(rows);
    }
  });
};

// Funktion zum Abrufen des beruflichen Werdegangs eines Bewerbers anhand der Bewerber-ID
const getBeruflicherWerdegangByApplicantId = (req, res) => {
  const applicantId = req.params.id;
  db.all('SELECT * FROM beruflicherWerdegang WHERE applicantId = ?', [applicantId], (err, rows) => {
    if (err) {
      console.error('Fehler beim Abrufen des beruflichen Werdegangs:', err);
      res.status(500).json({ error: 'Fehler beim Abrufen des beruflichen Werdegangs' });
    } else {
      res.json(rows);
    }
  });
};

// Exportieren der Funktionen
module.exports = {
  getApplicants,
  getApplicantById,
  getAkademischerWerdegangByApplicantId,
  getFaehigkeitenByApplicantId,
  getBeruflicherWerdegangByApplicantId
};

