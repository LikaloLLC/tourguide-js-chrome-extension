export const querySelector = <T>(selector: string, parentNode?: ParentNode): Promise<T> => {
  return new Promise((resolve) => {
    let count = 0;

    const checkForElement = () => {
      count++;

      const element = (parentNode || document).querySelector(selector);

      if (element) {
        resolve(element as unknown as T);
      } else {
        setTimeout(checkForElement, 10);
      }
    };

    checkForElement();
  });
};
