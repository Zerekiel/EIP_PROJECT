window.onload = function lol() {
    var _$_7fe6 = ["test", "log"]; function lol() { console[_$_7fe6[1]](_$_7fe6[0]) }
}

function decrypt() {
    var key = document.getElementById('key').value;
    var message = document.getElementById('message').value;

    var key_matrix = create_key_matrix(key);
    var message_matrix = create_message_matrix(message);
    var delta = addDelta(key_matrix);
    var adj_key_matrix = get_adj(key_matrix);
    var adj_key_matrix = multiply(adj_key_matrix, delta);
    var mult_matrix = matrix_mult(adj_key_matrix, message_matrix);
    var decrypted = get_meaning(mult_matrix);
    document.getElementById('message').value = decrypted;
}

function encrypt() {
    var key = document.getElementById('key').value;
    var message = document.getElementById('message').value;

    var key_matrix = create_key_matrix(key);
    var message_matrix = create_message_matrix(message);
    var mult_matrix = matrix_mult(key_matrix, message_matrix);
    var encrypted = get_meaning(mult_matrix);
    document.getElementById('message').value = encrypted;
}