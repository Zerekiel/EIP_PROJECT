$(function() {

  $("#scan").on('click', function() {
    $(location).attr('href', '/scan');
  });

  $("#mobile").on('click', function() {
    $(location).attr('href', '/info');
  });

/*
  $("#regalges").on('cick', function () {
    $(location).attr('href', '/reglages');
  });
*/

  $("#deconnexion").on('click', function() {
    $(location).attr('href', '/');
  });

});
