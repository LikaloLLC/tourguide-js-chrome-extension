function querySelector(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    let count = 0;

    function checkForElement() {
      count++;

      const element = document.querySelector(selector);

      if (element) {
        resolve(element);
      } else {
        setTimeout(checkForElement, 10);
      }
    }

    checkForElement();
  });
}

export default querySelector;
