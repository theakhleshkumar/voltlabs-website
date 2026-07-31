// Web3Forms access keys are public by design; abuse is limited by the
// honeypot field, hCaptcha, and dashboard-side spam filtering.
export const WEB3FORMS_ACCESS_KEY = "28e97e7e-c64b-41c6-b0b2-7bc36a1ca985";

// The hCaptcha widget is rendered by the Web3Forms client script. A solved
// token is single-use, so reset after each submission attempt.
export const resetCaptcha = () => {
  const w = window as Window & { hcaptcha?: { reset: () => void } };
  try {
    w.hcaptcha?.reset();
  } catch {
    // widget not rendered; nothing to reset
  }
};
