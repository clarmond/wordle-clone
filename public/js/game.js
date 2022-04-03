let currentRow = 0;
let currentCol = 0;
let winningWord = 'SLOSH';
let gameOver = false;

function getTile(row, col) {
	const tiles = $('.tile');
	const offset = (row * 5) + col;
	const currentTile = tiles[offset];
	return $(currentTile);
}

function updateKey(letter, style) {
	$(`[data-key="${letter.toLowerCase()}"]`).addClass(style);
}

function updateTile(row, col, letter, style) {
	const tile = getTile(row, col);
	tile.text(letter.toUpperCase());
	tile.addClass(style);
}

function getCurrentLetter() {
	const currentTile = getTile(currentRow, currentCol);
	return currentTile.text();
}

function guessLetter(letter) {
	if (gameOver) return;
	if (currentCol === 4 && getCurrentLetter() !== '') {
		return;
	}
	updateTile(currentRow, currentCol, letter, 'guess');
	currentCol++;
	if (currentCol === 5) {
		currentCol = 4;
	}
}

function removeGuess() {
	if (gameOver) return;
	if (currentCol === 4 && getCurrentLetter() !== '') {
		// Don't move
	} else {
		currentCol--;
	}
	if (currentCol < 0) {
		currentCol = 0;
	}
	const currentTile = getTile(currentRow, currentCol);
	currentTile.text('').removeClass('guess');
}

function showAlert(message, displayTime = 1500) {
	const $alert = $('#alert');
	$alert.removeClass('hidden');
	$alert.text(message).show();
	if (displayTime > 0) {
		window.setTimeout(() => {
			$alert.addClass('hidden');
		}, displayTime);
	}
}

function getCurrentLetters() {
	const tiles = $('.tile');
	let word = '';
	for (let col = 0; col < 5; col++) {
		const tile = getTile(currentRow, col);
		word += tile.text();
	}
	return word;
}

function submitGuess() {
	if (gameOver) return;
	const currentGuess = getCurrentLetters();
	if (currentGuess.length < 5) {
		showAlert('Not enough letters');
		return;
	}
	if (wordList.indexOf(currentGuess) < 0) {
		showAlert('Not in word list');
		return;
	}
	const letters = currentGuess.split('');
	const correctLetters = winningWord.split('');
	let gotRight = 0;
	for (let col = 0; col < letters.length; col++) {
		const letter = letters[col];
		const correctLetter = correctLetters[col];
		if (letter === correctLetter) {
			gotRight++;
			updateTile(currentRow, col, letter, 'correct');
			updateKey(letter, 'correct');
			correctLetters[col] = '';
		}
	}
	for (let col = 0; col < letters.length; col++) {
		const letter = letters[col];
		const correctLetter = correctLetters[col];
		if (correctLetter === '') continue;
		if (correctLetters.includes(letter)) {
			updateTile(currentRow, col, letter, 'wrong-place');
			updateKey(letter, 'wrong-place');
		} else {
			updateTile(currentRow, col, letter, 'bad-guess');
			updateKey(letter, 'bad-guess');
		}
	}
	if (gotRight === 5) {
		gameOver = true;
		showAlert('You got it!');
	}
	currentRow++;
	currentCol = 0;
	if (currentRow === 6) {
		gameOver = true;
		showAlert(`The correct word is ${winningWord}`, 0);
	}
}

$(function(){
	$('body').on('keyup', function(e) {
		// Add letter
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			guessLetter(e.key);
		}
		// Remove letter
		if (e.keyCode === 8) {
			removeGuess();
		}
		// Submit guess
		if (e.keyCode === 13) {
			submitGuess();
		}
	});
	$('button').on('click', function () {
		const key = $(this).data('key');
		// Remove letter
		if (key === 'backspace') {
			removeGuess();
			return;
		}
		// Submit guess
		if (key === 'enter') {
			submitGuess();
			return;
		}
		guessLetter(key);
	})
});
