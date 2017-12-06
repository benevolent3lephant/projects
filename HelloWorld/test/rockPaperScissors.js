const getUserChoice = userInput => {
  userInput = userInput.toLowerCase();
  if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb') {
    return userInput
  } else {
    console.log('Error. Input string not recognised.')
  }
};

const getComputerChoice = () => {
  let randomNumber = Math.floor(Math.random()*3)
  switch (randomNumber) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
                      }
};

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === 'bomb') {
    if (computerChoice === 'rock' || computerChoice === 'paper' || computerChoice === 'scissors');
    return 'You win!';
  }

  if (userChoice === computerChoice) {
    return "It's a draw!";
  }



  if (userChoice === 'rock') {
    if (computerChoice === 'scissors') {
      return 'You win!';
    } else {
      return 'Computer wins!';
    }
  }

  if (userChoice === 'paper') {
    if (computerChoice === 'rock') {
      return 'You win!';
    } else {
      return 'Computer wins!';
    }
  }

   if (userChoice === 'scissors') {
    if (computerChoice === 'paper') {
      return 'You win!';
    } else {
      return 'Computer wins!';
    }
  }
}

const playGame = () => {
  const userChoice =
getUserChoice('paper');
  const computerChoice =
getComputerChoice();
  console.log(`You threw ${userChoice}`);
  console.log(`Computer threw ${computerChoice}`);
  console.log(determineWinner())
}

playGame()
