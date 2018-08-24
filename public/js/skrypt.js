/*jshint jquery: true, devel: true */
$(function () {
    
    var gameInfo = {};

    $( "#newGameForm" ).submit(function(event) {
        
        event.preventDefault();

        gameInfo.size = $("input[name=size]").val();
        gameInfo.dim = $("input[name=dim]").val();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(gameInfo),
            contentType: 'application/json',
            url: 'http://localhost:3000/play',				
            success: function(data) {
                console.log(data);
                newGame();
            }
        });
    
    });


    

    function newGame() {

        $( "#playground" ).empty();

        newMove();

        
    }

    function changeLast(score) {

        console.log(score);
        $(".moveForm.active input").prop("disabled", true);
        $( "#playground form" ).last().removeClass("active");
        $( "#playground form" ).last().addClass("inactive");
        $( "#playground form .score" ).last().append("cz: " + score.black + "  b: " + score.white);

    }

    function endGame() {
        $( "#playground" ).append("<div id='win'>Brawo wygrałeś!<div>");
    }

    function newMove() {

        $( "#playground" ).append( "<form class='moveForm active'></form>" );
        for(var i = 0; i < gameInfo.size; i++) $( ".moveForm.active" ).append( "<input name='gameInput' type='text'>" );
        $( ".moveForm.active" ).append( "<input type='submit' class='checkSubmit' value='Sprawdź!'>" );
        $( ".moveForm.active" ).append( "<div class='score'></div>" );

        $( ".moveForm.active" ).on('submit', function(event) {
        
            event.preventDefault();
    
            var move = [];
    
            $(".moveForm.active input[name='gameInput'").each(function(index){
                move[index] = parseInt($(this).val());
            });
       
            $.ajax({
                type: 'POST',
                data: JSON.stringify({"move": move}),
                contentType: 'application/json',
                url: 'http://localhost:3000/mark',			
                success: function(data) {
                    changeLast(data);
                    if(data.black == gameInfo.size) endGame();
                    else newMove();
                }
            });
        
        });
    }

});
