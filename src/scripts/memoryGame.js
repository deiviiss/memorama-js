export default class MemoryGame {
  constructor(cardsApi) {
    this.cardsApi = cardsApi;
    console.log('building game...');
    this.canPlay = false;
    this.containerCards = document.querySelector('.card-container');

    this.card1 = null;
    this.card2 = null;
    this.cards = [];
    this.cardsImage;

    this.CurrentLevel = 1;
    this.foundPairs = 0;
    this.maxPairNumber;

    this.startGame();
  }

  startGame() {
    console.log('start game');
    this.setCardsForLevel();
    this.buildContainersCards();
    this.openCards();
  }

  setCardsForLevel() {
    let cards = [];

    for (let index = 0; index < this.CurrentLevel; index++) {
      cards.push({
        name: this.cardsApi[index].name,
        id: this.cardsApi[index].id,
        url: this.cardsApi[index].image
      });
    }

    this.maxPairNumber = cards.length;
    this.cards = cards.concat(cards);
    this.cards.sort(() => Math.random() - 0.5);
  }

  buildContainersCards() {
    let cardsBuild = [];

    this.cards.map(card => {
      cardsBuild.push(
        `<figure class data-image="${card.id}">
        <img class="square" >
        <div class="searched-image">
        <img class="" src="${card.url}" alt="${card.name}"/>
        </div>
</figure>`
      );
    });

    this.renderCards(cardsBuild);
  }

  renderCards(cardsBuild) {
    console.log('render cards');
    this.containerCards.innerHTML = cardsBuild;
  }

  openCards() {
    console.log('open cards');
    this.cardsImage = document.querySelectorAll('.card-container figure');

    this.cardsImage.forEach(card => card.classList.add('opened'));

    setTimeout(() => {
      this.closeCards();
    }, 2000);
  }

  closeCards() {
    console.log('close cards');
    this.cardsImage.forEach(card => card.classList.remove('opened'));
    this.addClickEvents();
    this.canPlay = true;
  }

  addClickEvents() {
    console.log('add click events');
    this.cardsImage.forEach(card => {
      card.addEventListener('click', this.flipCard.bind(this));
    });
  }

  removeClickEvents() {
    console.log('remove click events');
    this.cardsImage.forEach(card => card.removeEventListener('click', this.flipCard));
  }

  flipCard(event) {
    console.log('flip card');
    const clickedCard = event.target;

    if (this.canPlay && !clickedCard.classList.contains('opened')) {
      clickedCard.classList.add('opened');

      this.checkPair(clickedCard.dataset.image);
    }
  }

  checkPair(image) {
    console.log('compare par');
    if (!this.card1) {
      this.card1 = image;
    } else {
      this.card2 = image;
    }

    if (this.card1 && this.card2) {
      this.canPlay = false;
      if (this.card1 == this.card2) {
        setTimeout(this.checkIfWon.bind(this), 1000);
      } else {
        setTimeout(this.resetOpenedCards.bind(this), 1000);
      }
    }
  }

  resetOpenedCards() {
    console.log('reset open');

    const firstOpened = document.querySelector(`figure.opened[data-image='${this.card1}']`);
    const secondOpened = document.querySelector(`figure.opened[data-image='${this.card2}']`);

    firstOpened.classList.remove('opened');
    secondOpened.classList.remove('opened');

    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;
  }

  checkIfWon() {
    console.log('check If won');

    this.foundPairs++;
    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;

    if (this.maxPairNumber == this.foundPairs) {
      alert('¡Ganaste!');
      this.CurrentLevel++;
      this.foundPairs = 0;

      this.setNewGame();
    }
  }

  setNewGame() {
    console.log('start new game');
    this.removeClickEvents();
    this.cardsImage.forEach(card => card.classList.remove('opened'));

    setTimeout(this.startGame.bind(this), 1000);
  }
}