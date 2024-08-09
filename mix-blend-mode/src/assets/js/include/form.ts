import { validateForm, validateField, validateUpToField } from "./validation";

export function form() {
  const formInput = document.querySelector("[data-form-input]");
  const formConfirm = document.querySelector("[data-form-confirm]");
  const inputs = document.querySelectorAll(".required, #privacy-policy");
  const inputContainer = document.querySelector("[data-input-container]");
  const confirmBtn = document.querySelector("[data-btn-confirm]") as HTMLButtonElement;
  const prevBtn = document.querySelector("[data-btn-prev]") as HTMLButtonElement;
  const formSubmitBtn = document.querySelector(".wpcf7-submit") as HTMLInputElement;
  const submitBtn = document.querySelector("[data-btn-submit]") as HTMLButtonElement;
  const textareas = document.querySelectorAll("textarea");
  const spinner = submitBtn.querySelector("[data-spinner]") as HTMLSpanElement;
  const formThanks = document.querySelector("[data-form-thanks]") as HTMLDivElement;

  let isSubmitting = false;

  const autoExpandTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleBlur = (input: HTMLInputElement | HTMLTextAreaElement) => {
    validateField(input);
    validateUpToField(input);
  };

  const handleConfirm = () => {
    const formIsValid = validateForm();
    if (confirmBtn) {
      confirmBtn.disabled = !formIsValid;
    }
  };

  const handleCheckboxChange = () => {
    inputs.forEach((input) => {
      validateField(input as HTMLInputElement | HTMLTextAreaElement);
      validateUpToField(input as HTMLInputElement | HTMLTextAreaElement);
    });
  };

  const showError = (message: string) => {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    const errorBody = document.createElement("p");
    errorBody.classList.add("body");
    errorMessage.appendChild(errorBody);
    errorBody.textContent = message;
    inputContainer?.insertAdjacentElement("afterend", errorMessage);

    requestAnimationFrame(() => {
      errorMessage.classList.add("_show");
    });
  };

  const hideError = () => {
    const errorMessage = document.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  };

  inputs?.forEach((input) => {
    input.addEventListener("blur", () => {
      handleBlur(input as HTMLInputElement | HTMLTextAreaElement);
    });
    input.addEventListener("input", () => {
      validateField(input as HTMLInputElement | HTMLTextAreaElement);
      handleConfirm();
    });
    if ((input as HTMLInputElement).type === "checkbox") {
      input.addEventListener("change", () => {
        handleCheckboxChange();
      });
    }
  });

  confirmBtn?.addEventListener("click", () => {
    const inputs = document.querySelectorAll(
      "#company-name,#your-name,#your-email,#your-tel,#your-address,#your-message,#privacy-policy",
    );

    inputs.forEach((input) => {
      const confirmEl = formConfirm?.querySelector(`[data-confirm="${input.id}"]`);

      if (
        confirmEl &&
        (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)
      ) {
        confirmEl.textContent = input.value;
        if (input.id === "privacy-policy" && input instanceof HTMLInputElement) {
          confirmEl.textContent = input.checked ? "同意します" : "同意しません";
        }
      }
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    formInput?.classList.add("_visually-hidden");
    formConfirm?.classList.remove("_visually-hidden");
  });

  prevBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    formInput?.classList.remove("_visually-hidden");
    formConfirm?.classList.add("_visually-hidden");
    hideError();
  });

  submitBtn?.addEventListener("click", () => {
    if (isSubmitting) return;
    hideError();
    isSubmitting = true;
    spinner.classList.remove("_visually-hidden");
    formSubmitBtn.click();
  });

  // Ajax フォームの送信が正常に完了し、メールが送信された
  document.addEventListener("wpcf7mailsent", () => {
    isSubmitting = false;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    formConfirm?.classList.add("_visually-hidden");
    formThanks.classList.remove("_visually-hidden");
    spinner.classList.add("_visually-hidden");
  });
  // Ajax フォームの送信が正常に完了したが、無効な入力フィールドがあるためメールが送信されなかった
  document.addEventListener("wpcf7invalid", () => {
    isSubmitting = false;
    spinner.classList.add("_visually-hidden");
    showError("入力内容に問題があります。確認して再度お試しください。");
  });
  // Ajax フォームの送信が正常に完了したが、スパム活動の可能性があることが検出されたためメールが送信されなかった
  document.addEventListener("wpcf7spam", () => {
    isSubmitting = false;
    spinner.classList.add("_visually-hidden");
    showError("メッセージの送信に失敗しました。後でまたお試しください。");
  });
  // Ajax フォームの送信は正常に完了したが、メールの送信に失敗した
  document.addEventListener("wpcf7mailfailed", () => {
    isSubmitting = false;
    spinner.classList.add("_visually-hidden");
    showError("メッセージの送信に失敗しました。後でまたお試しください。");
  });

  textareas.forEach((textarea) => {
    textarea.addEventListener("input", () => autoExpandTextarea(textarea));
  });
}
