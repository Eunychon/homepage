let marks=document.getElementsByClassName("mark");
let strs=document.getElementsByClassName("str");

for (let i=0;i<marks.length;i++){
marks[i].addEventListener("mouseenter", function( event ) {
 strs[i].style.visibility='visible';
}, false);
marks[i].addEventListener("mouseleave", function( event ) {
 strs[i].style.visibility='hidden';
}, false);
}