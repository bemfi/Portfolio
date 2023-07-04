const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Pfad zum Datenverzeichnis
const dataDirectory = path.join(__dirname, 'data');

// Funktion zum Erstellen des Datenverzeichnisses
const createDataDirectory = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
    console.log('Das Datenverzeichnis wurde erstellt.');
  }
};

// Pfad zur SQLite-Datenbankdatei
const dbPath = path.join(dataDirectory, 'database.db');

// Datenbankverbindung herstellen
const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error('Fehler beim Herstellen der Datenbankverbindung:', err);
  } else {
    console.log('Datenbankverbindung hergestellt');
    // Hier können Sie die CREATE TABLE-Anweisungen und andere Datenbankoperationen durchführen
  }
});

// Funktion zum Schließen der Datenbankverbindung
const closeDatabaseConnection = () => {
  db.close(err => {
    if (err) {
      console.error('Fehler beim Schließen der Datenbankverbindung:', err);
    } else {
      console.log('Datenbankverbindung geschlossen');
    }
  });
};

// CREATE TABLE-Anweisungen für alle Tabellen
db.serialize(() => {
  // Löschen der vorhandenen Daten in den Tabellen
  db.run('DROP TABLE IF EXISTS applicants');
  db.run('DROP TABLE IF EXISTS beruflicherWerdegang');
  db.run('DROP TABLE IF EXISTS akademischerWerdegang');
  db.run('DROP TABLE IF EXISTS faehigkeiten');

  // Tabelle "applicants"
  db.run(`
    CREATE TABLE IF NOT EXISTS applicants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nachname TEXT,
      vorname TEXT,
      geburtsdatum TEXT,
      adresse TEXT,
      email TEXT,
      telefon TEXT,
      eigeneBeschreibung TEXT,
      bild TEXT,
      hobbys TEXT
    )
  `);

  // Tabelle "beruflicherWerdegang"
  db.run(`
    CREATE TABLE IF NOT EXISTS beruflicherWerdegang (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      applicantId INTEGER,
      position TEXT,
      unternehmen TEXT,
      zeitraum TEXT,
      beschreibung TEXT,
      FOREIGN KEY (applicantId) REFERENCES applicants (id)
    )
  `);

  // Tabelle "akademischerWerdegang"
  db.run(`
    CREATE TABLE IF NOT EXISTS akademischerWerdegang (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      applicantId INTEGER,
      abschluss TEXT,
      universitaet TEXT,
      akadem_zeitraum TEXT,
      akadem_beschreibung TEXT,
      FOREIGN KEY (applicantId) REFERENCES applicants (id)
    )
  `);

  // Tabelle "faehigkeiten"
  db.run(`
    CREATE TABLE IF NOT EXISTS faehigkeiten (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      applicantId INTEGER,
      faehigkeit TEXT,
      koennen TEXT,
      FOREIGN KEY (applicantId) REFERENCES applicants (id)
    )
  `);

  // Weitere CREATE TABLE-Anweisungen für zusätzliche Tabellen

});

// Funktion zum Einfügen von Initialdaten
const insertInitialData = () => {
  // Einfügen von Initialdaten in die Tabelle "applicants"
  db.run(`
    INSERT INTO applicants (nachname, vorname, geburtsdatum, adresse, email, telefon, eigeneBeschreibung, bild, hobbys)
    VALUES ('Fischer', 'Benjamin', '20.04.1994', 'Musterstraße 28, 89269 Ulm', 'max.mustermann@example.com', '123456789', 'Entdecken Sie eine aufgeschlossene, neugierige und wissbegierige Persönlichkeit, die stets nach neuen Erkenntnissen und Erfahrungen strebt', 'image/profilbild.jpg', 'Schwimmen, Wander, Schach')
  `, function (err) {
    if (err) {
      console.error('Fehler beim Einfügen des Bewerbers:', err);
    } else {
      console.log('Bewerber erfolgreich eingefügt. ID:', this.lastID);
      const applicantId = this.lastID;

      // Einfügen von Initialdaten in die Tabelle "beruflicherWerdegang"
      db.run(`
        INSERT INTO beruflicherWerdegang (applicantId, position, unternehmen, zeitraum, beschreibung)
        VALUES (${applicantId}, 'Fachangestellter für Bäderbetriebe', 'mehrere Städte', '2009-2019', 'Zuständig als Schichtleiter')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen des beruflichen Werdegangs:', err);
        } else {
          console.log('Beruflicher Werdegang erfolgreich eingefügt. ID:', this.lastID);
        }
      });

      // Einfügen von Initialdaten in die Tabelle "akademischerWerdegang"
      db.run(`
        INSERT INTO akademischerWerdegang (applicantId, abschluss, universitaet, akadem_zeitraum, akadem_beschreibung)
        VALUES (${applicantId}, 'Beachelor', 'Hochschule Kempten', '2021-heute', 'Informatik Student')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen des akademischen Werdegangs:', err);
        } else {
          console.log('Akademischer Werdegang erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO akademischerWerdegang (applicantId, abschluss, universitaet, akadem_zeitraum, akadem_beschreibung)
        VALUES (${applicantId}, 'Beachelor', 'Hochschule Kempten', '2020-2021', 'Energie- und Umwelttechnik Student')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen des akademischen Werdegangs:', err);
        } else {
          console.log('Akademischer Werdegang erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO akademischerWerdegang (applicantId, abschluss, universitaet, akadem_zeitraum, akadem_beschreibung)
        VALUES (${applicantId}, 'Fachabi', 'FOS/BOS Neu-Ulm', '2019-2020', 'Fachabitur gemacht')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen des akademischen Werdegangs:', err);
        } else {
          console.log('Akademischer Werdegang erfolgreich eingefügt. ID:', this.lastID);
        }
      });

      // Einfügen von Initialdaten in die Tabelle "faehigkeiten"
      db.run(`
        INSERT INTO faehigkeiten (applicantId, faehigkeit, koennen)
        VALUES (${applicantId}, 'Microsoft Office', 'sehr gute Kenntnisse')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen der Fähigkeit:', err);
        } else {
          console.log('Fähigkeit erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO faehigkeiten (applicantId, faehigkeit, koennen)
        VALUES (${applicantId}, 'VBA', 'sehr gute Kenntnisse')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen der Fähigkeit:', err);
        } else {
          console.log('Fähigkeit erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO faehigkeiten (applicantId, faehigkeit, koennen)
        VALUES (${applicantId}, 'C, C++', 'gute Kenntnisse')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen der Fähigkeit:', err);
        } else {
          console.log('Fähigkeit erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO faehigkeiten (applicantId, faehigkeit, koennen)
        VALUES (${applicantId}, 'HTML, CSS', 'gute Kenntnisse')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen der Fähigkeit:', err);
        } else {
          console.log('Fähigkeit erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO faehigkeiten (applicantId, faehigkeit, koennen)
        VALUES (${applicantId}, 'SQL, NoSQL', 'Grundkenntnisse')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen der Fähigkeit:', err);
        } else {
          console.log('Fähigkeit erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO faehigkeiten (applicantId, faehigkeit, koennen)
        VALUES (${applicantId}, 'Python', 'Grundkenntisse')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen der Fähigkeit:', err);
        } else {
          console.log('Fähigkeit erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO faehigkeiten (applicantId, faehigkeit, koennen)
        VALUES (${applicantId}, 'JavaScript', 'Grundkenntnisse')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen der Fähigkeit:', err);
        } else {
          console.log('Fähigkeit erfolgreich eingefügt. ID:', this.lastID);
        }
      });
      db.run(`
        INSERT INTO faehigkeiten (applicantId, faehigkeit, koennen)
        VALUES (${applicantId}, 'PHP', 'Grundkenntnisse')
      `, function (err) {
        if (err) {
          console.error('Fehler beim Einfügen der Fähigkeit:', err);
        } else {
          console.log('Fähigkeit erfolgreich eingefügt. ID:', this.lastID);
        }
      });
    }
  });

  // Weitere INSERT-Anweisungen für das Einfügen von Initialdaten in die Tabellen
};

// Exportieren der Module/Funktionen
module.exports = {
  db,
  closeDatabaseConnection,
  insertInitialData
};

// Erstellen des Datenverzeichnisses
createDataDirectory();
