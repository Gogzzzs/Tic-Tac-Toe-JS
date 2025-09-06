const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameActive = true;
const rstrtBttn = document.getElementById("restart");
const message = document.getElementById("message");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
let cO = cX = 0;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

const handleClick = (event)=>{
    const cell = event.target;

    

    if(!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    cell.classList.add("animated");

    if(checkWin()){
        message.textContent = `${currentPlayer} wins`;
        if(currentPlayer === "X"){
            cX++;
            scoreX.textContent = `X - ${cX}`;
        }else{
            cO++;
            scoreO.textContent = `${cO} - O`
        }
        gameActive = false;
        return;
    }

    const isDraw = [...cells].every(cell => cell.textContent !== "");

    if(isDraw){
        message.classList.remove("xTurn", "oTurn");
        message.classList.add("draw");
        message.textContent = "It's a Draw";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    message.classList.remove("xTurn", "oTurn");
    message.classList.add(`${currentPlayer.toLowerCase()}Turn`)

    message.textContent =`${currentPlayer} turn`;
};


const checkWin = ()=>{
    return winningCombos.some((combo)=>{
        const [a, b, c] = combo;
        
        if(
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        ){
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            return true;
        };
    });
}


cells.forEach((cell)=>{
    cell.addEventListener("click", handleClick);
});

rstrtBttn.addEventListener("click", ()=>{
    message.classList.remove("xTurn", "oTurn", "draw");
    
    
    message.textContent = "X turn";
    message.classList.add("xTurn");

    cells.forEach(cell => {

        cell.textContent = "";
        cell.classList.remove("winner");
        cell.classList.remove("animated");
    });
    currentPlayer= "X";

    gameActive = true;
});