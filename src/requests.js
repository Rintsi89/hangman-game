const getPuzzle = async (wordCount) => {
    const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if (response.ok) { // OK property checks if status code is in range 200 - 299
        const data = await response.json()
        return data.puzzle
    } else {
        throw Error("Unable to get puzzle")
    }
}

export { getPuzzle as default }