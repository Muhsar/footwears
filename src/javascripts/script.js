import $ from 'jquery'

$(document).ready(function(){
  $("#mySearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myDiv *").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
 