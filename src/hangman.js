class Hangman {
    constructor(word, maxGuesses) {
        this.word = word.toLowerCase().split("")
        this.maxGuesses = maxGuesses
        this.guessedLetters = []
        this.status = "playing"
    }
    get statusMessage() {
        if (this.status === "playing") {
            return `You have ${this.maxGuesses} guesses left`
        } else if (this.status === "failed") {
            return `Nice try! The word was "${this.word.join("")}"`
        } else {
            return "Great work! You guessed the word!"
        }
    }
    get puzzle() {
        let puzzle = ""

        this.word.forEach((letter) => {
            this.guessedLetters.includes(letter) || letter === " " ? puzzle += letter : puzzle += "*"
        })

        return puzzle
    }
    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === " ") // Checks if every letter from word array is included in guessed letters array
        if (this.maxGuesses === 0) {
            this.status = "failed"
        } else if (finished) {
            this.status = "finished"
        } else {
            this.status = "playing"
        }
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (this.status !== "playing") {
            return // This will stop the code execution if status is not playing
        }

        if (isUnique) {
            this.guessedLetters.push(guess)
        }

        if (isUnique && isBadGuess) {
            this.maxGuesses--
        }
        this.calculateStatus()
    }
}

export { Hangman as default }