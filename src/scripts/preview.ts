import Tourguide from 'tourguidejs';
import '../styles/tourguide.css';

const startTourGuide = (doc: Step[]) => {
  const steps = doc.map(({ selector, title, content }, index) => ({
    selector,
    step: index + 1,
    title,
    content,
  }));
  console.log(steps);
  const tourGuide = new Tourguide({ steps });
  console.log(tourGuide);
  tourGuide.start();
};

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'SHOWING_PREVIEW': {
      startTourGuide(message.payload.doc);
      break;
    }
  }
});
