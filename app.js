//on window load start the game
$(document).ready (function(){

   //and we're off!
  game = new Game();

  //set event listeners;
  game.board.$squares = $('.square');
  game.board.$squares.click(function(e){
    game.nextMove(e);
  });

   //decide who goes first
   game.turn = game.players[Math.round(Math.random()) ];

   //display some context 
   $('body').prepend($turn_label = $('<h2 id="turn_label">').text('Whose turn is it anyway?'));

   //wait for first move
   $turn_label.text(game.turn.name + " its your turn!");

});



  Game = function() {
    this.board = this.loadBoard();
    this.turn = undefined;
    this.players = [];
    this.moves = [];

    //lets get a few players
   p1 = this.addPlayer("John","X");
   p2 = this.addPlayer("Ruthless Mercenary","R");


  }

  Game.prototype.nextMove = function(e) {
    var indexClicked;
    console.log(this.turn.name + " just clicked on " + e.target);
    //check whose turn it is
    this.turn.name;

    //grab numerical index of clicked box
    this.board.$squares.each(function(index,element) {
      if (element === e.target) {indexClicked = index;};
    });

    //check whether requested move is open
    isTaken = this.board.$squares.eq(indexClicked).hasClass("taken");
    if (isTaken) {return false;}

    //record move in Game.moves
    this.moves[indexClicked] = this.turn.symbol;
    this.board.$squares.eq(indexClicked).addClass("taken");
    this.board.$squares.eq(indexClicked).text(this.turn.symbol);

    //check for winner
    var wins = this.haveWinner();
    if (wins) {alert();return wins;}

    //toggle this.turn between index 0 and 1 of players array
    this.turn = this.players[this.players[0] === this.turn ? 1 : 0];
    $('h2').text(this.turn.name + " It's your turn!");
  }

  Game.prototype.loadBoard = function() {

      return new Board();
  }

  Game.prototype.clearBoard = function() {
    this.board.$squares.removeClass("taken").text("");
  
  }

  Game.prototype.addPlayer = function(name,symbol) {
     player = new Player(name,symbol);
     this.players.push(player);
    return player;
  }

  Game.prototype.haveWinner = function(){
     var wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
     for (var i=0;i<wins.length-1;i++) {
        if (this.threeInRow(wins[i][0],wins[i][1],wins[i][2])) {return wins[i].join();}
     }
  }

  Game.prototype.threeInRow = function(one, two, three) {
    if (this.moves[one] === this.moves[two] && this.moves[two] === this.moves[three] && this.moves[one] !== undefined ) {
      return true;
    } else {
      return false;
    }
}
  
  Player = function(name,symbol) {
      this.name = name;
      this.symbol = symbol;
    //Is the player X or O?
    //this.team = ...
  }

  Board = function() {
      this.init();

  }

//builds the board with jquery and inserts
//it into body tag of document
Board.prototype.init = function() {
      var $board = $('<div id="board">');

      for (i=0;i<9;i++){
            $board.append('<div id="square'+i+'"" class="square">');
      }
       
      $('body').append($board);

}

//removes the board from dom document
Board.prototype.destroy = function() {
     var $board = $('#board');
     console.log($board);
     $board.remove();
}

//utility functions

