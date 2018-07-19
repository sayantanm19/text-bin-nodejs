// (function($){
//   $(function(){

//     $('.sidenav').sidenav();

//   }); // end of document ready
// })(jQuery); // end of jQuery name space


// Sidenav Instantiate
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);

});

// Copy Button
function copyText() {
  var copyText = document.getElementById("share");
  copyText.select();
  document.execCommand("copy");
}


