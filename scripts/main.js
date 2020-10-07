
import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

console.log(tabJoursEnOrdre);

const CLEAPI = '4fa21a69eaebe392b7fb3fdacee5d761';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourHeure = document.querySelectorAll('.heure-prevision-valeur');
const jourDiv3Lettres = document.querySelectorAll('.jour-prevision-nom');
const tempJour = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position); // Objet GeolocationPosition
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        appelAPI(long,lat);

    }, () => {
        alert("Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer !");
    })
}


function appelAPI(longitude, latitude) {
    
    // console.log(longitude, latitude); // Position actuelle

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)

    .then((reponse) => {
        return reponse.json();
    })

    .then((data) => {
        console.log(data); // Récupéré depuis l'appel à l'API

        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = Math.trunc(resultatsAPI.current.temp) + "°";
        localisation.innerText = resultatsAPI.timezone;

       
       
        // HEURES PAR TRANCHE DE 3 AVEC LEUR TEMPERATURE
        
        let heureActuelle = new Date().getHours() + 1;

        for (let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            if (heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24}h`;
            }
            else if (heureIncr === 24) {
                heure[i].innerText = "00 h";
            }
            else {
                heure[i].innerText = `${heureIncr}h`;
            }
        }

        // TEMPERATURES TOUTES LES 3h 
        for (let i = 0; i < tempPourHeure.length; i++) {

            tempPourHeure[i].innerText = `${Math.trunc(resultatsAPI.hourly[i * 3].temp)}°`;
        }


        // TROIS PREMIERES LETTRES DES JOURS
        for (let i = 0; i < tabJoursEnOrdre.length; i++) {

            jourDiv3Lettres[i].innerText = tabJoursEnOrdre[i].slice(0, 3)
        }


        // TEMPERATURES JOUR
        for (let i = 0; i < 7; i++) {

            tempJour[i].innerText = `${Math.trunc(resultatsAPI.daily[i + 1].temp.day)}°`;
        }


        // ICONE METEO DYNAMIQUE 
        if (heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
        }
        else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`; 
        }
    

        chargementContainer.classList.add('disparition');

    })
}