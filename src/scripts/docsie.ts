import { querySelector } from '../utils/querySelector';

const li = document.createElement('li');
li.className = 'docsie-menu-item';
li.dataset.component = 'headertoolbaraction';

const button = document.createElement('button');
button.className = 'docsie-button docsie-button-selected';
button.onclick = () => {
  const doc = [...document.querySelectorAll<HTMLLIElement>('.docsie-tour-step-container')].map((container, index) => {
    const step: Step = { step: index + 1, image: null, layout: "vertical", title: '', content: '', selector: '' };

    const edit = container.querySelector<HTMLButtonElement>('#step-container-edit-btn');
    edit.click();
    const id = container.id;
    const newContainer = document.querySelector(`#step-container-${id}`);

    const title = newContainer.querySelector<HTMLInputElement>('#title');
    step.title = title.value;

    const img = newContainer.querySelector<HTMLInputElement>('img');
    step.image = img.src === 'https://via.placeholder.com/240x120' ? null : img.src;

    const layout =  newContainer.querySelector<HTMLInputElement>('#layout');
    step.layout = step.image && layout.value === "horizontal" ? "horizontal" : "vertical";

    const content = newContainer.querySelector<HTMLTextAreaElement>('[id*=content]');
    step.content = content.value;

    const actions = [...newContainer.querySelectorAll<HTMLDivElement>(".docsie-tour-actions")].map((element, index) => {
      const label = element.querySelector<HTMLInputElement>(`input#actions-label-${index + 1}`).value;
      const action = element.querySelector<HTMLSelectElement>(`select#actions-action-${index + 1}`).value;
      
      if (label && action) {
        return <Action>{label, action};
      }
    });

    if(Boolean(...actions)) {
      step.actions = actions;
    }

    const selector = newContainer.querySelector<HTMLInputElement>('#selector');
    step.selector = selector.value;

    const close = newContainer.querySelector<HTMLButtonElement>('#step-container-close-btn');
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
