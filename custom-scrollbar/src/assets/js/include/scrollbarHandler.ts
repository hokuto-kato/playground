export const initScrollbar = () => {
  const contents = document.querySelectorAll(".canvastext");
  const scrollbars = document.querySelectorAll(".scrollbarvertical");

  if (contents.length !== scrollbars.length) return;

  contents.forEach((content, index) => {
    const scrollbar = scrollbars[index];
    const thumb = scrollbar?.querySelector(".buttonscrollbarupdown") as HTMLElement;

    if (!content || !scrollbar || !thumb) return;

    // Adjust the height of the scrollbar according to the height of the content
    const updateScrollbarHeight = () => {
      const scrollbarHeight = (content.clientHeight / content.scrollHeight) * scrollbar.clientHeight;
      thumb.style.height = `${scrollbarHeight}px`;
    };

    // Monitor changes in the height of the content
    const observer = new MutationObserver(updateScrollbarHeight);
    observer.observe(content, { childList: true, subtree: true });

    // Drag functionality for the thumb
    let isDragging = false;
    let startY: number;
    let startTop: number;

    // Update the height of the scrollbar when initializing
    updateScrollbarHeight();

    // Move the thumb according to the scroll of the content
    content.addEventListener("scroll", () => {
      const scrollPercentage = content.scrollTop / (content.scrollHeight - content.clientHeight);
      const thumbPosition = scrollPercentage * (scrollbar.clientHeight - thumb.clientHeight);
      thumb.style.top = `${thumbPosition}px`;
    });

    thumb.addEventListener("mousedown", (e) => {
      isDragging = true;
      startY = e.clientY;
      startTop = parseInt(getComputedStyle(thumb).top, 10);
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      const newTop = startTop + deltaY;
      const maxTop = scrollbar.clientHeight - thumb.clientHeight;

      if (newTop >= 0 && newTop <= maxTop) {
        thumb.style.top = `${newTop}px`;
        const scrollPercentage = newTop / maxTop;
        content.scrollTop = scrollPercentage * (content.scrollHeight - content.clientHeight);
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  });
};
