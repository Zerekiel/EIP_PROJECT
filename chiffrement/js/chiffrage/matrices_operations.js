// multiply every value of the matrix with an given index
function multiply(tab, idx) {
    for (let y = 0; y < tab.length; y++) {
        for (let x = 0; x < tab[y].length; x++) {
            console.log(tab[y][x]);
            tab[y][x] = (tab[y][x] * idx) % 127;
        }
    }
    return tab;
}

// function to obtain the adjugate matrix of the key
function get_adj(key) {
    tab = Array(2).fill(0).map(v => Array(2).fill(0).map(v => 0));
    
    // the formula to the adjugate matrix [a, b] is [d, -b]
                                    //    [c, d]    [-c, a]
    tab[0][0] = key[1][1];
    tab[0][1] = (((-key[0][1]) % 127) + 127) % 127;
    tab[1][0] = (((-key[1][0]) % 127) + 127) % 127;
    tab[1][1] = key[0][0];
    return tab;
}

function hill(key, line) {
    var tab = [];

    for (let y = 0; y < key.length; y++) {
        var val = 0;
        for (let x = 0; x < key.length; x++) {
            val += key[y][x] * line[x];
        }
        // apply a modulo 127 to every value too otain a readable value
        tab.push(val % 127);
    }
    return tab
}

function matrix_mult(key, message) {
    var matrix = message;

    for (let y = 0; y < message.length; y++) {
        // multiply the key with every line of the message
        matrix[y] = hill(key, message[y]);
    }
    return matrix
}