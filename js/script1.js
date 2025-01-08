console.log("coucou script.js est chargé!!!");
var macouleur_jolie="#34CC99";

// A $( document ).ready() block.
$( document ).ready(function() {
    
    
    
    console.log( "ready!" );
    


   // changeFondReceptacle();


    //testselectortag();
//met_texte_en_rouge();


chargement_info_depuis_php();


});







function chargement_info_depuis_php() {

 	

    $.ajax({
        method: "POST",
        url: "test.php",
        data: { 
            login_utilisateur: "toto", 
            pwd_utilisateur: "azerty" 
        }
      })
        .done(function( msg ) {
          console.log( "Data pouet: " + msg );
        });

    
} 

function testselectortag(){
    $("div").css("color", macouleur_jolie);
}

function changeFondReceptacle(){
    $("#receptacle").css("background-color","yellow") 
}

function met_texte_en_rouge(){

    $(".important").addClass("rouge");

}