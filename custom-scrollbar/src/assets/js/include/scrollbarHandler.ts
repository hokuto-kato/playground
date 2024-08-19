export const initScrollbar = () => {
  const content = document.querySelector(".content");
  const scrollbar = document.querySelector(".scrollbar");
  const thumb = scrollbar?.querySelector(".thumb") as HTMLElement;

  if (!content || !scrollbar || !thumb) return;

  // スクロールバーの高さをコンテンツの高さに応じて変える
  const updateScrollbarHeight = () => {
    const scrollbarHeight = (content.clientHeight / content.scrollHeight) * scrollbar.clientHeight;
    thumb.style.height = `${scrollbarHeight}px`;
  };

  // コンテンツの高さの変化を監視
  const observer = new MutationObserver(updateScrollbarHeight);
  observer.observe(content, { childList: true, subtree: true });

  // サムのドラッグ機能
  let isDragging = false;
  let startY: number;
  let startTop: number;

  // 初期化時にスクロールバーの高さを更新
  updateScrollbarHeight();

  // コンテンツのスクロールに応じてサムを移動
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
};
