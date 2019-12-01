// Basically str_to_wordtab
// function makeTab(chaine){
    // return re.findall(r"[\w']+",chaine)

    function make_sized_tab(chaine, size){
        return chaine.match(new RegExp('.{1,' + size + '}', 'g'));
    }
    
    // translate the ascii values of the matrix into readable characters
    function get_meaning(tab){
        var mean = "";
    
        for (let y = 0; y < tab.length; y++) {
            for (let x = 0; x < tab[y].length; x++) {
                // transform the values into characters
                mean += String.fromCharCode(tab[y][x]);
            }
        }
        return mean;
    }
    
    function addDelta(key){
        // calculate the delta
        // the formla of the delta is ab - cd
        var val = Math.abs(((key[0][0] * key[1][1]) - (key[0][1] * key[1][0]))) % 127;
        for (let idx = 0; idx < 1000; idx++) {
            var delta = val * idx;
            // get the inverse delta to multiply with the adjugate matrix of the key
            if (delta % 127 === 1) {
                return idx
            }
        }
    }
    
    // function get_content(file){
    //     myfile = open(file, "r")
    //     return myfile.read()
    
    // function write(encrypted, file){
    //     myfile = open(file, "w")
    
    //     for char in encrypted{
    //         myfile.write(char)
    //     myfile.close()
    