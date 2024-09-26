// jQuery naming each box on the board.
let box0 = $('#box0');
let box1 = $('#box1');
let box2 = $('#box2');
let box3 = $('#box3');
let box4 = $('#box4');
let box5 = $('#box5');
let box6 = $('#box6');
let box7 = $('#box7');
let box8 = $('#box8');

// creating two players.
let player1 = "X";  // Player 1 uses "X"
let player2 = "O";  // Player 2 uses "O"
let turn = 0;       // tracking of the number of turns played.
let winner = false; // check if there's a winner.

// Initially hide alerts for the start, winner, and draw scenarios.
$('#alertStart').hide();  // Hide the "Game Start" alert
$('#alertWinner').hide(); // Hide the "Winner" alert
$('#alertDraw').hide();   // Hide the "Draw" alert

// Variable to store the current player’s symbol (either "X" or "O").
let currentPlayer = '';

// Winning conditions represent the indices of winning combinations on the board.
const winningConditions = [
    [box0, box1, box2], 
    [box3, box4, box5],  
    [box6, box7, box8], 
    [box0, box3, box6],  
    [box1, box4, box7],     
    [box2, box5, box8],
    [box0, box4, box8],  
    [box2, box4, box6]   
];

// ends the game, doesn't allow any further clicks
const endGame = () => {
    console.log('GAME OVER');
    $(".box").css("pointer-events", "none"); // Disable clicks on all boxes.
    $("#p1").removeClass("bg-light border border--info"); 
    $("#p1").removeClass("bg-light border border--info"); 
};

// Function to check if a player has won by comparing the three boxes.
const findWinner = (currentPlayer, a, b, c) => {
    if (a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer) {
        winner = true; 
        console.log(`The winner is ${currentPlayer}!`);

        // highlights the winning boxes
        a.removeClass('text-info bg-dark');
        b.removeClass('text-info bg-dark');
        c.removeClass('text-info bg-dark');

        a.addClass('text-dark bg-info');
        b.addClass('text-dark bg-info');
        c.addClass('text-dark bg-info');

        // Display a winner alert with the winning player's name.
        $('#alertWinner').text(`${currentPlayer === 'X' ? 'Player 1' : 'Player 2'} WINS!`);
        $('#alertWinner').show(); 

        endGame();  // Ends the game.
    }
};

// Function to check if the game has ended in a draw.
const checkDraw = () => {
    if (turn === 9 && !winner) {  // If all 9 turns are played and no winner is found.
        $('#alertDraw').show();   // Show the "Draw" alert.
        endGame();                // End the game.
    }
};

// Function to check if there's a winner or if the game ends in a draw.
const checkOutcomes = () => {
    // Loop through the winning conditions array and check for a winner.
    winningConditions.forEach(condition => findWinner(currentPlayer, ...condition));
    checkDraw();  // Check for a draw after checking for winners.
};

// Function to start a new game.
const startGame = () => {
    console.log("Start Game!");

    // Reset the game.
    turn = 0;       // Reset turn count.
    currentPlayer = player1; // Set the starting player to player 1 (X).
    winner = false; 

    // Show the "Game Start" alert and reset others.
    $('#alertStart').show();
    $('#alertDraw').hide(); // Hide the draw alert.

    // Add click event listeners to all boxes.
    $('.box').off('click').on('click', function() {
        if (winner || $(this).text() !== '') return;

        // Mark the box with X or O.
        $(this).text(currentPlayer);
        turn++;  // increase the turn count.

        checkOutcomes();  // Check for a winner or draw

        // Switch to the next player
        currentPlayer = currentPlayer === player1 ? player2 : player1;

        // Update the turn alert
        $('#alertStart').text(`Player ${currentPlayer === 'X' ? 1 : 2} Turn!`);
    });
};

// Event listener for the "Start Game" button to begin a new game.
document.getElementById('startBtn').addEventListener('click', startGame);

// Event listener for the "Reset Game" button to reload the page and reset the game.
document.getElementById('resetBtn').addEventListener('click', () => document.location.reload(true));

