
function updateScroll(event) {
    if ( document. body. scrollTop == 0 ) {

    } else {

    }
}

/////////////////////////////////
let gallary = document.getElementById("gallary") ;
let svg = document.getElementById("voidsvg") ;
class GallaryImg {
  static w_cnt = 3 ;
  static gallary_padding = 10 ;
  static gallary_top = -60 ;

  static idx_static = 0 ;
  constructor(img_url=0) {
    this.idx = GallaryImg.idx_static ;
    GallaryImg.idx_static += 1;

    this.width = 0;
    this.height = 2;
    this.ratio = img_url[1];

    this.element = 0 ;
    this.url = img_url[0] ;
    this.loadImg() ;

    this.kf_name = 'kf' + this.idx;
    //
    let rect = this.element.getBoundingClientRect() ;
    //
    this.ele_gallary = document. createElement('div');
    //
    this.ele_gallary.style.position= "relative";
    this.ele_gallary.style.float = "left";
    this.ele_gallary.style.top = GallaryImg.gallary_top + 'px' ;
    this.ele_gallary.style.left = '0' ;
    this.ele_gallary.style.width = "calc(" + 100 / 3 + '% - ' + (GallaryImg.gallary_padding*2) + "px)" ;
    this.ele_gallary.style.height = "calc(" + 100 / 3 * this.ratio + 'vw - ' + (GallaryImg.gallary_padding*2) + "px)" ;
    this.ele_gallary.style.padding = GallaryImg.gallary_padding + 'px' ;
    this.ele_gallary.style.background = 'none' ;
    gallary. appendChild(this.ele_gallary);
    //
    /*this.positionTop();*/
    this.positionGallary();
  }
  loadImg() {
    this.element = svg.cloneNode(true) ;
    this.element. visibility = 'visible' ;
    gallary. appendChild(this.element);
    let img = this.element.lastElementChild;
    img.setAttribute('href', '{index}' + this.url);
    // test below
    this.width = 100 / GallaryImg.w_cnt ;
    this.element.style.width= this.width + "vw";
    this.height = this.width * this.ratio ;
    this.element.style.height= this.height + "vw";

    var border = 0 ;
    this.element.style.width="calc(" + this.width + "vw - " + border*2 + "px)" ;

    img.addEventListener("mouseenter", function( event ) {
     event.target.setAttribute('href', event.target.getAttribute('href').replace('thumb1','thumb2'));
    }, false);
    img.addEventListener("mouseleave", function( event ) {
     event.target.setAttribute('href', event.target.getAttribute('href').replace('thumb2','thumb1'));
    }, false);
    img.addEventListener("click", function( event ) {
     let str = event.target.getAttribute('href');
     let io = '/assets/';
     let href = str.slice(str.indexOf(io),str.lastIndexOf('/'));
     window.location.href = '{index}'+href. replace(io,'/pieces/?p=');
    }, false);
  }
  positionTop(){
    this.element.style.visibility = "hidden";
    this.element.style.position= "absolute";
    this.element.style.top= -this.height + "vw" ; // todo *** window's height
    this.element.style.left= this.ele_gallary.getBoundingClientRect().left + window.scrollX + 'px' ;
    this.element.style.width= this.ele_gallary.style.width;
    this.element.style.height= this.ele_gallary.style.height;
  }
  //
  positionGallary( _top=0 ){
/*
    this.positionTop() ;
    this. positionEle( this.element, this.ele_gallary ) ; */
    GallaryImg.appendGallary(this.element, this.ele_gallary)
  }
  ///////////////////////////////////
  positionEle(ele_from, ele_to) {
    ele_from.style.visibility = "visible";
    this.makeKeyFramesStatic(ele_from, ele_to) ;
    var element_to = ele_to ;
    ele_from.addEventListener("animationend", function(){ GallaryImg.appendGallary(this,element_to) });
  }
  static appendGallary( ele_from, ele_to ){
     ele_from.style.position= "sticky";
     ele_from.style.float = "left";
     ele_from.style.width = '100%' ;
     ele_from.style.height = '100%' ;
     ele_from.style.top = '0' ;
     ele_from.style.left = '0' ;
     ele_from.style.animation = '' ;
     ele_to. appendChild( ele_from ) ;
     /*new TangleFilter( this );*/
  }
  makeKeyFramesStatic( from_ele, to_ele ){
    let sudo = document. createElement('div');
    let rect = 0;

    rect = from_ele.getBoundingClientRect() ;
    sudo.style.position= "absolute";
    sudo.style.top = rect.top + window.scrollY + 'px' ;
    sudo.style.left = rect.left + window.scrollX + 'px' ;
    sudo.style.width = rect.width + 'px' ;
    sudo.style.height = rect.height + 'px' ;
    let from = sudo.getAttribute("style") ;

    rect = to_ele.getBoundingClientRect() ;
    sudo.style.position= "absolute";
    sudo.style.top = rect.top + window.scrollY + 'px' ;
    sudo.style.left = rect.left + window.scrollX + GallaryImg.gallary_padding + 'px' ;
    sudo.style.width = to_ele.style.width;
    sudo.style.height = to_ele.style.height;
    let to = sudo.getAttribute("style") ;

    sudo. remove() ;
    document.body.appendChild( from_ele );
    this.makeKeyFrames( from, to );
  }

  makeKeyFrames( from, to ){
   //
   try{
   let style = document.getElementById( this.kf_name ) ;
   style. remove() ;
   } catch (e){ }
   //
   let style = document.createElement('style');
   style.id = this.kf_name ;
   style.type = 'text/css';

   var keyFrames = '@keyframes {name} {from {{from}} to {{to}} }';
   style.innerHTML = keyFrames. replace('{name}', this.kf_name). replace('{from}', from). replace('{to}', to);
   document.getElementsByTagName('head')[0].appendChild(style);
   //
   this.element.style.animation= this.kf_name + " .25s linear 0s 1 normal"; // forwards
  }
}

/////////////////////////////////
class Gallary {
  static ImgArray = [] ;
  static idx = 3 ;
  static on_click = false ;
  constructor(csv=0) {
   if (csv != 0){
     Gallary.idx = csv.length-2 ;
   }
   for (let i = 0; i < Gallary.idx; i++) {
     Gallary. ImgArray. push(new GallaryImg([csv[i+2], csv[1]/csv[0]]) ) ;
   }
   Gallary.idx -= 1 ;

   window.addEventListener("click", function(event) {
     Gallary. on_click=true ;
   });
   /*window.requestAnimationFrame(Gallary.step);*/
  }
  static step(timestamp){
   //if ( document. documentElement. scrollTop == 0 ) { // && stack not fulled
    Gallary.step_on_top();
    window.requestAnimationFrame(Gallary.step);
   //} else { // if ( && gallary_on_move )
   // Gallary.step_not_top();
   //}
  }
  static step_on_top(){
   //if ( Gallary. on_click ) {
   if (true){
    if ( Gallary.idx >= 0 ) {
     Gallary. ImgArray[ Gallary.idx ]. positionGallary();
     Gallary.idx -= 1 ;
    }
    Gallary. on_click = false ;
   }
  }
  static step_not_top(){
   for (let i=0; i<GallaryImg.idx_static; i++) {
    Gallary.ImgArray[i]. positionGallary();
   }
  }
}

function load_img_json(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     //let obj = JSON.parse( this.responseText );
     let obj = this.responseText.replaceAll('\n','').replaceAll('\t','').replaceAll(' ','').split(',');
     new Gallary( obj ) ;
    }
  };
  xhttp.open("GET", '{index}' + "/assets/main.csv", true);
  xhttp.send();
}
load_img_json() ;