
const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

let ajd = new Date();
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
// console.log(jourActuel, ajd);

// Première lettre en majuscule
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
// console.log(jourActuel);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));

// retourne le tableau à partir d'aujourd'hui
// concat à l'ancien tableau de 0 (début du tableau) jusqu'au jour de la semaine actuelle 

// console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;


// découpe le tableau des jours de la jours de la Semaine
// 1er tableau qui va de mercredi à dimanche (slice coupe le tableau joursSemaine à partir du jour actuel)
// 2ème tableau qui va de lundi à mardi inclus (slice coupe le tableau de lundi au jour actuel exclus)
// on concatène les 2 tableaux mercredi, jeudi, vendredi, samedi, dimanche, lundi, mardi



