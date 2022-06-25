let param = new URL(window.location.href).searchParams.get('p').replace('//','/');
let url = '{index}/assets/' + param;
let div = document.getElementById('pieces')

function onload(idx, len){
 idx += 1 ;
 if(idx>len) return;
 let zero = '00' + idx ;
 let url_tail=param.slice(param. lastIndexOf('/')+1)+'-'+zero.slice(-2);
 let img = new Image();
 //img.onload = function()
 {
  img.style.width="100%";
  img.style.marginBottom="20px";
  div.appendChild(img);
  onload(idx,len);
 };
 img.src = url+'/'+url_tail+'.jpg';
}
//onload(0);

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  let obj = JSON.parse( this.responseText );
  onload(0, obj.length-2);
 }
};
xhttp.open("GET", "https://api.github.com/repositories/507168360/contents/assets/" + param , true);
xhttp.send();