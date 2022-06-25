let param = new URL(window.location.href).searchParams.get('p');
let url = '{index}/assets/' + param;
let div = document.getElementById('pieces')

function onload(idx){
 idx += 1 ;
 let zero = '00' + idx ;
 let url_tail=param.slice(param. lastIndexOf('/')+1)+'-'+zero.slice(-2);
 let img = new Image();
 img.onload = function(){
  img.style.width="100%";
  img.style.marginBottom="20px";
  div.appendChild(img);
  onload(idx);
 };
 img.src = url+'/'+url_tail+'.jpg';
}
onload(0);