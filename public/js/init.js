// (function($){
//   $(function(){

//     $('.sidenav').sidenav();

//   }); // end of document ready
// })(jQuery); // end of jQuery name space

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
  //var instance = M.Sidenav.getInstance(elem);
});

function copyText() {
  var copyText = document.getElementById("share");
  copyText.select();
  document.execCommand("copy");
}


