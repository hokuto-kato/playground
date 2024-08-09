export function toggleMenu() {
  const menuTrigger = document.querySelector("[data-menu-trigger]");
  const menuTarget = document.querySelector("[data-menu-target]");

  const initializeMenu = () => {
    menuTrigger?.classList.remove("_open");
    menuTarget?.classList.remove("_open");
    document.body.classList.remove("_noScroll");
  };

  menuTrigger?.addEventListener("click", () => {
    menuTrigger.classList.toggle("_open");
    menuTarget?.classList.toggle("_open");
    if (menuTrigger.classList.contains("_open")) {
      document.body.classList.add("_noScroll");
    } else {
      document.body.classList.remove("_noScroll");
    }
  });

  const mediaQuery = window.matchMedia("(min-width: 768px)");
  const handleMediaChange = (e: MediaQueryListEvent) => {
    if (e.matches) {
      initializeMenu();
    }
  };
  mediaQuery.addEventListener("change", handleMediaChange);
}
