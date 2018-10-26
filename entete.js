$(document).ready(function(){
function getNumberProduct(){
	
		if(typeof localStorage!='undefined'){ 
			//get the number of item ie the number of row in the table
			let panier = JSON.parse(localStorage.getItem("panier"));

			if (typeof panier != "undefined" && panier != null) {
			var nb_product = panier.length; 
		} else {
			var nb_product = 0 ;
		}
			localStorage.setItem("nb_product",nb_product);
		}
	
	init();
}

function init(){
	'use strict'
	var count = document.getElementsByClassName("count");

	if(typeof localStorage!='undefined'){
		var value = localStorage.getItem("nb_product"); 
	}else{
		var value = 0;
	}
	count[0].textContent=value;
	if (count[0].textContent == 0){
		$(count).hide();//working
	}
	//$(count).hide();
}


window.onload = getNumberProduct();
});