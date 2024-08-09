export function headerHandle() {
  const header = document.querySelector("[data-header]");
  const trigger = document.querySelector("[data-header-trigger]");
  const swiperKv = document.querySelector('[data-swiper="kv"]');

  if (!header || !trigger) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!swiperKv) return;

        const swiperRect = swiperKv.getBoundingClientRect();
        const swiperTop = swiperRect.top + window.scrollY;
        const swiperBottom = swiperRect.bottom + window.scrollY;

        if (entry.isIntersecting) {
          header.classList.remove("-scrolled");
        } else {
          // data-swiperの高さの範囲内にブラウザの上端がある場合は発火しない
          if (window.scrollY >= swiperTop && window.scrollY <= swiperBottom) return;
          header.classList.add("-scrolled");
        }
      });
    },
    { threshold: 0 },
  );

  observer.observe(trigger);
}
