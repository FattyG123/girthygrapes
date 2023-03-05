const allgamecells = document.querySelectorAll('.gamecell:not(.columnselector)');// all gamecells that are not part of the columnselector
const columnselectors = document.querySelectorAll('.gamecell.columnselector');//all columnselector gamecells


const column0 = [allgamecells[35], allgamecells[28], allgamecells[21], allgamecells[14], allgamecells[7], allgamecells[0], columnselectors[0]];
const column1 = [allgamecells[36], allgamecells[29], allgamecells[22], allgamecells[15], allgamecells[8], allgamecells[1], columnselectors[1]];
const column2 = [allgamecells[37], allgamecells[30], allgamecells[23], allgamecells[16], allgamecells[9], allgamecells[2], columnselectors[2]];
const column3 = [allgamecells[38], allgamecells[31], allgamecells[24], allgamecells[17], allgamecells[10], allgamecells[3], columnselectors[3]];
const column4 = [allgamecells[39], allgamecells[32], allgamecells[25], allgamecells[18], allgamecells[11], allgamecells[4], columnselectors[4]];
const column5 = [allgamecells[40], allgamecells[33], allgamecells[26], allgamecells[19], allgamecells[12], allgamecells[5], columnselectors[5]];
const column6 = [allgamecells[41], allgamecells[34], allgamecells[27], allgamecells[20], allgamecells[13], allgamecells[6], columnselectors[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6]; //all the columns as an array

const topRow = [columnselectors[0], columnselectors[1], columnselectors[2], columnselectors[3], columnselectors[4], columnselectors[5], columnselectors[6]];
const row0 = [allgamecells[0], allgamecells[1], allgamecells[2], allgamecells[3], allgamecells[4], allgamecells[5], allgamecells[6]];
const row1 = [allgamecells[7], allgamecells[8], allgamecells[9], allgamecells[10], allgamecells[11], allgamecells[12], allgamecells[13]];
const row2 = [allgamecells[14], allgamecells[15], allgamecells[16], allgamecells[17], allgamecells[18], allgamecells[19], allgamecells[20]];
const row3 = [allgamecells[21], allgamecells[22], allgamecells[23], allgamecells[24], allgamecells[25], allgamecells[26], allgamecells[27]];
const row4 = [allgamecells[28], allgamecells[29], allgamecells[30], allgamecells[31], allgamecells[32], allgamecells[33], allgamecells[34]];
const row5 = [allgamecells[35], allgamecells[36], allgamecells[37], allgamecells[38], allgamecells[39], allgamecells[40], allgamecells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];//rows as an array

let gameactive = true;// lets the game be in it's active state 
let greenturn = true;//makes green turn first

const makemove = (e) => {  // this function will be called when a player clicks on a gamecell 
  if (!gameactive) return; // this will stop the function being called if the game is not active
  const gamecell = e.target; // this makes the gamecell be the target of the click
  const [rowIndex, colIndex] = getgamecellLocation(gamecell); // this gets the location of the gamecell
  const availablecell = getavailablecell(colIndex); //this finds the first available cell in the column
  if (!availablecell) return;// this stops the function if there is no available cell
  availablecell.classList.add(greenturn ? 'green' : 'red'); //this will place the counter onto the board
  checkforwin(availablecell);//this checks if the placed counter caused a player to win
  greenturn = !greenturn; //this changes the turn counter
  clearcolumnselector(colIndex); //this clears the column selector
  if (gameactive) { //if the game is active the column selector will show whichever player's turn it is counter at the top of my board 
    const columnselector = columnselectors[colIndex];
    columnselector.classList.add(greenturn ? 'green' : 'red');
  }
};

const getgamecellLocation = (gamecell) => { //function to get the location of the game cell
  const classList = getClassListArray(gamecell); //gets the array of the class lists that the gamecell has.
  const rowClass = classList.find(className => className.includes('row')); // finds the row the gamecell has been placed
  const colClass = classList.find(className => className.includes('col')); //finds the column the gamecell has been placed
  const rowIndex = rowClass[4]; //get's the 5th element in the array
  const colIndex = colClass[4]; //get's the 5th element in the array 
  const rowNumber = parseInt(rowIndex, 10); //turns the element into an integer
  const colNumber = parseInt(colIndex, 10); //turns the element into an integer
  return [rowNumber, colNumber]; //returns the row and column number for whichever function needs it
};

const getClassListArray = (gamecell) => { //this function will find the class list of my gamecell
  const classList = gamecell.classList;
  return [...classList];
};


const getavailablecell = (colIndex) => {
  const column = columns[colIndex]; //gets the column that the player clicked
  const columnWithoutTop = column.slice(0, 6); // makes the array just the game board
  for (const gamecell of columnWithoutTop) {
    const classList = getClassListArray(gamecell);
    if (!classList.includes('green') && !classList.includes('red')) {
      return gamecell;  //finds the first game cell in the column that does not include the class of red or green meaning there is a counter there
    }
  }

  alert("Column is full!") //if no empty gamecell is found then it will alert the player that the column is full
};


const clearcolumnselector = (colIndex) => { //removes the class of red or green from the column selector
  const columnselector = columnselectors[colIndex];
  columnselector.classList.remove('green');
  columnselector.classList.remove('red');
};

const hoveronboard = (e) => { //this function decides what will happen if the player hovers their mouse on the board
  if (!gameactive) return; //if the game is not active nothing will happen
  const gamecell = e.target; //this gets the target of the mouse
  const [rowIndex, colIndex] = getgamecellLocation(gamecell); // this gets the location 
  const columnselector = columnselectors[colIndex]; //this activates the column selector for the column on the board
  columnselector.classList.add(greenturn ? 'green' : 'red'); //this adds the correct colour to the column selector 
};

const mousenotonboard = (e) => { //this function decides what happens when the mouse is not on the board 
  const gamecell = e.target;
  const [rowIndex, colIndex] = getgamecellLocation(gamecell);
  clearcolumnselector(colIndex);
};

for (const row of rows) {
  for (const gamecell of row) {
    gamecell.addEventListener('mouseover', hoveronboard); //event listener for mouse hovering on the board
    gamecell.addEventListener('mouseout', mousenotonboard); //event listener for mouse not on the board
    gamecell.addEventListener('click', makemove); //event listener for a click on the board 
  }
}

const restartbutton = document.querySelector('.restartbutton'); //turns the html button into a javascript variable

restartbutton.addEventListener('click', () => { //adds an event listener so when the button is clicked it clears all the classess of the board thus making it empty 
  for (const row of rows) {
    for (const gamecell of row) {
      gamecell.classList.remove('red');
      gamecell.classList.remove('green');
      gamecell.classList.remove('win');
      document.getElementById('status').innerHTML = "GAME ACTIVE";
    }
  }
  gameactive = true; //resets variables to the start of the game
  greenturn = true;
});


const checkforwin = (gamecell) => { //check for win function
  const colour = getColourOfgamecell(gamecell); //gets the colour of the current gamecell
  if (!colour) return; //if it has no colour the function ends 
  const [rowIndex, colIndex] = getgamecellLocation(gamecell); //gets the location of the cell 
  let gamecells = [gamecell]; //makes an array called gamecells
  let rowToCheck = rowIndex; //row of the game cell
  let colToCheck = colIndex - 1; //column to the left 
  while (colToCheck >= 0) { //it checks every column until it reaches the far left column and grabs every cell that is the same colour as the original game cell and puts it into the gamecells array
    const gamecellToCheck = rows[rowToCheck][colToCheck];
    if (getColourOfgamecell(gamecellToCheck) === colour) {
      gamecells.push(gamecellToCheck);
      colToCheck--;
    } else {
      break; //breaks the while loop once it's complete
    }
  }
  
  colToCheck = colIndex + 1;  //this sets the column to the column to the right of the original gamecell 
  while (colToCheck <= 6) { //this will check every column to the right until the far right of the board and will put all cells of the same colour into the array
    const gamecellToCheck = rows[rowToCheck][colToCheck];
    if (getColourOfgamecell(gamecellToCheck) === colour) {
      gamecells.push(gamecellToCheck);
      colToCheck++;
    } else {
      break;
    }
  }
  let isWinningCombo = checkWinninggamecells(gamecells); //it will then check the array for any winning game cells
  if (isWinningCombo) return;

   gamecells = [gamecell]; //resets the array
  rowToCheck = rowIndex - 1; //sets the row to the row above 
  colToCheck = colIndex; //sets the column to the column of the gamecell
  while (rowToCheck >= 0) { //checks every row until the top for gamecells that are the same colour as the original 
    const gamecellToCheck = rows[rowToCheck][colToCheck];
    if (getColourOfgamecell(gamecellToCheck) === colour) {
      gamecells.push(gamecellToCheck);
      rowToCheck--;
    } else {
      break; //breaks the while loop once complete 
    }
  }
  rowToCheck = rowIndex + 1; //sets the row to the row below
  while (rowToCheck <= 5) { // checks every row until the bottom of the board for gamecells that are the same colour as the original
    const gamecellToCheck = rows[rowToCheck][colToCheck];
    if (getColourOfgamecell(gamecellToCheck) === colour) {
      gamecells.push(gamecellToCheck);
      rowToCheck++;
    } else {
      break; //breaks the while loop once complete
    }
  }
  isWinningCombo = checkWinninggamecells(gamecells); //calls the function to check the array for a win
  if (isWinningCombo) return;

  gamecells = [gamecell]; //array is reset
  rowToCheck = rowIndex + 1; //row is set to row below
  colToCheck = colIndex - 1; //column is set to column to the left
  while (colToCheck >= 0 && rowToCheck <= 5) { //this will check every cell to the below-left of the cell until it reaches the bottom left corner of the board 
    const gamecellToCheck = rows[rowToCheck][colToCheck];
    if (getColourOfgamecell(gamecellToCheck) === colour) {
      gamecells.push(gamecellToCheck);
      rowToCheck++;
      colToCheck--;
    } else {
      break; //breaks the while loop
    }
  }
  rowToCheck = rowIndex - 1; //row is set to row above
  colToCheck = colIndex + 1; //column is set to the column to the right 
  while (colToCheck <= 6 && rowToCheck >= 0) { //this will check every cell to the above-right of the cell until it reaches the top right corner of the board 
    const gamecellToCheck = rows[rowToCheck][colToCheck];
    if (getColourOfgamecell(gamecellToCheck) === colour) {
      gamecells.push(gamecellToCheck);
      rowToCheck--;
      colToCheck++;
    } else {
      break; //breaks the while loop 
    }
  }
  isWinningCombo = checkWinninggamecells(gamecells); //winning game cells function called
  if (isWinningCombo) return;

  gamecells = [gamecell]; //array is reset 
  rowToCheck = rowIndex - 1; //row is set to row above
  colToCheck = colIndex - 1; //column is set to column to the left
  while (colToCheck >= 0 && rowToCheck >= 0) { //the while loop checks every cell until the top left of the board
    const gamecellToCheck = rows[rowToCheck][colToCheck];
    if (getColourOfgamecell(gamecellToCheck) === colour) {
      gamecells.push(gamecellToCheck);
      rowToCheck--;
      colToCheck--;
    } else { //this breaks the while loop
      break;
    }
  }
  rowToCheck = rowIndex + 1; //row is set to row below
  colToCheck = colIndex + 1; //column is set to column to the right
  while (colToCheck <= 6 && rowToCheck <= 5) { //this while loop checks every cell until the bottom right of the board
    const gamecellToCheck = rows[rowToCheck][colToCheck];
    if (getColourOfgamecell(gamecellToCheck) === colour) {
      gamecells.push(gamecellToCheck);
      rowToCheck++;
      colToCheck++;
    } else { //breaks the while loop 
      break;
    }
  }
  isWinningCombo = checkWinninggamecells(gamecells); //checking for winning combination function is called 
  if (isWinningCombo) return;

  const rowsWithoutTop = rows.slice(0, 6); //gets all rows that are part of the board
  for (const row of rowsWithoutTop) { //this will check every row of the gameboard and for every gamecell will check if it has green or red in it. If it does not then the checkforwin function is ended. If not then a tie is called. 
    for (const gamecell of row) { 
      const classList = getClassListArray(gamecell);
      if (!classList.includes('green') && !classList.includes('red')) { 
        return;
      }
    }
  }

  gameactive = false; //game is ended
  document.getElementById('status').innerHTML =("Game is a tie!") // a tie is alerted to the player
};



const checkWinninggamecells = (gamecells) => { //this function checks if the gamecells array is a winning one    
  if (gamecells.length < 4) return false; //if the gamecells length is less than 4 the function will return false
  gameactive = false; //if the gamecells array length is more than 4 then the game will end
  for (const gamecell of gamecells) {
    gamecell.classList.add('win'); //the gamecells array will have the win class added to it to highlight the win 
  }
  document.getElementById('status').innerHTML = (`${greenturn? 'Green Grapes' : 'Red Grapes'} won!`);  //an alert will say which player has won 
  return true;
};

const getColourOfgamecell = (gamecell) => { //this will get the class of the game cell and if it is green the function will return green and if it is red it will return red. If neither of these are true the function will return null.
  const classList = getClassListArray(gamecell);
  if (classList.includes('green')) return 'green';
  if (classList.includes('red')) return 'red';
  return null;
};