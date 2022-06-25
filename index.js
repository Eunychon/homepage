loadDoc(document.head,"./head/head.html",true );
var body = document.body ;
loadDoc( body, "./header/header.html", false, function(){
 loadNewElement( body, "script", "./header/header.js", true ) ;
}) ;
loadNewElement( body, "div", "main.html", true, function(){
 loadNewElement( body, "script", "main.js", true ) ;
}) ;
loadNewElement( body, "div", "./footer/footer.html", true ) ;