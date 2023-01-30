const section = document.querySelector(".memory-game");
let stopGame = false; //To stop game anytime we want.
let card1 = null; //card 1 and 2 are for assigning elements to them with class and style.
let card2 = null;
//When game reaches to the array's length, game should stop.
let cardsPlayed = 0;

const catArray = [
  "cat-0.jpg",
  "cat-1.jpg",
  "cat-2.jpg",
  "cat-3.jpg",
  "cat-4.jpg",
  "cat-5.jpg",
  "cat-6.jpg",
  "cat-7.jpg",
  "cat-0.jpg",
  "cat-1.jpg",
  "cat-2.jpg",
  "cat-3.jpg",
  "cat-4.jpg",
  "cat-5.jpg",
  "cat-6.jpg",
  "cat-7.jpg",
];

//Shuffling images
function shuffleImages(array) {
  let count = array.length;

  while (count > 0) {
    const random = Math.floor(Math.random() * count);
    count--;
    let temp = array[count];
    array[count] = array[random];
    array[random] = temp;
  }
  return array;
}
//Creating cards
const newArr = shuffleImages(catArray);

function createDiv(newCatArray) {
  for (let i = 0; i < newCatArray.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("card-code", newCatArray[i]);
    section.insertAdjacentElement("beforeend", card);
    card.addEventListener("click", cardHandle);

    function cardHandle(e) {
      //Stop the game if...
      if (stopGame) return;
      if (e.target.classList.contains("clickedOn")) return;

      let clickedCard = e.target;
      clickedCard.style.transform = "rotateY(180deg)";

      setTimeout(function () {
        clickedCard.style.backgroundImage = `url(images/${newCatArray[i]})`;
      }, 450);

      //Check to see if cards have a value
      if (!card1 || !card2) {
        card1 = card1 || clickedCard;

        clickedCard.classList.add("clickedOn");
        card2 = card1 === e.target ? null : clickedCard;
      }

      if (card1 && card2) {
        stopGame = true;
        const cardData1 = card1.getAttribute("card-code");
        const cardData2 = card2.getAttribute("card-code");

        if (cardData1 === cardData2) {
          cardsPlayed += 2;
          card1.removeEventListener("click", cardHandle);
          card2.removeEventListener("click", cardHandle);
          card1 = null;
          card2 = null;
          stopGame = false;
        } else {
          setTimeout(function () {
            card1.style.backgroundImage = "";
            card2.style.backgroundImage = "";
            card1.classList.remove("clickedOn");
            card2.classList.remove("clickedOn");
            card1 = null;
            card2 = null;
            stopGame = false;
          }, 1000);
        }
      }
    }
  }
  if (cardsPlayed === newArr.length) alert("GAME OVER!");
}
createDiv(newArr);
