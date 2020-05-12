window.onload == function(page) {
    $('form').submit(function(e) {
        e.preventDefault();
        var Name = $(e.target)[0][0].value;
        var Mail = $(e.target)[0][1].value;
        var Gender = $(e.target)[0][2].value;
        var id_medecin = $(e.target)[0][3].value;
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "joan.falsimagne@epitech.eu",
            Password: "88BA206BAA3FEC5AFDFC33B06E3E9EFDD958",
            To: "jojo.ff.91@gmail.com,contact.healthsafe@gmail.com",
            From: 'joan.falsimagne@epitech.eu',
            Subject: Gender + ' ' + Name + ', ' + Mail,
            Body: Gender + ' ' + Name + ' ' + ' voudrai effectuer une inscription avec comme numero: ' + id_medecin
        }).then(message => alert(message));
    });
}