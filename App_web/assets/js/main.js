var error = "Failure, please verify you entered the right code";

function importHeader() {
    var nbOfelem, i, elem, file, xhttp;
    nbOfelem = document.getElementsByTagName("*");
    for (i = 0; i < nbOfelem.length; i++) {
      elem = nbOfelem[i];
      file = elem.getAttribute("header");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {elem.innerHTML = this.responseText;}
            if (this.status === 404) {elem.innerHTML = "Page not found.";}
            elem.removeAttribute("header");
            importHeader();
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
}

function makeItAppear() {
    document.getElementById("profile").setAttribute("onclick", "{makeItDisappear()}");
    document.getElementById("submenu").style.display = "inline-block";
    document.getElementById("submenu").style.position = "absolute";
    document.getElementById("submenu").style.right = "0";
    document.getElementById("submenu").style.top = "54px";
    document.getElementById("submenu").style.backgroundColor = "rgb(47, 85, 151)";
}

function makeItDisappear() {
    document.getElementById("profile").setAttribute("onclick", "{makeItAppear()}");
    document.getElementById("submenu").style.display = "none";
}

function checkCode() {
    var code = document.getElementById("verif-code").value;
    Console.log(code);
    if (code === "test") {
        document.location.href="infos.html";
    } else {
        document.getElementById("submit").setAttribute("onclick", "{checkCode()}");
        document.getElementById("result").innerText = error;
        document.getElementById("result").style.backgroundColor = "red";
        document.getElementById("result").style.color = "white";
        code = null;
    }
}
