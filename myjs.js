var PlayerTurn = false; //false = player1's turn, true = player2's turn
var signs = ['', '', '', '', '', '', '', '', ''];
var counter = 0; //count the number of sign(if nine, mathc is par)
var score = [0, 0] //contains the score 
var lastsign;

//ligh the tag <p> of player who has to put the sign
function lightPlayer() {
  if(PlayerTurn) {
    document.getElementById("title2").style.backgroundColor = "#00FF00";
	document.getElementById("title1").style.backgroundColor = "#9C0000";
  }
  else {
	document.getElementById("title1").style.backgroundColor = "red";
    document.getElementById("title2").style.backgroundColor = "green";
  }
}

//Invert the Player turn
function invertPlayerTurn() {
  if (PlayerTurn) PlayerTurn = false;
  else PlayerTurn = true;
  lightPlayer();
}

//Delete the last insertion
function undo() {
  if(lastsign !== null) {
    document.getElementById(lastsign).value = "";
    document.getElementById(lastsign).disabled = false;
    counter--;
    signs[lastsign] = "";
    invertPlayerTurn();
  }
  lastsign = null;
}

//Check if the match is equal
function checkPar() {
  if(counter === 9) {
    return true;
  }
  return false;
}

//Say the winner through an alert
function sayWinner(winner) {
  document.getElementById("matchend").style.display = "block";
  if(winner) {
    if (PlayerTurn) {
      document.getElementById("winner").style.color = "red";
      document.getElementById("winner").innerHTML = "The winner is: Player 1";
    }
    else {
    document.getElementById("winner").style.color = "green";
    document.getElementById("winner").innerHTML = "The winner is: Player 2";
    }
  }
  else {
    document.getElementById("winner").innerHTML = "There is no winner";
  }
}

//Delete the signs stored into the array signs[]
function deleteSigns() {
  for(var i = 0; i < 9; i++) {
    signs[i] = "";
  }
}

//increase the score 
function updateScore() {
  if (PlayerTurn) {
    score[0]++;
    setScore("player1", 0);
  }
  else {
    score[1]++;
    setScore("player2", 1);
  }
}

//Block the button after his pression
function blockButton(idbutton) {
  document.getElementById(idbutton).disabled = true;
}

//Block All the buttons
function blockAll() {
  var i;
  for (i = 0; i < 9; i++) {
	if(document.getElementById(i).disabled === false) {
	  document.getElementById(i).disabled = true;
    }
  }
}

//Unlock all the buttons
function unlockButtons() {
  var i;
  for (i = 0; i < 9; i++) {
    document.getElementById(i).disabled = false;
  }
}

//Check if a player has won
function checkStatus() {
  if (
    ((signs[0] != "") && (signs[0] === signs[1]) && (signs[1] === signs[2])) ||
    ((signs[0] != "") && (signs[0] === signs[4]) && (signs[4] === signs[8])) ||
    ((signs[0] != "") && (signs[0] === signs[3]) && (signs[3] === signs[6])) ||
    ((signs[1] != "") && (signs[1] === signs[4]) && (signs[4] === signs[7])) ||
    ((signs[2] != "") && (signs[2] === signs[5]) && (signs[5] === signs[8])) ||
    ((signs[2] != "") && (signs[2] === signs[4]) && (signs[4] === signs[6])) ||
    ((signs[3] != "") && (signs[3] === signs[4]) && (signs[4] === signs[5])) ||
    ((signs[6] != "") && (signs[6] === signs[7]) && (signs[7] === signs[8]))
  )
  {
    sayWinner(true);
    updateScore();
    lastsign = null;
    blockAll();
  }
  else if(checkPar()) {
    sayWinner(false);
    lastsign = null;
    blockAll();
  }
}

//Insert the sign into the button 
function insertSign(index) {
  counter++;
  if (PlayerTurn) {
    invertPlayerTurn();
    signs[index] = "O";
    document.getElementById(index).value = signs[index];
  }
  else {
    invertPlayerTurn();
    signs[index] = "X";
    document.getElementById(index).value = signs[index];
  }
  lastsign = index;
  blockButton(index);
  checkStatus();
}

//reset the buttons' values
function resetFields() {
  var supp;
  for(var i = 0; i < 9; i++) {
    supp = i;
    document.getElementById(supp).value = "";
  }
}

//start a new match 
function startMatch() {
  document.getElementById("matchend").style.display = "none";
  counter = 0;
  resetFields();
  deleteSigns();
  unlockButtons();
  lastsign = null;
}

//setScore to ""
function setScore(player, index) {
  document.getElementById(player).innerHTML = score[index] + "";
}

//delete score and start a new match 
function resetAll() {
  score[0] = 0;
  setScore("player1", 0);
  score[1] = 0;
  setScore("player2", 1);
  startMatch();
}

lightPlayer();
startMatch();
setScore("player1", 0);
setScore("player2", 1);