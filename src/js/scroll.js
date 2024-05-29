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
    // $(".statistic-counter").each(function () {
    //   $(this)
    //     .prop("Counter", 0)
    //     .animate(
    //       {
    //         Counter: $(this).text(),
    //       },
    //       {
    //         duration: 4000,
    //         easing: "swing",
    //         step: function (now) {
    //           $(this).text(Math.ceil(now));
    //         },
    //       }
    //     );
    // });
  }
};

const duration = 2000; // Total duration in milliseconds for the counters to finish

function updateCounter(target, counterDiv) {
  let count = 0;
  const increment = target / (duration / 10); // Number to increment each time (adjusting for interval of 10ms)
  function incrementCounter() {
    if (count < target) {
      count += increment;
      if (count > target) count = target; // Ensure count doesn't exceed target
      counterDiv.textContent = Math.ceil(count);
      setTimeout(incrementCounter, 10); // Update every 10ms
    }
  }
  incrementCounter();
}

function startAllCounters() {
  let counterDivs = document.querySelectorAll(".counter");

  counterDivs.forEach((counterDiv) => {
    let target = parseInt(counterDiv.getAttribute("data-target"), 10);
    counterDiv.textContent = 0; // Set initial value
    updateCounter(target, counterDiv);
  });
}

let observer = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    startAllCounters();
    entries.forEach((entry) => observer.unobserve(entry.target)); // Stop observing once the counters have started
  }
});

window.onload = function () {
  let counterContainers = document.querySelectorAll(".counter-container");
  counterContainers.forEach((container) => {
    observer.observe(container);
  });
};
