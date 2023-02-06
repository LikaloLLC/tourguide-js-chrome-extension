import { querySelector } from '../utils/querySelector';

const li = document.createElement('li');
li.className = 'docsie-menu-item';
li.dataset.component = 'headertoolbaraction';

const button = document.createElement('button');
button.className = 'docsie-button docsie-button-selected';

button.onclick = () => {
  chrome.runtime.sendMessage({ type: 'EDIT_ON_SITE' });
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
