function create_key_matrix(key) {
    var key = make_sized_tab(key, 2);
    var tab = Array(2).fill(0).map(v => Array(2).fill(0).map(v => 0));

    for (let y = 0; y < tab.length; y++) {
        for (let x = 0; x < tab[y].length; x++) {
            tab[y][x] = key[y].charCodeAt(x);
        }
    }
    tab[tab.length - 1][tab[0].length - 1] = !isNaN(tab[tab.length - 1][tab[0].length - 1]) ? tab[tab.length - 1][tab[0].length - 1] : 0
    return tab
}

function create_message_matrix(message) {
    var message = make_sized_tab(message, 2);
    var tab = Array(message.length).fill(0).map(v => Array(2).fill(0).map(v => 0));

    for (let y = 0; y < tab.length; y++) {
        for (let x = 0; x < tab[y].length; x++) {
            tab[y][x] = message[y].charCodeAt(x);
        }
    }
    tab[tab.length - 1][tab[0].length - 1] = !isNaN(tab[tab.length - 1][tab[0].length - 1]) ? tab[tab.length - 1][tab[0].length - 1] : 0
    return tab
}
