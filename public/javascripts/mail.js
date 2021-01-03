window.onload = function(page) {
    $('form').submit(function(e) {
        e.preventDefault();
        var Name = $(e.target)[0][0].value;
        var Mail = $(e.target)[0][1].value;
        var pswd = $(e.target)[0][2].value;
        var confirm_pswd = $(e.target)[0][3].value;
        var expertise = $(e.target)[0][4].value;
        var id = $(e.target)[0][5].value;
        var Adresse = $(e.target)[0][6].value;
        var telephone = $(e.target)[0][7].value;

        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "joan.falsimagne@epitech.eu",
            Password: "88BA206BAA3FEC5AFDFC33B06E3E9EFDD958",
            To: "jojo.ff.91@gmail.com,contact.healthsafe@gmail.com",
            From: 'joan.falsimagne@epitech.eu',
            Subject: Name + ', ' + Mail,
            Body: Name + ' ' + ' voudrai effectuer une inscription avec comme numero: ' + id + ' informations complementaire : ' + ' ' + 'Expertise : ' + expertise + ',  ' + ' Adresse : ' + Adresse + ',  ' + ' Telephone : ' + telephone

        }).then(message => alert(message));
    });
}

function displayDrop() {
    var dropDown = document.getElementsByClassName("dropDown-menu");
    dropDown[0].classList.toggle("dropDown-active")
}

var slideIndex = 1;
var n = 1;
showSlides(slideIndex);
getCurrentSlide();
currentSlide(n);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    if (slideIndex == 4) {
        console.log(document.getElementsByClassName("next")[0].innerHTML);
        document.getElementsByClassName("next")[0].innerHTML = "Inscription";
    } else
        document.getElementsByClassName("next")[0].innerHTML = "Next &#10095;";

}

// Thumbnail data controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function getCurrentSlide() {
    return (slideIndex);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dot-active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " dot-active";
}