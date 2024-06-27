(function () {
    class MemoryGame {
        /** The symbols displayed on the cards */
        static #symbols = ['⚽', '⚾', '🏀', '🏈', '🏐', '🥎', '🥭', '🍌'];

        /** 
         * holds the cards that are still left to play 
         * */
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

        /**
         * Returns the deck of cards
         * @returns {Array<Card>}
         */
        get cards() {
            return this.#remainingCards;
        }
    }

    class Card {
        #isFaceUp = false;
        #symbol

        /**
         * Create a new Card
         * @param {string} symbol - The symbol displayed when the card is up
         */
        constructor(symbol) {
            this.#symbol = symbol;
        }

        /** Turn the card face up */
        turnUp() {
            this.#isFaceUp = true;
        }

        /** Turn the card face down */
        turnDown() {
            this.#isFaceUp = false;
        }

        /**
         * Check if the card is facing up
         * @returns {boolean}
         */
        get isFaceUp() {
            return this.#isFaceUp;
        }

        /**
         * Get the symbol shown when card is face up
         * @returns {string}
         */
        get symbol() {
            return this.#symbol;
        }
    }

    const grid = document.querySelector('#grid');
    const game = new MemoryGame();

    /** Initializes the grid of cards */
    function setUpGrid() {
        const docFragment = new DocumentFragment(); // used to hold all the li elements
        game.cards.forEach(card => {
            const li = document.createElement('li');
            li.card = card;
            li.addEventListener('click', cardClickHandler);
            const span = document.createElement('span');
            li.append(span);
            docFragment.appendChild(li);
        });
        grid.appendChild(docFragment); // attach the list items to the ul
    }

    /**
     * Click handler for a card
     * @param {HTMLLIElement} cardItem
     */
    function cardClickHandler(evt) {
        const cardItem = evt.currentTarget;
        if (cardItem.card.isFaceUp) {
            turnCardDown(cardItem);
        } else {
            turnCardUp(cardItem);
        }
    }

    /**
     * Turn a card face up
     * @param {HTMLLIElement} cardItem
     */
    function turnCardUp(cardItem) {
        cardItem.card.turnUp();
        cardItem.querySelector('span').innerText = cardItem.card.symbol;
    }

    /**
     * Turn a card face down
     * @param {HTMLLIElement } cardItem
     */
    function turnCardDown(cardItem, card) {
        cardItem.card.turnDown();
        cardItem.querySelector('span').innerText = '';
    }

    setUpGrid();


})();