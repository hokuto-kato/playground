export function dialogHandler() {
  const buttons = Array.from(document.querySelectorAll("[data-dialog-trigger]"));
  const closeBtns = Array.from(document.querySelectorAll("[data-dialog-close]"));
  const dialogs = Array.from(document.querySelectorAll("[data-dialog-target]"));

  const openDialog = (button: HTMLButtonElement) => {
    const dialogID = button.getAttribute("data-dialog-trigger");
    const dialog = document.querySelector(`[data-dialog-target=${dialogID}]`);
    if (dialog instanceof HTMLDialogElement) {
      button.disabled = true;
      dialog.classList.add("dialog-opening");
      dialog.showModal();
      document.body.classList.add("_noScroll");
      setTimeout(() => {
        button.disabled = false;
        dialog.classList.remove("dialog-opening");
      }, 200);
    }
  };

  const handleDialogClose = (dialog: HTMLDialogElement) => {
    dialog.classList.add("dialog-closing");
    setTimeout(() => {
      dialog.close();
      document.body.classList.remove("_noScroll");
      dialog.classList.remove("dialog-closing");
    }, 200);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => openDialog(button as HTMLButtonElement));
  });

  closeBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const dialogID = button.getAttribute("data-dialog-close");
      const dialog = document.querySelector(`[data-dialog-target=${dialogID}]`);
      if (dialog instanceof HTMLDialogElement) {
        handleDialogClose(dialog);
      }
    });
  });

  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= mouseEvent.clientY &&
        mouseEvent.clientY <= rect.top + rect.height &&
        rect.left <= mouseEvent.clientX &&
        mouseEvent.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        handleDialogClose(dialog as HTMLDialogElement);
      }
    });
    dialog.addEventListener("close", () => handleDialogClose(dialog as HTMLDialogElement));
  });
}
