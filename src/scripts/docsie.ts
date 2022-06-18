import inputText from '../utils/inputText';
import querySelector from '../utils/querySelector';

const li = document.createElement('li');
li.className = 'docsie-menu-item';
li.dataset.component = 'headertoolbaraction';

const button = document.createElement('button');
button.className = 'docsie-button docsie-button-selected';
button.onclick = () => {
  const title = document.querySelector<HTMLInputElement>('#name').value;

  const steps = [...document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container')].map((container) => {
    const step = { title: '', content: '', selector: '' };

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

  console.log(title, steps);

  chrome.runtime.sendMessage({ type: 'editOnSite', data: { title, steps } });
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
  const menu = await querySelector('.docsie-menu-list:nth-child(4)');
  menu.insertAdjacentElement('afterbegin', li);
};

const buttonRemove = () => {
  li.remove();
};

window.addEventListener('locationchange', () => {
  checkForTour();
});

checkForTour();

const finishRecording = async (data: { title: string; steps: Step[] }) => {
  console.log('finishRecording', data);
  const title = document.querySelector<HTMLInputElement>('#name');
  title.value = data.title;

  const containers = document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container');

  if (data.steps.length !== containers.length) {
    const difference = data.steps.length - containers.length;

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        const addStep = document.querySelector<HTMLLIElement>('.docsie-tour-steps > .box > button');
        addStep.click();
      }
    }

    if (difference < 0) {
      // TODO: Delete extra steps
    }
  }

  for (let i = 0; i < data.steps.length; i++) {
    const step = data.steps[i];
    const container = document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container')[i];

    const edit = container.querySelector('.icon.icon--pencil').parentElement;
    edit.click();

    const title = container.querySelector<HTMLInputElement>('#title');
    inputText(title, step.title);

    const content = container.querySelector<HTMLTextAreaElement>('[id*=content]');
    inputText(content, step.content);

    const selector = container.querySelector<HTMLInputElement>('#selector');
    inputText(selector, step.selector);

    const save = container.querySelector('.icon.icon--save').parentElement;
    save.click();
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'finishRecording') {
    finishRecording(message.data);
  }
});
