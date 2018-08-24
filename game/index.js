//jshint node: true, esversion: 6

const newGame = (req, res) => {

    
    let newGame = {
        "size": req.body.size || 5,
        "dim": req.body.dim || 9,
        "max": req.body.max || 0
    };

    let tab = [];

    for(let i = 0; i < newGame.size; i++){
        tab.push(Math.floor(Math.random() * newGame.dim));
    }
    newGame.tab = tab;

    req.session.game = newGame;

    res.send(newGame);
};

const markAnswer = (req, res) => {

    let game = req.session.game.tab;
    let move = req.body.move;

    let black = 0;
    let white = 0;

    let moveMarked = [];
    let gameMarked = [];

    move.forEach((element, index) => {
        if(element === game[index]){
            black++;
            moveMarked[index] = true;
            gameMarked[index] = true;
        }
    });

    move.forEach((element, index) => {
        if(!moveMarked[index]){
            game.forEach((gameElement, gameIndex) => {
                if(!gameMarked[gameIndex] && gameElement === element) {
                    white++;
                    gameMarked[gameIndex] = true;
                }
            });

        }
    });

    score = {
        "black": black,
        "white": white
    };

    res.send(score);
};

module.exports = {
    newGame,
    markAnswer
};