export const pinGenerator = (username: string, pinLength: number) => {
    const token = generateToken(username, pinLength);
    const splitParts = splitStringIntoParts(token, pinLength);
    const pin = splitParts.map(stringToValue).map(reduceToSingleDigit).join('');
    return pin;
}

function generateToken(username: string, length: number) {
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * username.length);
        token += username.charAt(randomIndex);
    }

    return token;
}

function splitStringIntoParts(token: string, pinLength: number) {
    const partLength = Math.ceil(token.length / pinLength);
    const splitArray = [];

    for (let i = 0; i < token.length; i += partLength) {
        splitArray.push(token.slice(i, i + partLength));
    }

    return splitArray;
}

function stringToValue(str: string) {
    const letterToValue: Record<string, number> = {}; // Define a mapping of letters to their values

    // Populate the letterToValue mapping
    for (let i = 0; i < 26; i++) {
        letterToValue[String.fromCharCode(97 + i)] = i + 1; // 'a' = 1, 'b' = 2, ..., 'z' = 26
    }

    const value = str.toLowerCase().split('').reduce((acc, char) => acc + (letterToValue[char] || 0), 0);
    return value;
}

function reduceToSingleDigit(value: number) {
    return (value - 1) % 9 + 1;
}
