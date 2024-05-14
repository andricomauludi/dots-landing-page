(function () {
  const win = window;
  const doc = document.documentElement;

  doc.classList.remove("no-js");
  doc.classList.add("js");

  // Reveal animations
  if (document.body.classList.contains("has-animations")) {
    /* global ScrollReveal */
    const sr = (window.sr = ScrollReveal());

    sr.reveal(".feature", {
      duration: 600,
      distance: "20px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "right",
      interval: 100,
    });
    sr.reveal(".feature2", {
      duration: 3000,
      distance: "20px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "right",
      interval: 100,
    });
    sr.reveal(".featurerevealing", {
      duration: 600,
      distance: "20px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "right",
      interval: 100,
    });
    sr.reveal(".featurerevealingleft", {
      duration: 600,
      distance: "20px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "left",
      interval: 100,
    });
    sr.reveal(".imagerevealing", {
      duration: 1000,
      distance: "20px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "top",
      interval: 100,
    });

    sr.reveal(".media-canvas", {
      duration: 600,
      scale: ".95",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      viewFactor: 0.5,
    });
  }

  // Wait that device mockup has loaded before displaying
  const deviceMockup = document.querySelector(".device-mockup");

  function deviceMockupLoaded() {
    deviceMockup.classList.add("has-loaded");
  }

  if (deviceMockup.complete) {
    deviceMockupLoaded();
  } else {
    deviceMockup.addEventListener("load", deviceMockupLoaded);
  }

  // // Features title adjustment
  // const featuresSection = document.querySelector(".features");
  // const featuresTitle = featuresSection.querySelector(".section-title");
  // const firstFeature = document.querySelector(".feature-inner");

  // featuresTitlePos();
  // win.addEventListener("resize", featuresTitlePos);

  // function featuresTitlePos() {
  //   let featuresSectionLeft = featuresSection
  //     .querySelector(".features-inner")
  //     .getBoundingClientRect().left;
  //   let firstFeatureLeft = firstFeature.getBoundingClientRect().left;
  //   let featuresTitleOffset = parseInt(firstFeatureLeft - featuresSectionLeft);
  //   if (firstFeatureLeft > featuresSectionLeft) {
  //     featuresTitle.style.marginLeft = `${featuresTitleOffset}px`;
  //   } else {
  //     featuresTitle.style.marginLeft = 0;
  //   }
  // }

  // Moving objects
  const movingObjects = document.querySelectorAll(".is-moving-object");

  // Throttling
  function throttle(func, milliseconds) {
    let lastEventTimestamp = null;
    let limit = milliseconds;

    return (...args) => {
      let now = Date.now();

      if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
        lastEventTimestamp = now;
        func.apply(this, args);
      }
    };
  }

  // Init vars
  let mouseX = 0;
  let mouseY = 0;
  let scrollY = 0;
  let coordinateX = 0;
  let coordinateY = 0;
  let winW = doc.clientWidth;
  let winH = doc.clientHeight;

  // Move Objects
  function moveObjects(e, object) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    scrollY = win.scrollY;
    coordinateX = winW / 2 - mouseX;
    coordinateY = winH / 2 - (mouseY - scrollY);

    for (let i = 0; i < object.length; i++) {
      const translatingFactor =
        object[i].getAttribute("data-translating-factor") || 20;
      const rotatingFactor =
        object[i].getAttribute("data-rotating-factor") || 20;
      const perspective = object[i].getAttribute("data-perspective") || 500;
      let tranformProperty = [];

      if (object[i].classList.contains("is-translating")) {
        tranformProperty.push(
          "translate(" +
            coordinateX / translatingFactor +
            "px, " +
            coordinateY / translatingFactor +
            "px)"
        );
      }

      if (object[i].classList.contains("is-rotating")) {
        tranformProperty.push(
          "perspective(" +
            perspective +
            "px) rotateY(" +
            -coordinateX / rotatingFactor +
            "deg) rotateX(" +
            coordinateY / rotatingFactor +
            "deg)"
        );
      }

      if (
        object[i].classList.contains("is-translating") ||
        object[i].classList.contains("is-rotating")
      ) {
        tranformProperty = tranformProperty.join(" ");

        object[i].style.transform = tranformProperty;
        object[i].style.transition = "transform 1s ease-out";
        object[i].style.transformStyle = "preserve-3d";
        object[i].style.backfaceVisibility = "hidden";
      }
    }
  }

  // Particle animation
  let Bubble = function (parentNode) {
    let self = this;
    self.parentNode = parentNode;
    self.getCanvasSize();
    window.addEventListener("resize", function () {
      self.getCanvasSize();
    });
    self.mouseX = 0;
    self.mouseY = 0;
    window.addEventListener("mousemove", function (e) {
      self.mouseX = e.clientX;
      self.mouseY = e.clientY;
    });
    self.randomise();
  };

  Bubble.prototype.getCanvasSize = function () {
    let self = this;
    self.canvasWidth = self.parentNode.clientWidth;
    self.canvasHeight = self.parentNode.clientHeight;
  };

  Bubble.prototype.generateDecimalBetween = function (min, max) {
    return (Math.random() * (min - max) + max).toFixed(2);
  };

  Bubble.prototype.update = function () {
    let self = this;
    self.translateX = self.translateX - self.movementX;
    self.translateY = self.translateY - self.movementY;
    self.posX +=
      (self.mouseX / (self.staticity / self.magnetism) - self.posX) /
      self.smoothFactor;
    self.posY +=
      (self.mouseY / (self.staticity / self.magnetism) - self.posY) /
      self.smoothFactor;

    if (
      self.translateY + self.posY < 0 ||
      self.translateX + self.posX < 0 ||
      self.translateX + self.posX > self.canvasWidth
    ) {
      self.randomise();
      self.translateY = self.canvasHeight;
    }
  };

  Bubble.prototype.randomise = function () {
    let self = this;
    self.colors = [
      // "114, 85, 139",
      // "254, 254, 194",
      // "254, 254, 194",
      // "254, 254, 194",
      // "243, 244, 255",
      // "254, 254, 194",
      "248, 242, 237", //broken white
      "180, 180, 180", //grey
      "255, 255, 255", //white
    ];
    self.velocity = 30; // Bubble levitation velocity (the higher the slower)
    self.smoothFactor = 50; // The higher, the smoother
    self.staticity = 30; // Increase value to make bubbles move slower on mousemove
    self.magnetism = 0.1 + Math.random() * 4;
    self.color = self.colors[Math.floor(Math.random() * self.colors.length)];
    self.alpha = self.generateDecimalBetween(5, 10) / 10;
    self.size = self.generateDecimalBetween(1, 4);
    self.posX = 0;
    self.posY = 0;
    self.movementX = self.generateDecimalBetween(-2, 2) / self.velocity;
    self.movementY = self.generateDecimalBetween(1, 20) / self.velocity;
    self.translateX = self.generateDecimalBetween(0, self.canvasWidth);
    self.translateY = self.generateDecimalBetween(0, self.canvasHeight);
  };

  let Background = function (selector) {
    let self = this;
    self.canvas = document.getElementById("hero-particles");
    self.ctx = this.canvas.getContext("2d");
    self.dpr = window.devicePixelRatio;
  };

  Background.prototype.start = function () {
    let self = this;
    self.canvasSize();
    window.addEventListener("resize", function () {
      self.canvasSize();
    });
    self.bubblesList = [];
    self.generateBubbles();
    self.animate();
  };

  Background.prototype.canvasSize = function () {
    let self = this;
    self.container = self.canvas.parentNode;
    // Determine window width and height
    self.w = self.container.offsetWidth;
    self.h = self.container.offsetHeight;
    self.wdpi = self.w * self.dpr;
    self.hdpi = self.h * self.dpr;
    // Set canvas width and height
    self.canvas.width = self.wdpi;
    self.canvas.height = self.hdpi;
    // Set width and height attributes
    self.canvas.style.width = self.w + "px";
    self.canvas.style.height = self.h + "px";
    // Scale down canvas
    self.ctx.scale(self.dpr, self.dpr);
  };

  Background.prototype.animate = function () {
    let self = this;
    self.ctx.clearRect(0, 0, self.canvas.clientWidth, self.canvas.clientHeight);
    self.bubblesList.forEach(function (bubble) {
      bubble.update();
      self.ctx.translate(bubble.translateX, bubble.translateY);
      self.ctx.beginPath();
      self.ctx.arc(bubble.posX, bubble.posY, bubble.size, 0, 2 * Math.PI);
      self.ctx.fillStyle = "rgba(" + bubble.color + "," + bubble.alpha + ")";
      self.ctx.fill();
      self.ctx.setTransform(self.dpr, 0, 0, self.dpr, 0, 0);
    });
    /* global requestAnimationFrame */
    requestAnimationFrame(this.animate.bind(this));
  };

  Background.prototype.addBubble = function (bubble) {
    return this.bubblesList.push(bubble);
  };

  Background.prototype.generateBubbles = function () {
    let self = this;
    for (let i = 0; i < self.bubbleDensity(); i++) {
      self.addBubble(new Bubble(self.canvas.parentNode));
    }
  };

  Background.prototype.bubbleDensity = function () {
    return 400;
  };

  window.addEventListener("load", function () {
    const heroParticles = new Background("hero-particles");
    const footerParticles = new Background("footer-particles");
    heroParticles.start();
    footerParticles.start();
  });

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // Call function with throttling
  if (movingObjects) {
    win.addEventListener(
      "mousemove",
      throttle(function (e) {
        moveObjects(e, movingObjects);
      }, 150)
    );
  }
})();
