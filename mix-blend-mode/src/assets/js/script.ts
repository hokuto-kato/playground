import "./include/webfonts";
import { toggleMenu } from "./include/menu";
import { homeKvSwiper } from "./include/swiper";
import { headerHandle } from "./include/headerHandle";

const menuEl = document.querySelector("[data-menu-trigger]");
const swiperKvEl = document.querySelector('[data-swiper="kv"]');
const headerTriggerEl = document.querySelector("[data-header-trigger]");

document.addEventListener("DOMContentLoaded", () => {
  menuEl && toggleMenu();
  swiperKvEl && homeKvSwiper;
  headerTriggerEl && headerHandle();
});
