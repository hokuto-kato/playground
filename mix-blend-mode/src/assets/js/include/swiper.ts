import Swiper from "swiper";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const config = {
  modules: [Pagination, Autoplay, EffectFade],

  direction: "horizontal" as "horizontal" | "vertical",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  speed: 1000,

  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },

  pagination: {
    clickable: true,
  },
};

export const homeKvSwiper = new Swiper('[data-swiper="kv"] .swiper', {
  ...config,
  pagination: {
    ...config.pagination,
    el: '[data-swiper="kv"] .swiper-pagination',
  },
});

export const homeKoriyamaGuideSwiper = new Swiper('[data-swiper="mori-koriyama"] .swiper', {
  ...config,
  pagination: {
    ...config.pagination,
    el: '[data-swiper="mori-koriyama"] .swiper-pagination',
  },
});

export const homeFukushimaGuideSwiper = new Swiper('[data-swiper="mori-fukushima"] .swiper', {
  ...config,
  pagination: {
    ...config.pagination,
    el: '[data-swiper="mori-fukushima"] .swiper-pagination',
  },
});

export const homeMorisshuGuideSwiper = new Swiper('[data-swiper="mori-morisshu"] .swiper', {
  ...config,
  pagination: {
    ...config.pagination,
    el: '[data-swiper="mori-morisshu"] .swiper-pagination',
  },
});
