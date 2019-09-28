$(function() {
  var name = $("#username");
  var psswd = $("#psswd");

  //fct pour checker les values de name && password

  $("#connexion").on('click', function() {
    //var data = name.val() + "," + password.val();
    //console.log(data);

    console.log("test1");

    $.ajax({
      url: '/authJson/authJson',
      type: 'POST',
      cache: false,
      data: { username: "clement.deprost@epitech.eu", password: "test" },
      success: function(data) {
        console.log("test2");
        $(location).attr('href', '/home')
      },
      error: function() {
        console.log("petite chatte")
      }
    });

    //requete post sur mon back pour envoyer data
    //dans le back on transforme en json et on ping l'api
    //quand on reçoit le ping back api on ping le controller
      //si le controller reçoit le bon code on locate
      //si on reçoit pas le bon code hop pop-up d'unvalid password or username

  });
});
