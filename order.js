function validateForm(){
	jQuery.validator.addMethod('validateExpiry',function(value,element){
		return this.optional(element) || /(0[0-9]|1[0-2])\/[0-9][0-9]/.test(value);//Test si la date entrée est du format mm/aa
	},'La date d\'expiration de votre carte est invalide');// avec mm entre 01 et 12 et aa entre 00 et 99
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
	console.log(valid.form())
}

$(document).ready(validateForm);