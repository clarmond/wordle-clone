let currentRow = 0;
let currentCol = 0;

function getTile(row, col) {
	const tiles = $('.tile');
	const offset = (row * 5) + col;
	const currentTile = tiles[offset];
	return $(currentTile);
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
	});
});
