

//Mascara Telefone de acordo com o padrão solicitado
$("#telefone").mask("00-00000000");



$( "#submit" ).on( "click", function() {
	 
	 //declaração de Variveis 	
  	let nome = $("#nome").val();
  	let telefone = $("#telefone").val();
  	let possuiRedeSocial = $("#possuiRedeSocial").val();
  	let conhecimento = $("#conhecimento").val();
  	let resultado = ValidaRedeSocial();
  	const url= "http://localhost:8080";

  	//Validações
	if(ValidaNome(nome) && ValidaTelefone(telefone) && resultado.validado){
		let data= {
               Nome : nome,
               Telefone : telefone,
               Conhecimento: conhecimento,
               RedesSociais: resultado.checked
          };

		EnviarDados(data,url)
 	 }

});

function EnviarDados(data, url){
	$("#submit").attr("disabled", true);
	
	 $.ajax({
          url : url,
          type : 'POST',
          data : data,
          beforeSend : function(){
               $("#resultado").html("ENVIANDO...");
          }
     })
     .done(function(msg){
          $("#resultado").html("Dados Enviados com sucesso");
     })
     .fail(function(){
          $("#resultado").html("Falha ao enviar os dados para a rota " +url );
     }); 
}

//Validação das Redes Sociais
function ValidaRedeSocial(){
	let validado = true;
	let checked = [];

	if($( "input:checked" ).val() == 'true')
		{

        	$(".checkboxes:checked").each(function(){ 
          		checked.push(this.value);
          	});
        	
	       	if(!checked.length){
	       		alert("Deve selecionar pelo menos uma rede social")
	       		validado=false;	
	       	}
	  	}	

	  	return data={
	  		validado: validado,
	  		checked: checked	
	  	};

}

//Validação Telefone
function ValidaTelefone(telefone){
	let  validado = true;
	
	if(telefone.length!=11){
		alert("O telefone deve conter 10 digitos");
		validado= false;
	}	



	return	validado;

}

//validação do Nome
function ValidaNome( nome){
	let  validado = true;

	resultado = nome.split(/\b/);

	if(resultado[0]==""){
		alert("O campo nome deve ser prechido com um nome e sobrenome")
		validado=false;
	}
	else if((resultado[0]!="" && resultado.length==1)  || resultado[2]==null){
		alert("O campo nome deve conter um sobrenome");
		validado=false;
	}
 
	return validado;
}

//Alterna  a visualização das redes sociais
$('input[type=radio][name=possuiRedeSocial]').on('change', function() {
	// console.log("acionou")
  switch ($(this).val()) {
    case 'true':
      $("#esconde").show();
      break;
   	default:
      $("#esconde").hide();
      break;
  }
});

