import { querySelector } from '../utils/querySelector';

const li = document.createElement('li');
li.className = 'docsie-menu-item';
li.dataset.component = 'headertoolbaraction';

const button = document.createElement('button');
button.className = 'docsie-button docsie-button-selected';
button.onclick = () => {
  const doc = [...document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container')].map((container, index) => {
    const step: Step = { step: index + 1, image: null, title: '', content: '', selector: '' };

    const edit = container.querySelector('.icon.icon--pencil').parentElement;
    edit.click();

    const title = container.querySelector<HTMLInputElement>('#title');
    step.title = title.value;

    const img = container.querySelector<HTMLInputElement>('img');
    step.image = img.src === 'https://via.placeholder.com/240x120' ? null : img.src;

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
  const menu = await querySelector<HTMLSpanElement>('#chrome-extension-placeholder');
  menu.replaceChildren(li);
};

const buttonRemove = () => {
  li.remove();
};

window.addEventListener('locationchange', () => {
  checkForTour();
});

checkForTour();
