const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart");

const cardValues = ['Ajith', 'Vijay', 'Surya', 'vikram', 'kamal', 'Dhanush', 'Rajini', 'Simbu'];
let cardsArray = [...cardValues, ...cardValues];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;
function shuffleCards() {
    cardsArray.sort(() => 0.5 - Math.random());
}
function createCards() {
    gameBoard.innerHTML = '';
    shuffleCards();
    cardsArray.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${value}</div>
                <div class="card-back"></div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; 

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}
function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    matchedCards += 2;
    if (matchedCards === cardsArray.length) {
        setTimeout(() => alert('Congratulations! You found all pairs!'), 500);
    }
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
function restartGame() {
    matchedCards = 0;
    createCards();
}
restartButton.addEventListener('click', restartGame);
createCards();