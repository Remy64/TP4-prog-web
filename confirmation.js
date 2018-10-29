$(document).ready(function() {

	let prenom = localStorage.getItem('firstName');
	let nom = localStorage.getItem('lastName');
	let nOrder = localStorage.getItem('orderNumber');
	nOrder++;
	localStorage.setItem("orderNumber", nOrder);
	$("#name").text("Votre commande est confirmée "+prenom+" "+nom);
	$("#confirmation-number").text(nOrder);
})