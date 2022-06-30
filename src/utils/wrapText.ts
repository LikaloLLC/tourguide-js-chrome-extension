export const wrapText = (textArea: HTMLTextAreaElement, openTag: string, closeTag: string) => {
    const len = textArea.value.length;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    const replacement = openTag + selectedText + closeTag;
    return textArea.value.substring(0, start) + replacement + textArea.value.substring(end, len);
  };
