window.onscroll = function () {
  // var elementTarget = document.getElementById("buttoncoba");
  // if (window.scrollY > elementTarget.offsetTop + elementTarget.offsetHeight) {
  //   var title = this.document.getElementById("anim-mask");
  //   var scrollTop = document.documentElement.scrollTop * 0.5;
  //   title.style.transform = "translateX(" + scrollTop + "px)";
  // }

  var testDivFromTop = document.getElementById("container-scroll").offsetTop;
  var testDivFromTop2 = document.getElementById("container-scroll2").offsetTop;
  var testDivFromTop3 = document.getElementById("container-scroll3").offsetTop;
  var testDivFromTop4 = document.getElementById("container-scroll4").offsetTop;
  var pageHeight = window.innerHeight;
  if (
    document.documentElement.scrollTop > testDivFromTop - pageHeight &&
    document.documentElement.scrollTop < testDivFromTop2 + pageHeight &&
    document.documentElement.scrollTop <= testDivFromTop2 - 100
    // && (document.body.scrollTop < testDivFromTop2 - pageHeight ||
    //   document.documentElement.scrollTop < testDivFromTop2 - pageHeight)
  ) {
    var title = this.document.getElementById("card-scroll");
    var title2 = this.document.getElementById("card-scroll2");
    // var scrollTop = 1*2;
    var scrollTop = (document.documentElement.scrollTop - testDivFromTop) * 0.5;
    var scrollTop2 =
      (document.documentElement.scrollTop - testDivFromTop) * 0.3;

    title.style.transform = "translateY(" + scrollTop + "px)";
    title2.style.transform =
      "translateX(" + scrollTop2 + "px) translateY( " + scrollTop2 + "px)";
  }
  if (
    document.documentElement.scrollTop > testDivFromTop3 - pageHeight &&
    document.documentElement.scrollTop < testDivFromTop4 + pageHeight &&
    document.documentElement.scrollTop <= testDivFromTop4 - 100
    // && (document.body.scrollTop < testDivFromTop2 - pageHeight ||
    //   document.documentElement.scrollTop < testDivFromTop2 - pageHeight)
  ) {
    var title = this.document.getElementById("card-scroll3");
    var title2 = this.document.getElementById("card-scroll4");
    // var scrollTop = 1*2;
    var scrollTop =
      (document.documentElement.scrollTop - testDivFromTop3) * 0.5;
    var scrollTop2 =
      (document.documentElement.scrollTop - testDivFromTop4) * 0.3;

    title.style.transform = "translateY(" + scrollTop + "px)";
    title2.style.transform =
      "translateX(" + -scrollTop2 + "px) translateY( " + scrollTop2 + "px)";
  }

  // -------------------------------
  // COUNTER
  // -------------------------------

  var testDivFromTop = document.getElementById("counter-scroll").offsetTop;
  var pageHeight = window.innerHeight;
  if (document.documentElement.scrollTop > testDivFromTop - pageHeight) {
    // $(".statistic-counter").each(function () {
    //   $(this)
    //     .prop("Counter", 0)
    //     .animate(
    //       {
    //         Counter: $(this).text(),
    //       },
    //       {
    //         duration: 3000,
    //         easing: "swing",
    //         step: function (now) {
    //           $(this).text(Math.ceil(now));
    //         },
    //       }
    //     );
    // });
    $(".statistic-counter").each(function () {
      $(this)
        .prop("Counter", 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 4000,
            easing: "swing",
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          }
        );
    });
  }
};
