let isGameOver = false
let turn = 'X'

let turnInfo = document.querySelector('.turn-info')

const buttons = document.querySelectorAll('.btn')
for(let button of buttons) {
    button.addEventListener('click', (e) => {
        if(!isGameOver) {
            if(button.innerText !== 'X' && button.innerText !== 'O') {
                e.target.innerText = turn
                turn = (turn === 'X')? 'O':'X';
                turnInfo.innerText = `Turn for ${turn}`
                if(checkWin()) {
                    isGameOver = true;
                    turn = (turn === 'X')? 'O':'X'
                    turnInfo.innerText = `Player ${turn} Win!`
                }
            }
            if(!isGameOver && isTied()) {
                turnInfo.innerText = `Game Tied!`
            }
        }
    })
}

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', (e) => {
    for(let button of buttons) {
        button.innerText = ''
    }
    turnInfo.innerText = `Turn for X`
    isGameOver = false;
    turn = 'X'
})

function checkWin() {
    let buttonsArray = Array.from(buttons)
    let winningCombos = [[0,1,2], [3,4,5], [6,7,8], 
                         [0,3,6], [1,4,7], [2,5,8],
                         [0,4,8], [2,4,6]]
    let gameOver = true;
    let initVal = undefined
    for(let it of winningCombos) {
        initVal = undefined
        gameOver = true
        for(let idx of it) {
            if(initVal === undefined) {
                initVal = buttonsArray[idx].innerText
                if(initVal === '') {
                    gameOver = false;
                    break;
                }
            }
            else {
                let curVal = buttonsArray[idx].innerText
                if(curVal === '') {
                    gameOver = false;
                    break;
                }
                if(curVal !== initVal) {
                    gameOver = false;
                    break;
                }
            }
        }
        if(gameOver)    return true;
    }
    return false
}

function isTied() {
    for(let button of buttons) {
        if(button.innerText !== 'X' && button.innerText !== 'O') {
            return false;
        }
    }
    return true;
}


let darkModeButton = document.querySelector(".dark-mode-btn")
darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle('dark-mode')
    if(document.body.classList.contains('dark-mode')) {
        darkModeButton.innerText = 'Light Mode'
    }
    else    darkModeButton.innerText = 'Dark Mode'
})
