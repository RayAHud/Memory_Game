let symbols = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];

let stars = 3;

let timePassed;

let myTime = 0;

let cardStatus = [];

let cardSymbol = [];

let matched = 0;

let moves = 0;

function shuffle(array) { //returns a reordered array that will result in a random result
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function setBoard(array) { //goes through an array and creates a <li> and an <i> for each object in the array. The DOM will reflect these changes
	shuffle(array);
	let i;
	for (i = 0; i < array.length; i++) {
		$('ul.deck').append($('<li class="card"><i class="fa fa-' + symbols[i] + '"></i></li>'));
	};
}

function restart() { //brings many of the games functions back to their original values for a new game
	$('.stars').empty();//clears the stars in the DOM
	let i;
	for (i = 0; i < 3; i++) {//adds three stars back to the DOM
		$('.stars').append($('<li><i class="fa fa-star"></i></li>'));
	};
  stars = 3;
  myTime = 0;//restarts the clock
	moves = 0;//resets the moves counter
	matched = 0;//resets the matched counter
	$('.moves').html(moves);//updates the moves counter in the DOM
	$('ul.deck').empty();//clears the ul.deck in the DOM
  clearLists(cardStatus, cardSymbol)
  setBoard(symbols);//reshuffles a new deck and populates the DOM
	initEvent();//starts the event listener and therefore, the game
}

function clearLists(array1, array2) { //simple function to clear two arrays
  array1.pop();
  array1.pop();
  array2.pop();
  array2.pop();
}

function addMoves() {//counts user moves and updates the counter in the DOM
	moves = moves + 1;
	$('.moves').html(moves);
}

function gameTime() {//starts the clock and shows it on the webpage
	timePassed = setInterval(function () {
		$('.time').html(myTime + ' ');
		myTime = myTime + 1;
	}, 1000);
}

function checkRating () {//changes the star rating once a number of moves has been reached
	if (moves == 12) {
		$('.fa.fa-star').first().toggleClass('fa-star')
		stars = stars - 1;
	} if (moves == 16) {
		$('.fa.fa-star').first().toggleClass('fa-star')
		stars = stars -1;
	};
}

function youWon() {//calls a confirm box to tell you your win stats and asks if you want to play again
	if (confirm("You won with " + moves + " moves in " + myTime + " seconds " + "with " + stars + " stars!!"  + " Wanna play again?")) {
		restart();
	} else {
		window.close();
	};
}

function initEvent() {//the main function for the game
	$('li.card').click(function() {//sets up an event listener for the cards
  let myClick = $(this);
  myClick.toggleClass('open show');//changes the class of the clicked card to reveal its symbol
  cardSymbol.push(myClick.children().attr("class"));//adds the symbol of the card to the array, cardSymbol
  cardStatus.push(myClick);//adds the clicked object to the array, cardStatus
    if (cardStatus.length > 1) {//checks to see if the two cards match
      $('.deck').css("pointer-events", "none");//this prevents clicking more than two items at a time
      if (cardSymbol[0] == cardSymbol[1]) {//if the two cards match
        $(cardStatus[0].addClass('match'));//changes the class of the first card to match
        $(cardStatus[1].addClass('match'));//changes the class of the second card to match
        setTimeout(function() {//sets a delay so that the player can view the results before the program resets paramaters
          $('.deck').css("pointer-events", "auto");//makes the cards clickable again
          clearLists(cardStatus, cardSymbol);
        }, 500);//delay is 500 milliseconds
				addMoves();
				matched = matched + 1;
				checkRating();

			} else {
        setTimeout(function() {//sets a delay to let the player see the card symbols before they are hidden again
          $(cardStatus[0].removeClass('open show'))//hides the card
          $(cardStatus[1].removeClass('open show'))//hides the card
        }, 500);// delay is 500 milliseconds
        setTimeout(function () {//sets a delay so that the following clearLists function syncs up with the previous Timeout
          $('.deck').css("pointer-events", "auto");//makes the cards clickable again
          clearLists(cardStatus, cardSymbol);
        }, 500);//delay is 500 milliseconds
				addMoves();
				addMoves();
				checkRating();
			}
    }
		if (matched == 8) {//once 8 matches have been made, the win prompt is called after a slight delay so the player can view the completed
			setTimeout(function() {
				youWon();
			}, 500);
		}
	});
}

gameTime();

setBoard(symbols);

$('.restart').click(function() {//adds an event listener to the restart button
	restart();
});

initEvent()
