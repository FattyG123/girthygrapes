function Game() { //constructs the Game
    this.rows = 6; //gives the game 6 rows
    this.columns = 7; //gives the game 7 columns
    this.status = 0;// sets the status of the game to 0 - active
    this.depth = 4; //gives my ai a depth of 4
    this.score = 100000, // the score is set to 100000 columns and rows 
     this.round = 0; //the round is set to 0
    that = this; //this makes this. available for functions
    that.newgame() //this will create a board for my game 
  }
  
  Game.prototype.newgame = function() {  //this function will start a new game
    var gameGrid = new Array(that.rows); //an array is created with a length equal to the same length as I have rows
    for (var i = 0; i < gameGrid.length; i++) { //this for loop will iterate over each element and create an array for each new row 
      gameGrid[i] = new Array(that.columns); //am array is created with the columns and rows 
  
      for (var j = 0; j < gameGrid[i].length; j++) {
        gameGrid[i][j] = null; //this will make sure every cell in my grid has a value of null
      }
    }
    this.gamegrid = new gamegrid(this, gameGrid, 0); //this creates a gamegrid object using the array from the above code 
    var gameGrid = ""; //an empty string is created
    for (var i = 0; i < that.rows; i++) {
      gameGrid += "<tr>"; //the rows of the grid are added to the string
      for (var j = 0; j < that.columns; j++) {
        gameGrid += "<td class='empty'></td>"; //all of the cells are given the class of empty 
      }
      gameGrid += "</tr>";
    }
  
    document.getElementById('gameGrid').innerHTML = gameGrid; 
  
    var td = document.getElementById('gameGrid').getElementsByTagName("td"); //this gets all the cell info from the game grid
  
    for (var i = 0; i < td.length; i++) {
      if (td[i].addEventListener) {
        td[i].addEventListener('click', that.act, false); //adds an event listener for a click on the cell
      }
    }
  }
  
  Game.prototype.act = function(e) {
      var click = e.target; //the target of the click is assigned to click
      if (that.round == 0) that.placemove(click.cellIndex); //the move is placed on the clicked cell for the player
      if (that.round == 1) setTimeout(function() { that.generateAIDecision(); }, 1000); //if it is the ai's turn the ai's decision will be generated
  }
  
  Game.prototype.placemove = function(column) {
    if (that.gamegrid.score() != that.score && that.gamegrid.score() != -that.score && !that.gamegrid.boardisFull()) { //this will make sure that the gamegrid score is not the correct score or the minus score as this means a player has won. It will also check if the board is full or not. 
      for (var y = that.rows - 1; y >= 0; y--) {
        if (document.getElementById('gameGrid').rows[y].cells[column].className == 'empty') { //this will find the first cell in the column that has the class empty
          if (that.round == 1) { //if the round is 1 a red counter will be placed
            document.getElementById('gameGrid').rows[y].cells[column].className = 'redgrape';
          } else { //if not a green counter will be placed
            document.getElementById('gameGrid').rows[y].cells[column].className = 'greengrape';
          }
          break; //breaks the for loop
        }
      }
  
      if (!that.gamegrid.placemove(column)) { //if the placemove for gamegrid returns false then the column is full so an alert will be shown
        return alert("Column is full!");
      }
  
      that.round = that.nextturn(that.round); //this will let the next player take their turn
      that.checkforwin(); //a win is checked for every time a counter is placed
    }
  }
  
  Game.prototype.nextturn = function(round) {
    if (round == 0) { //checks if the round is 0
      return 1; //if it is then it will return 1 
    } else {
      return 0; //if not the function will return 0 
    }
  }
  
  Game.prototype.generateAIDecision = function() {
    if (that.gamegrid.score() != that.score && that.gamegrid.score() != -that.score && !that.gamegrid.boardisFull()) { //will make sure the game is active and the board is not full 
      var ai_move = that.maximize(that.gamegrid, that.depth); //calls the minimax function
      that.placemove(ai_move[0]); //places the ai move 
    }
  }
  
  Game.prototype.maximize = function(gamegrid, depth, alpha, beta) {
      var score = gamegrid.score(); //score of the gamegrid
      if (gamegrid.gameEnd(depth, score)) return [null, score]; //if the game has ended within the depth amount of moves then the score will be returned 
      var max = [null, -99999]; //creates a max array to find the best move so far 
      for (var column = 0; column < that.columns; column++) { //loops over every column in the board
          var new_gamegrid = gamegrid.copy();  //a copy of the game grid is created and every column is checked
          if (new_gamegrid.placemove(column)) {
              var next_move = that.minimize(new_gamegrid, depth - 1, alpha, beta); //this will find the minimum score move that the other player can make for each column
              if (max[0] == null || next_move[1] > max[1]) { //if the next moves score is greater than the current max score then the column and the score is put into the max array 
                  max[0] = column; 
                  max[1] = next_move[1];
                  alpha = next_move[1];  //alpha equals the best move the AI can play
              }
              if (alpha >= beta) return max;  //checks if alpha is greater than or equals to beta 
          }
      }
  
      return max; //best column to play in 
  }
  
  Game.prototype.minimize = function(gamegrid, depth, alpha, beta) {
    var score = gamegrid.score();
    if (gamegrid.gameEnd(depth, score)) return [null, score]; //if the game has ended within the depth amount of moves then the score will be returned 
    var min = [null, 99999]; //creates a min array to find the best move for the other player 
    for (var column = 0; column < that.columns; column++) { //a copy of the game grid is created and every column is checked
      var new_gamegrid = gamegrid.copy();
      if (new_gamegrid.placemove(column)) {
        var next_move = that.maximize(new_gamegrid, depth - 1, alpha, beta);
        if (min[0] == null || next_move[1] < min[1]) { //if the next moves score is less than the min score then the column and the score is put into the min array
          min[0] = column;
          min[1] = next_move[1];
          beta = next_move[1]; //beta represents the best move the player can play 
        }
        if (alpha >= beta) return min; //checks if alpha is greater than or equals to beta
      }
    }
    return min; //best column for the player 
  }
  
  function gamegrid(game, gamestate, player) {
    this.game = game //the game itself 
    this.gamestate = gamestate; //the status of the game
    this.player = player; //whose turn it is 
  }
  
  gamegrid.prototype.score = function() {
      var points = 0;  //sets all variables to 0 so that the relevant numbers can replace this 0 
      var vertical_score = 0;
      var horizontal_score = 0;
      var diagonal_score1 = 0;
      var diagonal_score2 = 0;
      
      for (var row = 0; row < this.game.rows - 3; row++) {
          for (var column = 0; column < this.game.columns; column++) { //scores every cell using scoreCell vertically
              var score = this.scoreCell(row, column, 1, 0); 
              if (score == this.game.score) return this.game.score;
              if (score == -this.game.score) return -this.game.score;
              vertical_score += score;
          }            
      }
      for (var row = 0; row < this.game.rows; row++) { //scores every cell using scoreCell horizontally
          for (var column = 0; column < this.game.columns - 3; column++) { 
              var score = this.scoreCell(row, column, 0, 1);   
              if (score == this.game.score) return this.game.score;
              if (score == -this.game.score) return -this.game.score;
              horizontal_score += score;
          } 
      }
      for (var row = 0; row < this.game.rows - 3; row++) { //scores every cell using scoreCell diagonally
          for (var column = 0; column < this.game.columns - 3; column++) {
              var score = this.scoreCell(row, column, 1, 1);
              if (score == this.game.score) return this.game.score;
              if (score == -this.game.score) return -this.game.score;
              diagonal_score1 += score;
          }            
      }
      for (var row = 3; row < this.game.rows; row++) {
          for (var column = 0; column <= this.game.columns - 4; column++) { //scores every cell using scoreCell diagonally
              var score = this.scoreCell(row, column, -1, +1);
              if (score == this.game.score) return this.game.score;
              if (score == -this.game.score) return -this.game.score;
              diagonal_score2 += score;
          }
     //if any wins are found during this then the -this.game.score or this.game.score will be returned causing win conditions to be called  
      }
  
      points = horizontal_score + vertical_score + diagonal_score1 + diagonal_score2;
      return points; //adds all scores together to return a total board score 
  }
  
  gamegrid.prototype.scoreCell = function(row, column, delta_y, delta_x) {
      var green_points = 0; //green points
      var red_points = 0; //red points 
      for (var i = 0; i < 4; i++) {
          if (this.gamestate[row][column] == 0) { //if the gamestate is 0 meaning it is greens turn then green points counter will increase when green cells are found in the direction of search
              green_points++; 
          } else if (this.gamestate[row][column] == 1) { //otherwise the red points counter will increase
              red_points++; 
          }
          row += delta_y; //direction of row search
          column += delta_x; //direction of column search
      }
      if (green_points == 4) {
          return -this.game.score; //if green has 4 in a row then this is called
      } else if (red_points == 4) {
          return this.game.score; //if red has 4 in a row then this is called 
      } else {
          return red_points; //if neither players have won the number of red points is returned
      }
  }
  
    Game.prototype.checkforwin = function() {
    if (that.gamegrid.score() == -that.score) { //if score is a player win
      that.status = 1; //green win status 
      document.getElementById('status').innerHTML = ("Green Grapes won!");
    }
    if (that.gamegrid.score() == that.score) { //if score is an ai win
      that.status = 2; //red win status
      document.getElementById('status').innerHTML = ("Red Grapes Won!");
    }
    if (that.gamegrid.boardisFull()) { //if board is full 
      that.status = 3; //tie status
      document.getElementById('status').innerHTML = ("Game is a Tie!");
    }
  }
  
  
  gamegrid.prototype.gameEnd = function(depth, score) {
      if (depth == 0 || score == this.game.score || score == -this.game.score || this.boardisFull()) { //if any game has ended conditions have met then this function will return true
          return true;
      }
      return false;
  }
  
  gamegrid.prototype.placemove = function(column) {
      if (this.gamestate[0][column] == null && column >= 0 && column < this.game.columns) { //if the top row of the column is empty then
          for (var y = this.game.rows - 1; y >= 0; y--) { //search all rows in a column until an empty cell is found. If a player's coutner is found then a move is placed and the for loop breaks 
              if (this.gamestate[y][column] == null) {
                  this.gamestate[y][column] = this.player; //sets the empty cell to the player's counter
                  break; 
              }
          }
          this.player = this.game.nextturn(this.player);  //finds whose turn it is 
          return true;  
      } else {
          return false; //if the column is full then false will be returned 
      }
  }
  
  gamegrid.prototype.boardisFull = function() {
      for (var i = 0; i < this.game.columns; i++) {
          if (this.gamestate[0][i] == null) {  //checks every top row of the column and if it finds an empty cell it will return false
              return false;
          }
      }
      return true; //if no empty columns in the top row are found then the board is full so it returns false 
  }
  
  gamegrid.prototype.copy = function() {
      var new_gamegrid = new Array(); //an empty array is created called new_gamegrid
      for (var i = 0; i < this.gamestate.length; i++) { //for every row in the gamegrid a copy is made and pushed into the array. 
          new_gamegrid.push(this.gamestate[i].slice());
      }
      return new gamegrid(this.game, new_gamegrid, this.player); //new gamegrid object is created with the same game and player values but with the gamestate replaced with new_gamegrid
  }
  const restartbutton = document.querySelector('.restartbutton');
  restartbutton.addEventListener('click', () => { //when button is clicked
    window.location.reload() //refreshes the page
  });
  
  function Start() { //starts my game
    new Game(); //creates a new game object and calls my constructor
  }
  
    Start()