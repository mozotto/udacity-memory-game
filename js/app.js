(function () {
    /** The symbols displayed on the cards */
    const symbols = ['⚽', '⚾', '🏀', '🏈', '🏐', '🥎', '🥭', '🍌'];
    const cards = [];
    let selectedCard; // the currently selected face up card
    let score = 0;

    /** create a new shuffled deck of cards */
    function createNewDeck() {
        symbols.forEach(symbol => {
            const card1 = createCard(symbol);
            const card2 = createCard(symbol);
            cards.push(card1, card2);
        });

        // shuffle cards
        for (let i = (cards.length - 1); i > 0; i--) { // countdown instead to avoid having to adjust for the lower bound of random
            const j = Math.floor(Math.random() * (i + 1)); // randomly choose another card index
            [cards[j], cards[i]] = [cards[i], cards[j]]; // swap those the cards at those 2 positions
        }
        const grid = document.querySelector('#grid'); // card grid
        grid.append(...cards); // attach the list items to the ul

        function createCard(symbol) {
            const card = document.createElement('li');
            card.classList.add('card');
            card.symbol = symbol; // attach
            card.addEventListener('click', cardClickHandler);
            return card
        }
    }

    /**
     * Click handler for a card
     * @param {Event} evt
     */
    function cardClickHandler(evt) {
        const card = evt.currentTarget;
        if (card.innerText.length) return; // clicked on card already face up. No Op
        card.innerText = card.symbol; // turn the card up
        if (selectedCard) {
            checkForMatch(card);
        } else {
            // no card selected
            selectedCard = card; // enter into selection mode
        }
    }

    function checkForMatch(card) {
        //todo do comparison
        if (selectedCard.symbol === card.symbol) {
            // match made
            score++; // increase score
            refreshScore();
            hideCards(card)
        } else {
            // no match
            score--; // reduce score
            refreshScore();
            turnOverCards(card);
        }
    }

    /** Turn over the chosen cards
     * @param {HTMLLIElement} card
     */
    function turnOverCards(card) {
        setTimeout(() => {
            selectedCard.innerText = '';
            card.innerText = '';
            selectedCard = null; // remove selection
        }, 500);
    }

    /** hide the chosen cards
     * @param {HTMLLIElement} card
     */
    function hideCards(card) {
        setTimeout(() => {
            selectedCard.style.visibility = 'hidden';
            card.style.visibility = 'hidden';
            selectedCard = null; // remove selection
        }, 500);
    }

    function refreshScore() {
        const elem = document.querySelector("#score");
        elem.innerText = `Score: ${score}`;
    }

    createNewDeck();
    refreshScore()

})();
