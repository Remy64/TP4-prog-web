$(document).ready(function() {

	var panier = JSON.parse(localStorage.getItem('panier')) ;
	var total = 0;

	if (typeof panier == "undefined" || panier == null || panier.length == 0) {

		panierEmpty();

	} else {  

		$("tbody").empty();
			panier.sort(function(a,b){return a["name"].localeCompare(b["name"])});
		panier.forEach(function(element) {


			$("tbody").append("<tr></tr>");
			$("tbody tr:last-child").append("<td><button class='remove-item-button' title='Supprimer'><i class='fa fa-times'></i></button></td>");
			$("tbody tr:last-child").append("<td class='product-name'><a  href='./product.html"+"?id="+element["id"]+"'>"+element["name"]+"</a></td>");
			$("tbody tr:last-child").append("<td>"+element["prix"]+"&thinsp;$ </td>");
			$("tbody tr:last-child").append("<td></td>");
			$("tbody tr:last-child td:last-child").append("<div class='row'></div>");
			$("tbody tr:last-child td:last-child div").append("<div class='col'></div>");
			$("tbody tr:last-child td:last-child div div").append("<button class='remove-quantity-button' title='Retirer' disabled=''><i class='fa fa-minus'></i></button>");
			$("tbody tr:last-child td:last-child > div").append("<div class='col quantity'>"+element["quantite"]+"</div>");
			$("tbody tr:last-child td:last-child > div").append("<div class='col'></div>");
			$("tbody tr:last-child td:last-child > div div:last-child").append("<button class='add-quantity-button' title='Ajouter'><i class='fa fa-plus'></i></button>");
			$("tbody tr:last-child").append("<td class='price'>"+element["prix"]*element["quantite"]+"</td>");
			total += element["prix"]*element["quantite"];	
			if (element["quantite"] > 1) {
				$("button[title=Retirer").removeAttr("disabled") ;
			}
			$("#total-amount").text(total);


		});

	
	




	


		}
	$(".remove-item-button").click(function(event){

		event.preventDefault();
		let valid = confirm("Voulez-vous supprimer le produit du panier ?");
		if (valid) {
		let ligne = $(this).parent().parent();
		var prix = ligne.children(".price").text();
		let name = ligne.children(".product-name").text();
		let indice = 0;
		let trouve = false;
		while(!trouve && (indice < panier.length)) {

			if (panier[indice]["name"]==name) {
				trouve = true;


			} else {
				indice++
			}
		}
		panier.splice(indice, 1);
		localStorage.setItem("panier",JSON.stringify(panier));
		total -= prix;
		$("#total-amount").text(total) ;
		ligne.remove() ;
		if (panier.length==0) {

			panierEmpty();
		}
		$.getScript("./assets/scripts/entete.js");

	}

		})

	$(".remove-quantity-button").click(function(event){

		event.preventDefault();
		let ligne = $(this).parent().parent().parent().parent();

		let name = ligne.children(".product-name").text();
		let indice = 0;
		let trouve = false;
		while(!trouve && (indice < panier.length)) {

			if (panier[indice]["name"]==name) {
				trouve = true;


			} else {
				indice++
			}
		}
		
		if (--panier[indice]["quantite"]==1) {
			$(this).attr("disabled", '');

		}
		let prix = panier[indice]["prix"]*panier[indice]["quantite"];
		total -=  panier[indice]["prix"];
		ligne.find(".price").text(prix);
		$("#total-amount").text(total) ;
		

		localStorage.setItem("panier", JSON.stringify(panier));
		ligne.find(".quantity").text(panier[indice]["quantite"]);



	})

		$(".add-quantity-button").click(function(event){

		event.preventDefault();
		let ligne = $(this).parent().parent().parent().parent();

		let name = ligne.children(".product-name").text();
		let indice = 0;
		let trouve = false;
		
		while(!trouve && (indice < panier.length)) {

			if (panier[indice]["name"]==name) {
				trouve = true;


			} else {
				indice++
			}
		}
		
		panier[indice]["quantite"]++
		let prix = panier[indice]["prix"]*panier[indice]["quantite"];
		total +=  panier[indice]["prix"];
		ligne.find(".price").text(prix);
		$("#total-amount").text(total) ;
		ligne.find(".remove-quantity-button").removeAttr("disabled");
		

		localStorage.setItem("panier", JSON.stringify(panier));
		ligne.find(".quantity").text(panier[indice]["quantite"]);



	})

		$(".remove-all-items-button").click(function(event){

			event.preventDefault();

			let valid = confirm("Voulez-vous supprimer tous les produits du panier ?");
			if (valid) {
			panierEmpty();
			$("tbody").empty();
			panier = [];
			localStorage.setItem("panier", JSON.stringify(panier));
			alert(typeof panier);
		}



		})


		

	


});


function panierEmpty(){

		$(".table, .btn, .shopping-cart-total").hide();
		$("article").append("<p class='empty'> Aucun produit dans le panier </p>");

}

	