export function scrollToTop() {
  const button = document.querySelector("[data-to-top]");

  if (!button) return;
  button.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
