let param = new URL(window.location.href).searchParams.get('p');
let url = '{index}/assets/' + param;
let div = document.getElementById('pieces')
let initial = '';//param[0]

let imgs=[]
function onload (idx, json=0){
 idx -= 1 ;
 if (idx<=0) return 0;
 if(initial==''&&json!=0) {
  let name=json[idx-1]['name'];
  for(let i=0;isNaN(name[i]);i+=1){
   initial+=name[i];
  }
 }
 let init=initial+idx;
 let url_tail=init+'/'+init+'-thumb1.gif';
 let img = new Image();
 img.src = url+'/'+url_tail;
 //img.onload = function(){img_on_load(idx,img,json)};
 img_on_load(idx,img,json);
 return img;
}
function img_on_load(idx,img,json){
 img.setAttribute('class','gal');
 /*div.appendChild(img);*/
 /**/imgs.push(img);
let img2=new Image();
img2.style=img.style;
img2.setAttribute('class',img.getAttribute('class'));
img2.style.visibility='hidden';
img2.src=img.getAttribute('src').replace('thumb1','thumb2');
img2.onload=function(){img2_on_load(img,img2);};

 new onload(idx, json);
}
function img2_on_load(img,img2){
img.appendChild(img2);
img.addEventListener("mouseenter", function( event ) {mouseenter(event.target);}, false);
img2.addEventListener("mouseleave", function( event ) {mouseenter(event.target);}, false);
img.addEventListener("click", function( event ){
 let src=event.target.getAttribute('src');
 window.location.href = window.location.href. replace('/galleries/','/pieces/') +'/'+ src.slice(src.lastIndexOf('/'),src.lastIndexOf('-thumb2.gif')) ;
}, false)
img2.addEventListener("click", function( event ){
 let src=event.target.getAttribute('src');
 window.location.href = window.location.href. replace('/galleries/','/pieces/') +'/'+ src.slice(src.lastIndexOf('/'),src.lastIndexOf('-thumb2.gif')) ;
}, false)
}
function mouseenter(eold){
 //let eold=event.target;
 let enew=eold.firstChild;
 eold.style.visibility='hidden';
 enew.style.visibility='visible';
 eold.parentNode.replaceChild(enew, eold);
 enew.appendChild(eold);
}

function imgs_append(i=0){
 if(i>=imgs.length) return;
 imgs[i].onload=function(){div.appendChild(imgs[i]);imgs_append(i+1)};
 imgs[i].onerror=function(){div.appendChild(imgs[i]);imgs_append(i+1)};
 if (imgs[i].complete){div.appendChild(imgs[i]);imgs_append(i+1)}
}
//var img0=0;
function load_img_json(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let obj = JSON.parse( this.responseText );
     var img0 = onload( obj.length+1, obj ) ;
     /**/imgs_append();
     resize(img0);
     window.addEventListener('resize', function(){resize(img0)});
    }
  };
  xhttp.open("GET", "{index}/json/assets/" + param + "/list.json", true);
  xhttp.send();
}
load_img_json() ;

var r = document.querySelector(':root');
var max_w=600;
var min_w=400;
function resize(img0){
 let _w=img0.getBoundingClientRect().width;
 if (_w<min_w||_w>max_w){
  let win_w=window.innerWidth;
  let cnt=Math.ceil(win_w/max_w);
  r.style.setProperty('--width', (100/cnt)+'%');
 }
}
/*
var img0= onload(3);
resize(img0);
window.addEventListener('resize', function(){resize(img0)});
*/