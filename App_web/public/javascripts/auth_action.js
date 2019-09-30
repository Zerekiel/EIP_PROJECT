$(function() {
  var name = $("#username");
  var psswd = $("#psswd");
  var textStatus = "Wrond Id or Password";

  //fct pour checker les values de name && password

  $("#connexion").on('click', function() {
    //var data = name.val() + "," + password.val();
    //console.log(data);

    console.log("test34");

    $.ajax({
      //url: '/authJson/authJson',
      url: 'http://healthsafe-app.herokuapp.com/api/connection',
      type: 'POST',
      cache: false,
      data: { userName: "test", password: "test" },
      success: function(data) {
        console.log("test");
        $(location).attr('href', '/home')
      },
      error: function(jqXHR, textStatus, err) {
        alert('text status '+textStatus+', err '+err)
      }
    });
  });
});
