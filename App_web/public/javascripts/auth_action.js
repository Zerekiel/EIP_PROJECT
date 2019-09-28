$(function() {
  var name = $("#username");
  var password = $("#psswd");

  $("#connexion").on('click', function() {
    var data = name.val() + "," + password.val();
    console.log(data);
    $(location).attr('href', '/home');
  });
});
