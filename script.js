const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameinfo");
const newgamebtn = document.querySelector(".btn");
const winbar = document.querySelector(".winning-display");
const overlays = document.querySelector(".overlay");
const wintext = document.querySelector(".winning-text");
let currentplayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
];
function init() {
    currentplayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //green color ko bi remove karna padega
        //initialize box with css properties again
         box.classList = `box box${index+1}`;

    })
    newgamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player -${currentplayer}`;
    winbar.classList.remove("active");
    overlays.classList.remove("active");
};
init();

function swapTurn() {
    if (currentplayer === "X") {
        currentplayer = "O";
    }
    else {
        currentplayer = "X";
    }
    gameInfo.innerText = `Current Player -${currentplayer}`;
}

function checkgameOver() {
      let answer = "";
      winningPositions.forEach((position)=>{
            if((gameGrid[position[0]]!=="" ||gameGrid[position[1]]!=="" ||gameGrid[position[2]]!=="" ) &&
            (gameGrid[position[0]]===gameGrid[position[1]]) && gameGrid[position[1]]===gameGrid[position[2]]){
                  
                if(gameGrid[position[0]]==="X"){
                    answer="X";
                }
                else{
                    answer = "O";
                }
                //remove pointer events after winning
               boxes.forEach((box)=>{
                  box.style.pointerEvents= "none";
               })
                 boxes[position[0]].classList.add("win");
                 boxes[position[1]].classList.add("win");
                 boxes[position[2]].classList.add("win");
            }
      }  )

      if(answer!==""){
         newgamebtn.classList.add("active");
         winbar.classList.add("active");
         gameInfo.innerText = `winner player - ${answer}`;
         overlays.classList.add("active");
         wintext.innerText = `Player -${answer} is winner`;

         return
      }

      // when there is no winner .. tie occur
      let fillcount =0;
      gameGrid.forEach((box)=>{
         if(box!==""){
             fillcount++;
         }
      })

      if(fillcount ===9){
        gameInfo.innerText = "Game Tie !";
        newgamebtn.classList.add("active");
      }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentplayer;
        gameGrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkgameOver();
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newgamebtn.addEventListener("click", init);



