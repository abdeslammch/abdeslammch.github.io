var donnees_utilisateur;
// A $( document ).ready() block.
$( document ).ready(function() {     
    console.log( "from lire data use rready!" );
    chargement_info_user();
});

function chargement_info_user(){ 
    $.ajax({
        method: "POST",
        url: "data_php/utilisateur.json",
    
      })
        .done(function( msg ) {
          console.log( "Data lues: " , msg );
          donnees_utilisateur=msg;


          affiche_donnees_utilisateur();
        });

}


function affiche_donnees_utilisateur() {
    console.log("fct affiche nom.....");
    console.log(donnees_utilisateur);
    var nomUserRecompose=donnees_utilisateur.prenom+" " ;


$(".nomUser").html(" "+nomUserRecompose+" ") ;


}