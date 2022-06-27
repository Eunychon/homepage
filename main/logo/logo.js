//let header = document.getElementById("header") ;
let logo_ = document.getElementById("logo_") ;
let logo_box = document.getElementById("logo_box") ;
let margin=22.7;//45

//header.style.position='fixed';
//window.scroll(0,0);

var slide_left=100;

function move(){
   let style = document.createElement('style');
   style.type = 'text/css';

   let name = 'moveleft';
   var keyFrames = '@keyframes {name} {from {{from}} to {{to}} }';
   style.innerHTML = keyFrames. replace('{name}', name). replace('{from}', "left:"+(-slide_left)+"%;"). replace('{to}', "left:"+(-slide_left-100)+"%;" );
   document.getElementsByTagName('head')[0].appendChild(style);
   //
   logo_box.addEventListener("animationend", function(){ 
   this.appendChild(this. firstChild); 
   let style=logo_box.getAttribute('style');
   logo_box.removeAttribute('style');
   logo_box.offsetWidth;
   logo_box.style=style;
});
   logo_box.style.animation= name + " 1s ease-out 1s 1 forwards"; //normal
}
move()

function new_img(url, cnt){
 let img=new Image();
 img.src = '{index}'+url;
 img.style.width="98%";
 img.style.heiht="100%";
 let div=document.createElement('div');
 div.appendChild(img);
 div.style.width=100/cnt+"%";
 div.style.heiht="100%";
 div.style.float="left";
 logo_box.appendChild(div);


let img2=new Image();
img2.style=img.getAttribute('style');
img2.style.visibility='hidden';
img2.src=img.getAttribute('src').replace('thumb1','thumb2');

img.appendChild(img2);
img.addEventListener("mouseenter", function( event ) {mouseenter(event.target);}, false);
img2.addEventListener("mouseleave", function( event ) {mouseenter(event.target);}, false);
img.addEventListener("click", function( event ){ mouseclick(event.target);}, false);
img2.addEventListener("click", function( event ){ mouseclick(event.target);}, false);

}


function mouseenter(eold){
 //let eold=event.target;
 let enew=eold.firstChild;
 eold.style.visibility='hidden';
 enew.style.visibility='visible';
 eold.parentNode.replaceChild(enew, eold);
 enew.appendChild(eold);
}
function mouseclick(img) {
     let str = img.getAttribute('src');
     let io = '/assets/';
     let href = str.slice(str.indexOf(io),str.lastIndexOf('/'));
     window.location.href = '{index}'+href. replace(io,'/pieces/?p=');
}


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   let obj = this.responseText.replaceAll('\n','').replaceAll('\t','').replaceAll(' ','').split(',');
   logo_box.style.width='calc('+100*obj.length+ '% + ' + 0*obj.length +'px)';
   for ( let o of obj )
    new_img( o, obj.length );
  }
};
xhttp.open("GET", '{index}/assets/logo.csv', true);
xhttp.send();