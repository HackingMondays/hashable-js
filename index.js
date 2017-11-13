const {testHash} = require('./testHashFunction.js');

function hashWord(word) {
    // TODO: make you own hash function for a word

    return word.length;
}

testHash(hashWord)