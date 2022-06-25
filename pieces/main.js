let param = new URL(window.location.href).searchParams.get('p').replace('//','/');
let url = '{index}/assets/' + param;
let div = document.getElementById('pieces')

function onload(idx, len, json=0){
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
  onload(idx,len, json);
 };
 img.src = url+'/'+url_tail+json[0].name.slice(-4);//'.jpg';
}
//onload(0);

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  let obj = JSON.parse( this.responseText );
  onload(0, obj.length-2, obj);
//let ni=get_name(this.responseText);
//console.log(ni);
//let length= -1;
//onload(0, length-2);
 }
};
xhttp.open("GET", "https://api.github.com/repositories/507168360/contents/assets/" + param , true);
xhttp.send();

function get_name(html){
 let f1='<a class="js-navigation-open Link--primary" title="';
 let f2='"';
 let i1=html.indexOf(f1)+f1.length;
 let i2=html.indexOf(f2);
 let name=html.slice( i1, i2);
 return [name, i1]
}