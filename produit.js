$(document).ready(function(){

	var produit;
	$.getJSON('data/products.json',


		function(data) { 


			let idUnknown = true ;
			data.forEach(function(element) {


				if (element['id'] == $.urlParam('id')) {

					idUnknown = false;
					$("#product-title").text(element['name']);
					$("#product-desc + p").html(element['description']);
					$("#product-features + ul").empty();
					$("#product-price strong").text(element['price']);
					$("#product-image").attr("src", "./assets/img/"+element['image'])

					element['features'].forEach(function(feature) {

						$("#product-features + ul").append("<li>"+feature+"</li>") ;


					})

					    produit = {	
						"name" : element['name'],
						"prix": element['price']


					};

				}
			});

			if (idUnknown) {

				$(".row").remove();
				$("h1").text("Page non trouvée!");

			}
		});



	$("#add-to-cart-form .btn").click(function(event) {

		event.preventDefault() ;

		let panier = JSON.parse(localStorage.getItem('panier'));
		let ajout = {
			"id" : $.urlParam('id'), 
			"name" : produit["name"],
			"prix" : produit["prix"],
			"quantite" : $("#product-quantity").val()
		};
		if (typeof panier == "undefined" || panier == null ) {


			panier = [ajout] ;



		} else if (!ProductInShoppingCart(panier)){

			panier.push(ajout) ;
		}
		let val = JSON.stringify(panier);
		localStorage.setItem("panier", val) ;
		$.getScript("./assets/scripts/entete.js"); 
		$("#dialog").show();
		setTimeout(function(){
		$("#dialog").hide() ;}, 5000);


	});

	function ProductInShoppingCart (panier) {


		let indice = 0;
		let trouve = false;
		
		while(!trouve && (indice < panier.length)) {

			if (panier[indice]["id"]== $.urlParam("id")) {
				trouve = true;


			} else {
				indice++ ;
			}
		}
		return trouve ;
	}


	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return results[1] || 0;
		}
	}

});

