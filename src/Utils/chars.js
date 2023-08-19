const alphabet = "abcdefghijklmnopqrstuvwxyz";
const nums = "1234567890";
const symbols = `()[]{}+-=:;'"&!`;

const chars = alphabet + alphabet.toUpperCase() + nums + symbols;

export default chars.split("");
