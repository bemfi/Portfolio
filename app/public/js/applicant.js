// Verbindung zur API herstellen und Daten abrufen
fetch('/api/applicants')
  .then(response => response.json())
  .then(data => {
    // Daten erfolgreich empfangen
    console.log(data);

    // Daten in ein Objekt mit Schlüsseln für die IDs umwandeln
    const dataObject = {
      vorname: data[0].vorname,
      name: data[0].nachname,
      eigeneBeschreibung: data[0].eigeneBeschreibung,
      geburtsdatum: data[0].geburtsdatum,
      adresse: data[0].adresse,
      email: data[0].email,
      telefon: data[0].telefon,
      bild: data[0].bild,
      bild2: data[0].bild,
      hobbys: data[0].hobbys
    };

    // Alle Daten in das entsprechende HTML-Element einfügen
    for (const key in dataObject) {
      const element = document.querySelector(`#${key}`);
      if (element) {
        if (key === 'bild') {
          element.style.backgroundImage = `url(${dataObject[key]})`;
        } else if (key === 'bild2') {
          element.src = `../${dataObject[key]}`;
        } else {
          element.textContent = dataObject[key];
        }
      }
    }

    // Akademischer Werdegang abrufen
    const applicantId = data[0].id;
    Promise.all([
      fetch(`/api/applicants/${applicantId}/akademischerWerdegang`).then(response => response.json()),
      fetch(`/api/applicants/${applicantId}/beruflicherWerdegang`).then(response => response.json()),
      fetch(`/api/applicants/${applicantId}/faehigkeiten`).then(response => response.json())
    ]).then(([akademischerWerdegang, beruflicherWerdegang, faehigkeiten]) => {
      // Akademischer Werdegang erfolgreich empfangen
      console.log(akademischerWerdegang);
      console.log(beruflicherWerdegang);
      console.log(faehigkeiten);

      // Daten in das entsprechende HTML-Element einfügen
      const akademischerWerdegangElement = document.querySelector('#akademischerWerdegang');
      akademischerWerdegangElement.innerHTML = ''; // Leeren des Inhalts des Elements

      akademischerWerdegang.forEach(eintrag => {
        const { abschluss, universitaet, akadem_zeitraum, akadem_beschreibung } = eintrag;

        // Erstellen und Hinzufügen des HTML-Codes für einen Eintrag im akademischen Werdegang
        const eintragHTML = `
          <div class="eintrag">
            <h3>${abschluss}</h3>
            <p>${universitaet}</p>
            <p>${akadem_zeitraum}</p>
            <p>${akadem_beschreibung}</p>
          </div>
        `;
        akademischerWerdegangElement.innerHTML += eintragHTML;
      });

      const beruflicherWerdegangElement = document.querySelector('#beruflicherWerdegang');
      beruflicherWerdegangElement.innerHTML = ''; // Leeren des Inhalts des Elements

      beruflicherWerdegang.forEach(eintrag => {
        const { position, unternehmen, zeitraum, beschreibung } = eintrag;

        // Erstellen und Hinzufügen des HTML-Codes für einen Eintrag im beruflichen Werdegang
        const eintragHTML = `
          <div class="eintrag">
            <h3>${unternehmen}</h3>
            <p>${position}</p>
            <p>${zeitraum}</p>
            <p>${beschreibung}</p>
          </div>
        `;
        beruflicherWerdegangElement.innerHTML += eintragHTML;
      });

      const faehigkeitenElement = document.querySelector('#faehigkeiten');
      faehigkeitenElement.innerHTML = ''; // Leeren des Inhalts des Elements

      faehigkeiten.forEach(eintrag => {
        const { faehigkeit, koennen } = eintrag;

        // Erstellen und Hinzufügen des HTML-Codes für einen Eintrag in den Fähigkeiten
        const eintragHTML = `
          <div class="eintrag">
            <p class="display">${faehigkeit}</p>
            <p class="display">${koennen}</p>
          </div>
        `;
        faehigkeitenElement.innerHTML += eintragHTML;
      });
    }).catch(error => console.error(error));
  })
  .catch(error => console.error(error));


  const API_URL = `https://api.thecatapi.com/v1/`;
  const API_KEY = "DEMO-API-KEY";
  
  let currentImageToVoteOn;
  
  function showImageToVoteOn()
  {
    
    const url = `${API_URL}images/search`;
  
    fetch(url,{headers: {
      'x-api-key': API_KEY
    }})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      currentImageToVoteOn = data[0];
      document.getElementById("image-to-vote-on").src= currentImageToVoteOn.url;
    });
  
  }
  
  function vote(value)
  {
    
    const url = `${API_URL}votes/`;
    const body = {
      image_id:currentImageToVoteOn.id,
      value
    }
    fetch(url,{method:"POST",body:JSON.stringify(body),headers: {
      'content-type':"application/json",
      'x-api-key': API_KEY
    }})
    .then((response) => {
      showImageToVoteOn()
    })
  }
  
  showImageToVoteOn()