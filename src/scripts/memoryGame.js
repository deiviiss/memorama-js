export default class MemoryGame {
  constructor(cardsApi) {
    this.cardsApi = cardsApi;
    console.log('building game...');

    this.containerCards = document.querySelector('.card-container');
    this.containerBoard = document.querySelector('.board');
    this.showAttempts = document.querySelector('.attempts');
    this.showScore = document.querySelector('.score');
    this.startButton = document.querySelector('.btn-start'); //Mientras se crea pagina inicial//

    this.canPlay = false;
    this.card1 = null;
    this.card2 = null;
    this.cardsGame = [];
    this.cardsImage;

    this.CurrentLevel = 2;
    this.foundPairs = 0;
    this.maxPairNumber = 0;
    this.attempts = 0;

    // save database
    this.usedCards = [];
    this.cardsToAvoid = [0, 1];

    this.startGame();
  }

  startGame() {
    console.log('start game');
    this.setCardsForLevel();
    this.renderBoard();
    this.buildContainersCards();
    this.openCards();

    //mostrar score y attempts y ocultar Start//
    this.showScore.style.display = 'flex';
    this.showAttempts.style.display = 'flex';
    this.startButton.style.display = 'none';
  }

  setCardsForLevel() {
    let cards = [];

    for (let index = 0; index < this.CurrentLevel; index++) {
      // trae las cartas de la api de forma aleatoria
      let randomIndex = Math.floor(Math.random() * this.cardsApi.length);

      while (this.usedCards.includes(randomIndex) || this.cardsToAvoid.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * this.cardsApi.length);
      }

      this.usedCards.push(randomIndex);

      cards.push({
        name: this.cardsApi[randomIndex].name,
        id: this.cardsApi[randomIndex].id,
        url: this.cardsApi[randomIndex].image
      });
    }

    this.maxPairNumber = cards.length;
    this.cardsGame = cards.concat(cards);
    this.cardsGame.sort(() => Math.random() - 0.5);
  }

  buildContainersCards() {
    let cardsImage = [];

    this.cardsGame.map(card => {
      cardsImage.push(
        `<figure data-image="${card.id}">
        <i class="fa-solid fa-question"></i>
        <div class="back"></div>
        <div class="searched-image">
        <img class="" src="${card.url}" alt="${card.name}"/>
        </div>
</figure>`
      );
    });

    this.renderCards(cardsImage.join(''));
  }

  renderCards(cardsImage) {
    console.log('render cards');
    this.containerCards.innerHTML = cardsImage;
  }

  renderBoard() {
    this.containerBoard.classList.remove('hide');
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
      this.counterAttemps();
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

  counterAttemps() {
    this.attempts++;
    this.showAttempts.innerHTML = `<h3>Attempts: ${this.attempts}</h3>`;
  }

  checkIfWon() {
    console.log('check If won');

    this.counterPairs();

    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;

    if (this.maxPairNumber == this.foundPairs) {

      this.CurrentLevel++;

      setTimeout(() => {
        this.modalContinue();
      }, 1000);
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

  counterPairs() {
    this.foundPairs++;
    this.showScore.innerHTML = ` <h3>Score: ${this.foundPairs}</h3>`;
  }

  resetBoard() {
    this.foundPairs = 0;
    this.attempts = 0;
    this.showScore.innerHTML = '<h3>Score: </h3>';
    this.showAttempts.innerHTML = '<h3>Attepmts: </h3>';
  }

  setNewGame() {
    console.log('start new game');
    this.removeClickEvents();
    this.cardsImage.forEach(card => card.classList.remove('opened'));
    this.resetBoard();

    setTimeout(this.startGame.bind(this), 1000);
  }

  modalContinue() {
    //Queryselector para el modal de continuar//
    this.nextModal = document.querySelectorAll('.next')[0];
    this.modal = document.querySelectorAll('.modal')[0];
    this.modalContainer = document.querySelectorAll('.modal-container')[0];

    this.modalContainer.style.opacity = "1";
    this.modalContainer.style.visibility = "visible";
    this.modal.classList.toggle("modal-close");

    this.nextModal.addEventListener("click", () => {
      this.modal.classList.toggle("modal-close");

      setTimeout(() => {
        this.modalContainer.style.opacity = "0";
        this.modalContainer.style.visibility = "hidden";
      },300)

      this.setNewGame()
    })
  }
}