window.onscroll = function () {
  // var elementTarget = document.getElementById("buttoncoba");
  // if (window.scrollY > elementTarget.offsetTop + elementTarget.offsetHeight) {
  //   var title = this.document.getElementById("anim-mask");
  //   var scrollTop = document.documentElement.scrollTop * 0.5;
  //   title.style.transform = "translateX(" + scrollTop + "px)";
  // }

  var testDivFromTop = document.getElementById("container-scroll").offsetTop;
  var testDivFromTop2 = document.getElementById("container-scroll2").offsetTop;
  var pageHeight = window.innerHeight;
  if (
    (document.documentElement.scrollTop > testDivFromTop - pageHeight ) &&  (document.documentElement.scrollTop < testDivFromTop2 + pageHeight ) && document.documentElement.scrollTop <=(testDivFromTop2-300)
    // && (document.body.scrollTop < testDivFromTop2 - pageHeight ||
    //   document.documentElement.scrollTop < testDivFromTop2 - pageHeight)
  ) {    
    console.log( (testDivFromTop2))
    var title = this.document.getElementById("card-scroll");
    var title2 = this.document.getElementById("card-scroll2");
    // var scrollTop = 1*2;
    var scrollTop = (((document.documentElement.scrollTop-testDivFromTop)*0.5));
    var scrollTop2 = (((document.documentElement.scrollTop-testDivFromTop)*0.3));

    title.style.transform =      "translateY(" + scrollTop + "px)";
    title2.style.transform =      "translateX(" + scrollTop2 + "px) translateY( " + scrollTop2 + "px)";
  }
};
