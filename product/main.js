function hidden(){
let imgs = document.getElementsByClassName("subject");
let subjects = document.getElementsByClassName("subjects");
for (let i=0;i<imgs.length;i+=1){
imgs[i].addEventListener("mouseenter", function( event ) {
 try{
  for(let j=0;j<subjects.length;j+=1)
   subjects[j].style.visibility="hidden";
  subjects[i].style.visibility="visible";
 }catch(e){}
}, false);
imgs[i].addEventListener("mouseleave", function( event ) {
}, false);
}
}

var catalog=document.getElementById('catalog');
function make_subject(idx, name){
 let a=document.createElement('a');
 let img=new Image();
 a.appendChild(img);
 let div=document.createElement('div');
 div.appendChild(a);
 div.setAttribute('class','catalog');
 img.setAttribute('class','subject');
 img.setAttribute('alt',name);
 img.src= "{index}/"+idx.path ;

 catalog.appendChild(div);

 let div2=document.createElement('div');
 div2.setAttribute('class', 'subjects');
 div.appendChild(div2);
 return div2;
}

function make_subject2(idx, name){
 let a=document.createElement('a');
 let img=new Image();
 a.appendChild(img);
 let div=document.createElement('div');
 div.appendChild(a);
 img.setAttribute('class','subject2');
 img.setAttribute('alt',name);
 img.src= "{index}/"+idx.path ;
 a.setAttribute('href','{index}/galleries/?p='+name);

 return div;
}

function make(arr){
 for(let i=0;i<arr.length;i+=1){
  let a=arr[i].name.split('.');
  let num1=1*a[0];
  if(num1==0){
   arr[i]=make_subject(arr[i],a[2]);
  }else{
   arr[num1-1].appendChild( make_subject2(arr[i],a[2]) );
  }
 }
}

{
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let obj = JSON.parse(this.responseText) ;
make(obj);
hidden();
    }
  };
  xhttp.open("GET", "https://api.github.com/repositories/507168360/contents/assets/product", true);
  xhttp.send();
}
