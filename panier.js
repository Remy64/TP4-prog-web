$(document).ready(function() {

	var panier = JSON.parse(localStorage.getItem('panier')) ;
	var total = 0;

	if (typeof panier == "undefined" || panier == null || panier.length == 0) {

		panierEmpty();

	} else {  
		$(".empty").hide();
		$("tbody").empty();
			panier.sort(function(a,b){return a["name"].localeCompare(b["name"])});
		panier.forEach(function(element) {


			$("tbody").append("<tr></tr>");
			$("tbody tr:last-child").append("<td><button class='remove-item-button' title='Supprimer'><i class='fa fa-times'></i></button></td>");
			$("tbody tr:last-child").append("<td class='product-name'><a  href='./product.html"+"?id="+element["id"]+"'>"+element["name"]+"</a></td>");
			$("tbody tr:last-child").append("<td>"+element["prix"].toString().replace(".",",")+"&thinsp;$ </td>");
			$("tbody tr:last-child").append("<td></td>");
			$("tbody tr:last-child td:last-child").append("<div class='row'></div>");
			$("tbody tr:last-child td:last-child div").append("<div class='col'></div>");
			$("tbody tr:last-child td:last-child div div").append("<button class='remove-quantity-button' title='Retirer' disabled=''><i class='fa fa-minus'></i></button>");
			$("tbody tr:last-child td:last-child > div").append("<div class='col quantity'>"+element["quantite"]+"</div>");
			$("tbody tr:last-child td:last-child > div").append("<div class='col'></div>");
			$("tbody tr:last-child td:last-child > div div:last-child").append("<button class='add-quantity-button' title='Ajouter'><i class='fa fa-plus'></i></button>");
			$("tbody tr:last-child").append("<td class='price'>"+(element["prix"]*element["quantite"]).toFixed(2).replace(".", ",")+"</td>");
			total += parseFloat((element["prix"]*element["quantite"]).toFixed(2));
			$("#total-amount").text(total.toFixed(2).replace(".", ","));

			if (element["quantite"] >= 2) {
				$("tr:last-child .remove-quantity-button").removeAttr("disabled") ;
			}
			


		});

	
	




	


		}
	$(".remove-item-button").click(function(event){

		event.preventDefault();
		let valid = confirm("Voulez-vous supprimer le produit du panier ?");
		if (valid) {
		let ligne = $(this).parent().parent();
		let indice = findProduct(ligne, panier)
		let prix = parseFloat((panier[indice]["prix"]*panier[indice]["quantite"]).toFixed(2));
		panier.splice(indice, 1);
		localStorage.setItem("panier",JSON.stringify(panier));
		total -= prix;
		$("#total-amount").text(total.toFixed(2).toString().replace(".", ",")) ;
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

		let indice = findProduct(ligne, panier);
		
		if (--panier[indice]["quantite"]==1) {
			$(this).attr("disabled", '');

		}
		let prix = (panier[indice]["prix"]*panier[indice]["quantite"]).toFixed(2);
		total -=  parseFloat(panier[indice]["prix"].toFixed(2));
		ligne.find(".price").text(prix.replace(".", ","));
		$("#total-amount").text(total.toFixed(2).toString().replace(".", ",")) ;
		

		localStorage.setItem("panier", JSON.stringify(panier));
		ligne.find(".quantity").text(panier[indice]["quantite"]);
		$.getScript("./assets/scripts/entete.js");



	})

		$(".add-quantity-button").click(function(event){

		event.preventDefault();
		let ligne = $(this).parent().parent().parent().parent();

		let indice = findProduct(ligne, panier);
		
		panier[indice]["quantite"]++ ;
		let prix = (panier[indice]["prix"]*panier[indice]["quantite"]).toFixed(2);
		total +=  parseFloat((panier[indice]["prix"].toFixed(2)));
		ligne.find(".price").text(prix.replace(".", ","));
		$("#total-amount").text(total.toFixed(2).replace(".", ",")) ;
		ligne.find(".remove-quantity-button").removeAttr("disabled");
		

		localStorage.setItem("panier", JSON.stringify(panier));
		ligne.find(".quantity").text(panier[indice]["quantite"]);
		$.getScript("./assets/scripts/entete.js");



	})

		$("#remove-all-items-button").click(function(event){

			event.preventDefault();

			let valid = confirm("Voulez-vous supprimer tous les produits du panier ?");
			if (valid) {
			panierEmpty();
			$("tbody").empty();
			panier = [];
			localStorage.setItem("panier", JSON.stringify(panier));
			$.getScript("./assets/scripts/entete.js");
			
		}



		})


		

	


});

function findProduct(ligne, panier) {

	let name = ligne.children(".product-name").text();
		let indice = 0;
		let trouve = false;
		
		while(!trouve && (indice < panier.length)) {

			if (panier[indice]["name"]==name) {
				trouve = true;


			} else {
				indice++ ;
			}
		}
return indice;
}

function panierEmpty(){

		$(".table, .btn, .shopping-cart-total").hide();
		$(".empty").show();

}

	