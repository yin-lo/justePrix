/* ----------avec un prof particulier-------- */

// fonction pour créer le nombre aléatoire :
// ceil arrondit au supérieur donc il ne prendra jamais zéro
// min et max permet d'avoir toujours min < max
function getRandomNumber(a = 100, b = 500) {
	const min = Math.min(a, b);
	const max = Math.max(a, b);
	return Math.ceil(Math.random() * (max - min) + min);
}

// Objet de configuration avec le nombre à trouver (justPrice) et le nombre d'essai (score):
const game = {
	justPrice: getRandomNumber(),
	score: 0,
	parties: [],
};

// afficher la solution, chut on triche !
console.log(game.justPrice);

// initialiser le jeu en demandant à l'utilisateur :
let indice = `Trouvez le juste prix !`;

// la fonction d'essai pour savoir si on se rapproche de la bonne réponse :
function essay(tentative) {
	// bonus : indiquer le nombre de tentatives et le nombre essayé dans la console :
	console.log(`Tentative ${game.score} : ${tentative}`);

	// condition pour sortir de la boucle : trouver le bon prix ! OU si on annule:
	if (tentative === game.justPrice || tentative === 0) {
		return false;
	}
	// pour rester dans la boucle, il ne faut pas trouver le bon résultat :
	if (tentative < game.justPrice) {
		indice = `${tentative} est trop petit. Réessayez !`;
	} else {
		indice = `${tentative} est trop grand. Réessayez !`;
	}
	return true;
}

//* fonction du jeu global (play) si on veut recommencer en boucle après avoir trouvé la bonne solution une première fois:
// à la fin d'une partie, stocker le score dans le tableau et réinitialiser la prochaine manche à zéro:
function endPlay(note) {
	game.parties.push(note);
	game.score = 0;
	game.justPrice = getRandomNumber();
	console.log(game.justPrice);
	indice = `Trouvez le nouveau juste prix !`
}

function play() {
	// boucle pour relancer les manches jusqu'à trouver la bonne réponse pour une partie :
	do {
		do {
			// cela permet de ne pas augmenter le score si l'utilisateur est un gros naze et rentre une lettre à la place d'un nombre :
			tryNumber = Number(prompt(indice));
			indice = `Ceci n'est pas un nombre. Veuillez ne renseigner que des chiffres.`;
		} while (isNaN(tryNumber));
		// incrémente le nombre d'essais
		game.score++;
	} while (essay(tryNumber));

	// affiche des messages différents si on annule (équivaut à 0) ou si on a la bonne réponse
	if (tryNumber === 0) {
		alert(`Dommage que tu abandonnes`);
		endPlay(`Abandon`);
	} else {
		alert(`Bravo ! Vous avez trouvé le juste prix de ${game.justPrice} € en ${game.score} essai(s) !`);
		endPlay(game.score);
	}
	// laisser le choix au joueur de rejouer ou d'arrêter(confirm)
	if (confirm(`Souhaitez-vous rejouer ?`)) {
		play();
	}
}

play();

// afficher les résultats à la fin de chaque partie terminée
let resume = `Voici le résumé de vos parties :\n`;
game.parties.forEach((score, partie) => {
	resume = resume + `\nPartie ${partie + 1} : ${score}${score === 'Abandon' ? '' : ' essai(s)'}`;
});
alert(resume);
console.log(resume);
