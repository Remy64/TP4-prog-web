$(document).ready(function() {

	let prenom = JSON.parse(localStorage.getItem('firstName'));
	let nom = JSON.parse(localStorage.getItem('lastName'));
	let nOrder = JSON.parse(localStorage.getItem('orderNumber'));
	$("#name").text("Votre commande est confirmée"+prenom+" "+nom);
	$("confirmation-number").text(nOrder);
})