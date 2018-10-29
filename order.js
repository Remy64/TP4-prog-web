function sendForm(){
	//On vide le panier
	localStorage.setItem('panier',null);
	var commNum=localStorage.getItem('orderNumber');
	if(commNum==null){
		commNum=0;
		localStorage.setItem('orderNumber',commNum);
	}
	
	localStorage.setItem("firstName",$('#first-name')[0].value);
	localStorage.setItem("lastName",$('#last-name')[0].value);
}
 
function validateForm(){
	jQuery.validator.addMethod('validateExpiry',function(value,element){
		return this.optional(element) || /(0[1-9]|1[0-2])(\/[0-9][0-9])$/.test(value);//Test si la date entrée est du format mm/aa
	},'La date d\'expiration de votre carte de crédit est invalide.');// avec mm entre 01 et 12 et aa entre 00 et 99
	var valid = $('#order-form').validate({
		rules: {
			firstName:{
				required:true,
				minlength:2
			},
			lastName:{
				required:true,
				minlength:2
			},
			email:{
				required:true,
				email:true
			},
			phone:{
				required:true,
				phoneUS:true
			},
			creditCard:{
				required:true,
				creditcard:true
			},
			creditCardExpiry:{
				required:true,
				validateExpiry:true
			}

		}



		
	});
	$('#order-form').submit(sendForm);
	
}

$(document).ready(validateForm);