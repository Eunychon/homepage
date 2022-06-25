let div = document.getElementById("main");

loadNewElement( div, "div", "{index}/main/logo/logo.html", true, function(){
 loadNewElement( div, "script", "{index}/main/logo/logo.js", true ) ;
}) ;
/*
loadNewElement( div, "div", "{index}/main/gallary/gallary.html", true, function(){
  loadNewElement( div, "div", "{index}/main/gallary/tangle.html", true, function(){
   loadNewElement( div, "script", "{index}/main/gallary/tangle.js", false );
   loadNewElement( div, "script", "{index}/main/gallary/gallary.js", true );
  }) ;
}) ;
*/