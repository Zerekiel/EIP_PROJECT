window.onload = function (page) {
    $('form').submit(function (e) {
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