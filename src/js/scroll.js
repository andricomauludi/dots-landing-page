window.onscroll = function() {
    var title = this.document.getElementById("anim-mask");
    var scrollTop = document.documentElement.scrollTop * 0.5;
    title.style.transform =
      "translateX(-" + scrollTop + "px) translateY(-" + scrollTop + "px)";
  };