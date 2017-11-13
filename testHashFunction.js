const
    blue = "\x1b[34m",
    red = "\x1b[31m",
    green = "\x1b[32m",
    white = "\x1b[37m",
    yellow = "\x1b[33m",
    cyan = "\x1b[36m",
    reset = "\x1b[0m";

module.exports = {
    testHash(hashFunction) {
        /**
         * Words are stored as : {"word1": 1, "word2":1, ...}
         * To get words, we extract keys front this structure to get a list of Strings
         * @type {Array} List of words
         */
        time('load words');
        const words = Object.keys(
            require('./words_dictionary.json')
        );
        timeEnd('load words');

        console.warn("You are about to work on ", green, words.length, reset, " words");

        const results = new Map();

        time('iterate over words');
        for(let word of words) {
            const hash = hashFunction(word);
            const actualWords = results.get(hash);
            if (actualWords) {
                actualWords.push(word);
            } else {
                results.set(hash, [word]);
            }
        }

        time('Tell the result');
        if (results.size < words.length) {
            for(let [hash, words] of results.entries()) {
                if (words.length > 1) {
                    console.log(
                        "Found: ", white,
                        words.slice(0, 10).join(', '), words.length > 10 ? ", ...":"",
                        reset,
                        " for ", cyan, hash, reset,
                        " so ", red, words.length, reset, "collisions");
                }
            }
            const collisionCount = words.length - results.size;
            console.log("There was a total of ", red, collisionCount, reset, "collisions");
        } else {
            console.log(green, "WOW, no collision", reset);
        }
    }
}

function timeKey(key) {
    return `${key} took ${blue}`;
}

function time(key) {
    console.time(timeKey(key));
    console.log(reset);
}

function timeEnd(key) {
    console.timeEnd(timeKey(key));
    console.log(reset);
}