 let playerOneMoveOneType
 let playerOneMoveOneValue
 let playerOneMoveTwoType
 let playerOneMoveTwoValue
 let playerOneMoveThreeType
 let playerOneMoveThreeValue

 let playerTwoMoveOneType
 let playerTwoMoveOneValue
 let playerTwoMoveTwoType
 let playerTwoMoveTwoValue
 let playerTwoMoveThreeType
 let playerTwoMoveThreeValue

isMove = (moveType) => {
  if (moveType === 'rock') { return 'rock' }
  else if (moveType === 'paper') { return 'paper'}
  else if (moveType === 'scissors') {return 'scissors'}
}

isPlayer = (playerName) => {
  if (playerName === 'Player One') { return 'Player One'}
  if (playerName === 'Player Two') { return 'Player Two'}
}

isMoveValue = (moveValue) => {
  if (moveValue > 1 && moveValue < 99) {return moveValue}
}

setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
  if (!moveOneType || !moveTwoType || !moveThreeType || !moveOneValue || !moveTwoValue || !moveThreeValue || !player) {
    return;
  } if (!isMove(moveOneType) || !isMove(moveTwoType) || !isMove(moveThreeType)) {
    return;
  } if (!isPlayer(player)) {
    return;
  } if (!isMoveValue(moveOneValue) || !isMoveValue(moveTwoValue) || !isMoveValue(moveThreeValue)) {
    return;
  } if (moveOneValue + moveTwoValue + moveThreeValue > 99) {
    return;
  } else if (player === 'Player One') {
    playerOneMoveOneType = moveOneType;
    playerOneMoveOneValue = moveOneValue;
    playerOneMoveTwoType = moveTwoType;
    playerOneMoveTwoValue = moveTwoValue;
    playerOneMoveThreeType = moveThreeType;
    playerOneMoveThreeValue = moveThreeValue;
  } else if (player === 'Player Two') {
    playerTwoMoveOneType = moveOneType;
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoType = moveTwoType;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeType = moveThreeType;
    playerTwoMoveThreeValue = moveThreeValue;
  }
}

getComputerMoves = () => {
  let randomNumber = Math.floor(Math.random()*3)
  switch (randomNumber) {
    case 0: return'rock'
    case 1: return 'paper'
    case 2: return 'scissors'
      break;
  }
}

const max = 99
function randomBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

  setComputerMoves = () => {
    var r1 = randomBetween(1, max-2);
    var r2 = randomBetween(1, max-1-r1);
    var r3 = max - r1 - r2;

  playerTwoMoveOneType = getComputerMoves();
  playerTwoMoveOneValue = r1;
  playerTwoMoveTwoType = getComputerMoves();
  playerTwoMoveTwoValue = r2;
  playerTwoMoveThreeType = getComputerMoves();
  playerTwoMoveThreeValue = r3;
}



getRoundWinner = (round) => {

  if (round === 1) {
    if (!playerOneMoveOneType || !playerOneMoveOneValue || !playerTwoMoveOneType || !playerTwoMoveOneValue) {
       return null;
    } else if (playerOneMoveOneType === 'rock' && playerTwoMoveOneType === 'paper') {
      return 'Player Two';
    } else if (playerOneMoveOneType === 'rock' && playerTwoMoveOneType === 'scissors') {
      return 'Player One';
    } else if (playerOneMoveOneType === 'paper' && playerTwoMoveOneType === 'scissors') {
      return 'Player Two';
    } else if (playerOneMoveOneType === 'paper' && playerTwoMoveOneType === 'rock') {
      return 'Player One';
    } else if (playerOneMoveOneType === 'scissors' && playerTwoMoveOneType === 'rock') {
      return 'Player Two';
    } else if (playerOneMoveOneType === 'scissors' && playerTwoMoveOneType === 'paper') {
      return 'Player One';
    } else if (playerOneMoveOneType === playerTwoMoveOneType) {
      if (playerOneMoveOneValue > playerTwoMoveOneValue) {
        return 'Player One';
      } else if (playerOneMoveOneValue < playerTwoMoveOneValue) {
        return 'Player Two';
      } else if (playerOneMoveOneValue === playerTwoMoveOneValue) {
        return 'Tie';
      }
    }
  }

  else if (round === 2) {
    if (!playerOneMoveTwoType || !playerOneMoveTwoValue || !playerTwoMoveTwoType || !playerTwoMoveTwoValue) {
       return null;
    } else if (playerOneMoveTwoType === 'rock' && playerTwoMoveTwoType === 'paper') {
      return 'Player Two';
    } else if (playerOneMoveTwoType === 'rock' && playerTwoMoveTwoType === 'scissors') {
      return 'Player One';
    } else if (playerOneMoveTwoType === 'paper' && playerTwoMoveTwoType === 'scissors') {
      return 'Player Two';
    } else if (playerOneMoveTwoType === 'paper' && playerTwoMoveTwoType === 'rock') {
      return 'Player One';
    } else if (playerOneMoveTwoType === 'scissors' && playerTwoMoveTwoType === 'rock') {
      return 'Player Two';
    } else if (playerOneMoveTwoType === 'scissors' && playerTwoMoveTwoType === 'paper') {
      return 'Player One';
    } else if (playerOneMoveTwoType === playerTwoMoveTwoType) {
      if (playerOneMoveTwoValue > playerTwoMoveTwoValue) {
        return 'Player One';
      } else if (playerOneMoveTwoValue < playerTwoMoveTwoValue) {
        return 'Player Two';
      } else if (playerOneMoveTwoValue === playerTwoMoveTwoValue) {
        return 'Tie';
      }
    }
  }

  else if (round === 3) {
    if (!playerOneMoveThreeType || !playerOneMoveThreeValue || !playerTwoMoveThreeType || !playerTwoMoveThreeValue) {
       return null;
    } else if (playerOneMoveThreeType === 'rock' && playerTwoMoveThreeType === 'paper') {
      return 'Player Two';
    } else if (playerOneMoveThreeType === 'rock' && playerTwoMoveThreeType === 'scissors') {
      return 'Player One';
    } else if (playerOneMoveThreeType === 'paper' && playerTwoMoveThreeType === 'scissors') {
      return 'Player Two';
    } else if (playerOneMoveThreeType === 'paper' && playerTwoMoveThreeType === 'rock') {
      return 'Player One';
    } else if (playerOneMoveThreeType === 'scissors' && playerTwoMoveThreeType === 'rock') {
      return 'Player Two';
    } else if (playerOneMoveThreeType === 'scissors' && playerTwoMoveThreeType === 'paper') {
      return 'Player One';
    } else if (playerOneMoveThreeType === playerTwoMoveThreeType) {
      if (playerOneMoveThreeValue > playerTwoMoveThreeValue) {
        return 'Player One';
      } else if (playerOneMoveThreeValue < playerTwoMoveThreeValue) {
        return 'Player Two';
      } else if (playerOneMoveThreeValue === playerTwoMoveThreeValue) {
        return 'Tie';
      }
    }
  }
  else { return null }
}

//var roundOneWinner = getRoundWinner(1);
//var roundTwoWinner = getRoundWinner(2);
//var roundThreeWinner = getRoundWinner(3);

getGameWinner = () => {

  let results = [getRoundWinner(1), getRoundWinner(2), getRoundWinner(3)];
  let playerOneWins = 0;
  let playerTwoWins = 0;
  let ties = 0;
  for(var i=0;i<results.length;i++){
    if(results[i] == "Player One")
      playerOneWins++;
    if(results[i] == "Player Two")
      playerTwoWins++;
    if(results[i] == "Tie")
      ties++;
    }
        if(ties + playerOneWins + playerTwoWins < 3) {
          return null
      } else if(playerOneWins > playerTwoWins){
        return "Player One"
      } else if(playerOneWins < playerTwoWins){
        return "Player Two"
      } else if(playerOneWins === playerTwoWins){
        return "Tie"
      }
}
