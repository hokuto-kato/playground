export function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const headerHeight = document.querySelector("[data-header]")?.clientHeight || 0;

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href")?.substring(1) || "";
      const targetElement = targetId === "top" ? document.body : document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetId === "top" ? 0 : targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });
}
