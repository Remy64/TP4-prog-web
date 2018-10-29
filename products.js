function cleanProducts(){
	$('#products-list').html("");
}

function refreshPoducts(file){
	cleanProducts();
	$.getJSON(file,function traitement(data){
		//garder la catégorie souhaitée
		looker = document.getElementById("product-categories");
		categorie = looker.getElementsByClassName("selected")[0].innerHTML;
		categories = ["cameras","consoles","screens","computers"];
		var scenario = 0;
		switch(categorie){
			case "Tous les produits":
				scenario=4;
				break;
		
			case "Ordinateurs":
				scenario=3;
				break;

			case "Écrans":
				scenario=2;
				break;
		
			case "Consoles":
			scenario=1;
			break;
		
			case "Appareils photo":
				scenario=0;
				break;			

			default :
			scenario=-1;
		}

		if(scenario==-1){
			alert("Tout cassé")
		}
		else if(scenario!=4){
			var res = [];
			var key = categories[scenario];
			data.forEach(function(elt){
				if(elt["category"]==key){
					res.push(elt);
				}
			})
		}
		else{
			res=data;
		}

		//trier data dans l'ordre souhaité

		var tri = document.getElementById('product-criteria').getElementsByClassName('selected')[0].innerHTML;

		var prix = false;
		var up = false;
		
		switch(tri){
			case "Prix (bas-haut)":
				prix=true;
				up=true;
				break;
			case "Prix (haut-bas)":
				prix=true;
				up=false;
				break;
			case "Nom (A-Z)":
				prix=false;
				up=true;
				break;
			case "Nom (Z-A)":
				prix = false;
				up=false;
				break;
			default:
				prix = true;
				up = true;
		}

		switch(prix){
			case true:
				res.sort(function(a,b){return a["price"] - b["price"]});
				break;
			case false:
				res.sort(function(a,b){return a["name"].localeCompare(b["name"])});
				break;
		}

		if(!up){
			res.reverse();
		}
		
		res.forEach(function(element){
			var list = $('#products-list');

			var div = document.createElement('div');
			var ref = document.createElement('a');
			var desc = document.createElement('h2');
			var par = document.createElement('p');
			var img = document.createElement('img');
			var prix = document.createElement("small");

			div.className="product";
			ref.href="./product.html?id="+element["id"];
			ref.title="En savoir plus";
			desc.textContent=element["name"]
			img.src="../assets/img/"+element["image"];
			par.className = "price";
			prix.textContent = "Prix";
			par.append(prix);
			let price = element["price"].toString().replace(".", ",") ;
			par.append(" "+price+" "+"$");
			ref.append(desc);
			ref.append(img);
			ref.append(par);
			div.append(ref);
			list.append(div);
		})

		//Maj du nombre de produits affichés
		$('#products-count')[0].textContent=$('#products-list')[0].childElementCount+' produits';
		console.log($('#products-list'));


	});
}

function loadJSON(){
	//clear the list of products
	cleanProducts();

	var file = "../../data/products.json"

	//Setting listener to ensure the last clicked button has the "selected" class
	var categoriesButton = document.getElementById('product-categories').getElementsByTagName("button");
	var criteriaButton = document.getElementById('product-criteria').getElementsByTagName("button");

	var i;
	for(i=0;i<categoriesButton.length;i++){
		catButton=categoriesButton[i];
		catButton.addEventListener("click", function(){
			document.getElementById("product-categories").getElementsByClassName("selected")[0].className="";
			this.className="selected";refreshPoducts(file)},true);
	}

	for(i=0;i<criteriaButton.length;i++){
		critButton=criteriaButton[i];
		critButton.addEventListener("click", function(){
			document.getElementById("product-criteria").getElementsByClassName("selected")[0].className="";
			this.className="selected";refreshPoducts(file)},true);
	}
	refreshPoducts(file);
}

$(document).ready(loadJSON);
