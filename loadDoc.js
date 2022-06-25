function loadDoc( element, url, async=false, then=false ) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     element. innerHTML += this.responseText. replaceAll('{index}','/homepage') ;
     if ( then != false ) then() ;
    }
  };
  xhttp.open("GET", url, async);
  xhttp.send();
}

function loadNewElement(element, type_str, url, async=false, then=false) {
  let new_element = document. createElement(type_str);
  //if ( type_str == "script" )
  //  new_element. src = url ;
  //else
    loadDoc( new_element, url, async, then ) ;
  element. appendChild( new_element ) ;

  return new_element ;
}