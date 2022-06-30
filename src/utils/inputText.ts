export const inputText = (el: HTMLInputElement | HTMLTextAreaElement, value: string) => {
  const event = new Event('input', { bubbles: true, cancelable: true });
  el.value = value;
  el.dispatchEvent(event);
};
