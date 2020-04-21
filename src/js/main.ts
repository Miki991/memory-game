import '../css/style.css'

/* TYPE UTILITIES */
interface Cards {
  front: string;
  back: string;
  title: string;
  id: string;
}

class Game {
  game: Element;
  hasFlippedCard: boolean;
  lockBoard: boolean;
  firstCard: any;
  secondCard: any;
  data: Cards[];

  constructor() {
    this.game = document.querySelector(".memory-game")! as HTMLDivElement;
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.data = [
      {
        front: "assets/paw-patrol.jpg",
        back: "assets/ts.png",
        title: "Paw-Patrol",
        id: "1",
      },
      {
        front: "assets/dora-the-explorer.jpg",
        back: "assets/ts.png",
        title: "Dora-the-Explorer",
        id: "2",
      },
      {
        front: "assets/the-cars.jpg",
        back: "assets/ts.png",
        title: "The-Cars",
        id: "3",
      },
      {
        front: "assets/shimmer-and-shine.jpg",
        back: "assets/ts.png",
        title: "Shimmer-And-Shine",
        id: "4",
      },
      {
        front: "assets/tmnt.jpg",
        back: "assets/ts.png",
        title: "Teenage-Mutant-Ninja-Turtles",
        id: "5",
      },
      {
        front: "assets/frozen.jpg",
        back: "assets/ts.png",
        title: "Frozen",
        id: "6",
      },
      {
        front: "assets/paw-patrol.jpg",
        back: "assets/ts.png",
        title: "Paw-Patrol",
        id: "1",
      },
      {
        front: "assets/dora-the-explorer.jpg",
        back: "assets/ts.png",
        title: "Dora-the-Explorer",
        id: "2",
      },
      {
        front: "assets/the-cars.jpg",
        back: "assets/ts.png",
        title: "The-Cars",
        id: "3",
      },
      {
        front: "assets/shimmer-and-shine.jpg",
        back: "assets/ts.png",
        title: "Shimmer-And-Shine",
        id: "4",
      },
      {
        front: "assets/tmnt.jpg",
        back: "assets/ts.png",
        title: "Teenage-Mutant-Ninja-Turtles",
        id: "5",
      },
      {
        front: "assets/frozen.jpg",
        back: "assets/ts.png",
        title: "Frozen",
        id: "6",
      },
    ];

    this.renderCards();
  }

  renderCards = (): void => {
    let gameInnerHTML = "";

    // Set data to always return different order of cards data
    this.data.sort(() => 0.5 - Math.random());

    for (let i = 0; i < this.data.length; i++) {
      gameInnerHTML += `
              <div class="memory-card" data-id=${this.data[i].id}>
                  <img class="card-img front-img" src=${this.data[i].front} alt=${this.data[i].title} />
                  <img class="card-img back-img" src=${this.data[i].back} alt="TS Logo" />
              </div>
            `;
    }

    this.game.innerHTML = gameInnerHTML;
    this.setHandlerOnCards();
  };

  setHandlerOnCards = () => {
    const cards = document.querySelectorAll(".memory-card")!;
    cards.forEach((card) => {
      card.addEventListener("click", this.flipCard);
    });
  };

  flipCard = (e: Event) => {
    const el = (e.target as HTMLDivElement).closest(".memory-card")!;

    // If two cards are flipped, no more can be flipped
    if (this.lockBoard) {
      return;
    }

    // Disabling clicking on the same card two times
    if (el === this.firstCard) {
      return;
    }

    el.classList.add("flip");

    // First card
    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true;
      this.firstCard = el;

      return;
    }

    // Second card
    this.secondCard = el;

    this.checkForMatch();
  };

  checkForMatch = (): void => {
    let isMatch: boolean =
      this.firstCard?.dataset.id === this.secondCard?.dataset.id;

    isMatch ? this.disableCards() : this.unflipCards();
  };

  disableCards = (): void => {
    this.firstCard.removeEventListener("click", this.flipCard);
    this.secondCard.removeEventListener("click", this.flipCard);

    this.resetBoard();
    this.endGame();
  };

  unflipCards = (): void => {
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.classList.remove("flip");
      this.secondCard.classList.remove("flip");

      this.resetBoard();
    }, 1000);
  };

  resetBoard = (): void => {
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];
  };

  endGame = (): void => {
    let arr: Element[] = [];

    // Creating an array out of node list so to use array methods
    const allCards = document.querySelectorAll(".memory-card")!;
    allCards.forEach((card) => arr.push(card));

    // Checking if all cards are flipped. If they are, the game is over.
    const allFlipped = arr.every((card) => card.classList.contains("flip"));

    if (allFlipped) {
      this.gameOver();
    }
  };

  gameOver = (): void => {
    this.game.innerHTML = `
      <div class="game-over">
        <p class="game-over-message">Congratulations! You matched all the cards</p>
        <img src="assets/game-over.png" alt="Game-Over" />
        <button id="new-game-btn">NEW GAME</button>
      </div>
    `;

    this.setHandlerOnButtons();
  };

  setHandlerOnButtons = () => {
    const btn = document.getElementById("new-game-btn")!;
    btn.addEventListener("click", this.renderCards);
  };
}

new Game();
