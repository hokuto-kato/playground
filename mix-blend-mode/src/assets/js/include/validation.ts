type ValidationRule = {
  required?: boolean;
  pattern?: RegExp;
  custom?: (inputEl: HTMLInputElement) => boolean;
  messages: {
    required?: string;
    pattern?: string;
    custom?: string;
  };
};

type ValidationRules = {
  [key: string]: ValidationRule;
};

const form = document.querySelector(".wpcf7-form");
const inputs = document.querySelectorAll(".required, #privacy-policy");

const clearError = (input: HTMLElement) => {
  const parent =
    input.id === "privacy-policy" ? input.closest(".wpcf7-list-item") : input.parentNode;

  if (parent) {
    const errors = parent.querySelectorAll(".wpcf7-not-valid-tip");
    errors.forEach((error) => error.remove());
  }
};

const showError = (input: HTMLElement, message: string) => {
  clearError(input);

  const error = document.createElement("span");
  error.classList.add("wpcf7-not-valid-tip");
  error.setAttribute("aria-hidden", "true");
  error.textContent = message;
  if (input.id === "privacy-policy") {
    input.closest(".wpcf7-list-item")?.appendChild(error);
  } else {
    input.parentNode?.appendChild(error);
  }
};

export const validateUpToField = (currentInput: HTMLInputElement | HTMLTextAreaElement) => {
  for (const inputEl of Array.from(inputs)) {
    validateField(inputEl as HTMLInputElement | HTMLTextAreaElement);
    if (inputEl === currentInput) break;
  }
};

export const validateField = (
  input: HTMLInputElement | HTMLTextAreaElement,
  showErrorMessage: boolean = true,
) => {
  const validationRules = getValidationRules();
  const rule = validationRules[input.id as keyof typeof validationRules];

  let isValid = true;

  if (rule) {
    if (
      rule?.required &&
      (input && input.type === "checkbox"
        ? !(input as HTMLInputElement).checked
        : input.value.trim() === "")
    ) {
      showErrorMessage && showError(input, rule.messages.required as string);
      isValid = false;
    } else if (rule.pattern && !rule.pattern.test(input.value)) {
      showErrorMessage && showError(input, rule.messages.pattern as string);
      isValid = false;
    } else if (rule.custom && !rule.custom(input as HTMLInputElement)) {
      showErrorMessage && showError(input, rule.messages.custom as string);
      isValid = false;
    } else {
      clearError(input);
    }
  }
  return isValid;
};

export const validateForm = () => {
  let isValid = true;
  for (const input of Array.from(inputs)) {
    const fieldIsValid = validateField(input as HTMLInputElement | HTMLTextAreaElement, false);
    if (!fieldIsValid) {
      isValid = false;
    }
  }
  return isValid;
};

export const getValidationRules = (): ValidationRules => ({
  "your-name": {
    required: true,
    messages: { required: "お名前は必須です。" },
  },
  "your-tel": {
    required: true,
    pattern:
      /^0((\d{1}[-(]?\d{4}|\d{2}[-(]?\d{3}|\d{3}[-(]?\d{2}|\d{4}[-(]?\d{1}|[5789]0[-(]?\d{4}|800[-(]?\d{3})[-)]?\d{4}|(12|99|18|57)0[-(]?\d{3}[-)]?\d{3})$/,
    messages: {
      required: "電話番号は必須です。",
      pattern: "電話番号は正しい形式で入力してください。",
    },
  },
  "your-email": {
    required: true,
    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    messages: {
      required: "メールアドレスは必須です。",
      pattern: "有効なメールアドレスを入力してください。",
    },
  },
  "your-email-confirm": {
    required: true,
    custom: (inputEl: HTMLInputElement) =>
      inputEl.value === (form?.querySelector("#your-email") as HTMLInputElement)?.value,
    messages: {
      required: "メールアドレス確認は必須です。",
      custom: "メールアドレスが一致しません。",
    },
  },
  "your-message": {
    required: true,
    messages: { required: "お問い合わせ詳細は必須です。" },
  },
  "privacy-policy": {
    required: true,
    custom: (inputEl: HTMLInputElement) => inputEl.checked,
    messages: {
      required: "プライバシーポリシーの同意は必須です。",
    },
  },
});
