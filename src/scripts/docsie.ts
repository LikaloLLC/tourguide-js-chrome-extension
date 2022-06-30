import { inputText } from '../utils/inputText';
import { querySelector } from '../utils/querySelector';

const li = document.createElement('li');
li.className = 'docsie-menu-item';
li.dataset.component = 'headertoolbaraction';

const button = document.createElement('button');
button.className = 'docsie-button docsie-button-selected';
button.onclick = () => {
  const doc = [...document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container')].map((container) => {
    const step: Step = { title: '', content: '', selector: '' };

    const edit = container.querySelector('.icon.icon--pencil').parentElement;
    edit.click();

    const title = container.querySelector<HTMLInputElement>('#title');
    step.title = title.value;

    const content = container.querySelector<HTMLTextAreaElement>('[id*=content]');
    step.content = content.value;

    const selector = container.querySelector<HTMLInputElement>('#selector');
    step.selector = selector.value;

    const close = container.querySelector('.icon.icon--close').parentElement;
    close.click();

    return step;
  });

  const name = document.querySelector<HTMLInputElement>('#name').value;
  const description = '';

  chrome.runtime.sendMessage({
    type: 'EDIT_ON_SITE',
    payload: {
      doc,
      name,
      description,
    },
  });
};

const span = document.createElement('span');
span.textContent = 'Edit on site';

li.append(button);
button.append(span);

const checkForTour = () => {
  if (window.location.href.includes('/#/tour/')) {
    buttonAdd();
  } else {
    buttonRemove();
  }
};

const buttonAdd = async () => {
  const menu = await querySelector<HTMLElement>('.docsie-menu-list:nth-child(4)');
  menu.insertAdjacentElement('afterbegin', li);
};

const buttonRemove = () => {
  li.remove();
};

window.addEventListener('locationchange', () => {
  checkForTour();
});

checkForTour();

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const finishRecording = async (payload: { name: string; doc: Step[]; description: string }) => {
  console.log('finishRecording', payload);

  const name = document.querySelector<HTMLInputElement>('#name');
  inputText(name, payload.name);

  const containers = document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container');
  const difference = payload.doc.length - containers.length;

  if (difference > 0) {
    for (let i = 0; i < difference; i++) {
      const addStep = await querySelector<HTMLLIElement>('.docsie-tour-steps > .box > button');
      addStep.click();
      await sleep(100);
    }
  }

  for (let i = 0; i < payload.doc.length; i++) {
    const step = payload.doc[i];
    const container = document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container')[i];
    console.log('edit', container);

    const edit = container.querySelector('.icon.icon--pencil').parentElement;
    edit.click();
   // await sleep(10);

    const title = container.querySelector<HTMLInputElement>('#title');
    inputText(title, step.title);

    const content = container.querySelector<HTMLTextAreaElement>('[id*=content]');
    inputText(content, step.content);

    const selector = container.querySelector<HTMLInputElement>('#selector');
    inputText(selector, step.selector);

    const save = container.querySelector('.icon.icon--save').parentElement;
    save.click();
    // await sleep(10);
  }

  if (difference < 0) {
    const length = containers.length;

    for (let i = 0; i < Math.abs(difference); i++) {
      const container = document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container')[length - 1 - i];
      console.log('delete', container);

      const more = await querySelector<SVGElement>('.icon.icon--more', container);
      more.parentElement.click();
      await sleep(100);

      const trash = await querySelector<SVGElement>('.icon.icon--trash');
      trash.parentElement.click();
      await sleep(100);

      const confirmation = await querySelector<HTMLInputElement>('[name="confirmation"]');
      confirmation.parentElement.click();
      await sleep(100);

      const confirm = await querySelector<HTMLButtonElement>('[type="submit"]');
      confirm.click();
      await sleep(1000);
    }
  }
};

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'RECORDING_FINISH': {
      finishRecording(message.payload);
      break;
    }
  }
});
