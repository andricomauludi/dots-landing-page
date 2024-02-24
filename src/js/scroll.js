window.onscroll = function () {
  // var elementTarget = document.getElementById("buttoncoba");
  // if (window.scrollY > elementTarget.offsetTop + elementTarget.offsetHeight) {
  //   var title = this.document.getElementById("anim-mask");
  //   var scrollTop = document.documentElement.scrollTop * 0.5;
  //   title.style.transform = "translateX(" + scrollTop + "px)";
  // }

  var testDivFromTop = document.getElementById("container-scroll").offsetTop;
  var pageHeight = window.innerHeight;
  if (
    document.body.scrollTop > testDivFromTop - pageHeight ||
    document.documentElement.scrollTop > testDivFromTop - pageHeight
  ) {
    var title = this.document.getElementById("card-scroll");
    var scrollTop = document.documentElement.scrollTop * 0.1;
    title.style.transform =      "translateX(" + scrollTop + "px) translateY( -" + scrollTop + "px)";
    // title.style.transform =      "translateX(-" + scrollTop + "px) translateY( -" + scrollTop + "px)";
  }
};
