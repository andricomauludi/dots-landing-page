// $(document).ready(function(){

//     $('.statistic-counter').counterUp({
//                  delay: 10,
//                  time: 2000
//              });

//  });

$(document).ready(function () {
  
  window.onscroll = function() {myFunction()};

  function myFunction() {
      var testDivFromTop = document.getElementById("counter-scroll").offsetTop;
      var pageHeight =  window.innerHeight;
      if ( document.documentElement.scrollTop > testDivFromTop - pageHeight ) {              
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
              $('.statistic-counter').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            }); 
      }
  }
  

});
