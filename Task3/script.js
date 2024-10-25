const gameContainer=document.getElementById("game-container");
const resetButton=document.getElementById("reset");

let firstCard, secondCard;
let flipped=false;
let lockContainer=false;

let array = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

function startGame() {
    gameContainer.innerHTML='';
    array = array.sort(() => Math.random() - 0.5);
    array.forEach(card =>{
        const cardElement=document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML=`
        <div class="card-content card-back"></div>
        <div class="card-content card-front">${card}</div>
        `;
        cardElement.addEventListener('click',flipCard);
        gameContainer.appendChild(cardElement);
    });
}

function flipCard(){

    if(lockContainer)
        return;
    if(this===firstCard)
        return;

    this.classList.add('flip');
    if(!flipped)
    {
    firstCard=this;
    flipped=true;
    return;
    }
    secondCard=this;
    checkforMatch();

}

function checkforMatch(){
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetStatus();
}

function resetStatus(){
    flipped=false;
    lockContainer=false;
    firstCard=null;
    secondCard=null;
}

function unflipCards(){
    lockContainer=true;

    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetStatus();
    },1000);

}

resetButton.addEventListener('click',startGame);

startGame();
