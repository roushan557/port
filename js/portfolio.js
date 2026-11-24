(() => {
"use strict";
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".work-slider").forEach((element) => {
  const pause = element.querySelector(".slider-pause");
  let paused = reducedMotion.matches;
  const update = (slider) => {
    const current = slider.snapIndex + 1;
    const total = slider.snapGrid.length;
    element.querySelector("[data-slider-current]").textContent = String(
      current,
    ).padStart(2, "0");
    element.querySelector("[data-slider-total]").textContent = String(
      total,
    ).padStart(2, "0");
    element.querySelector(".slider-progress span").style.transform =
      `scaleX(${current / total})`;
  };
  const slider = new Swiper(element.querySelector(".swiper-container"), {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: reducedMotion.matches ? 0 : 300,
    loop: false,
    autoplay: reducedMotion.matches ? false : { delay: 6000 },
    navigation: {
      prevEl: element.querySelector(".slider-prev"),
      nextEl: element.querySelector(".slider-next"),
    },
    breakpoints: {
      700: { slidesPerView: 2, spaceBetween: 14 },
      1200: { slidesPerView: 3, spaceBetween: 20 },
    },
    on: {
      init() {
        update(this);
      },
      slideChange() {
        update(this);
      },
      resize() {
        update(this);
      },
    },
  });
  const setPauseLabel = () => {
    pause.setAttribute("aria-pressed", String(paused));
    pause.setAttribute("aria-label", `${paused ? "Play" : "Pause"} slideshow`);
    pause.firstElementChild.textContent = paused ? "▷" : "Ⅱ";
  };
  pause.addEventListener("click", () => {
    paused = !paused;
    paused ? slider.autoplay.stop() : slider.autoplay.start();
    setPauseLabel();
  });
  element.addEventListener("mouseenter", () => slider.autoplay.stop());
  element.addEventListener("mouseleave", () => {
    if (!paused && !element.contains(document.activeElement))
      slider.autoplay.start();
  });
  element.addEventListener("focusin", () => slider.autoplay.stop());
  element.addEventListener("focusout", () => {
    if (!paused && !element.matches(":hover")) slider.autoplay.start();
  });
  reducedMotion.addEventListener("change", () => {
    slider.params.speed = reducedMotion.matches ? 0 : 300;
    if (reducedMotion.matches) {
      paused = true;
      slider.autoplay.stop();
      setPauseLabel();
    }
  });
  setPauseLabel();
});

})();
