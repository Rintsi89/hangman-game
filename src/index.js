import Hangman from './hangman'
import getPuzzle from './requests'

const gameElement = document.querySelector("#puzzle")
const guessElement = document.querySelector("#guesses-left")
const guessedLetters = document.querySelector("#guessed-letters")
const hangmanImage = document.querySelector("#hangman-image")
const hangingTitle = document.querySelector("#hangman-title") 
let game1

window.addEventListener("keypress", (e) => {
    const guess = String.fromCharCode(e.charCode)
    if (guess.match(/^[a-z0-9]$/i)) { // This allows only alphanumeric characters
        game1.makeGuess(guess)
        render()  
    }
})

const render = () => {
    gameElement.innerHTML = ""
    guessElement.textContent = game1.statusMessage
    guessedLetters.textContent = game1.guessedLetters.join(", ")

    if (game1.status === "failed") {
        hangmanImage.style.visibility = "visible"
    }

    for(let i = 0; i < game1.puzzle.length; i++) {
        gameElement.innerHTML += `<span>${game1.puzzle[i]}</span>` 
    }
}

const startGame = async () => {
    const puzzle = await getPuzzle("2")
    game1 = new Hangman(puzzle, 5)
    render()
    guessedLetters.textContent = "No guesses yet"
    hangmanImage.style.visibility = "hidden"
}

document.querySelector("#reset").addEventListener("click", startGame)

startGame()
