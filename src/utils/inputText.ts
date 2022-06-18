function inputText(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const ev = new Event('input', { bubbles: true, cancelable: true });
  el.value = value;
  el.dispatchEvent(ev);
}

export default inputText;
