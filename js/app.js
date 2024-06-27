(function () {
    class MemoryGame {
        /** The symbols displayed on the cards */
        static #symbols = ['⚽', '⚾', '🏀', '🏈', '🏐', '🥎', '🥭', '🍌'];

        /** holds the cards that are still left to play */
        #remainingCards

        constructor() {
            this.#remainingCards = this.#createNewDeck();
            this.#shuffle();
        }

        /** shuffles the cards in place */
        #shuffle() {
            const array = this.#remainingCards;
            for (let i = (array.length - 1); i > 0; i--) { // countdown instead to avoid having to adjust for the lower bound of random
                const j = Math.floor(Math.random() * (i + 1)); // randomly choose another card index
                [array[j], array[i]] = [array[i], array[j]]; // swap those the cards at those 2 positions
            }
        }

        #createNewDeck() {
            return MemoryGame.#symbols.flatMap(symbol => [new Card(symbol), new Card(symbol)]);
        }

        get remainingCards() {
            return this.#remainingCards;
        }
    }

    class Card {
        #isFaceUp = false;
        #symbol

        constructor(symbol) {
            this.#symbol = symbol;
        }

        turnUp() {
            this.#isFaceUp = true;
        }

        turnDown() {
            this.#isFaceUp = false;
        }

        get isFaceUp() {
            return this.#isFaceUp;
        }

        get symbol() {
            return this.#symbol;
        }
    }

    const grid = document.querySelector('#grid');

    function setUp() {
        const game = new MemoryGame();
        const docFragment = new DocumentFragment(); // used to hold all the li elements
        game.remainingCards.forEach(card => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            // span.innerText = card.symbol;
            li.append(span);
            docFragment.appendChild(li);
        });
        grid.appendChild(docFragment); // attach the list items to the ul
    }

    setUp();

})();

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}