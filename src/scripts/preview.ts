import Tourguide from 'tourguidejs';
import '../styles/tourguide.css';

const startTourGuide = (steps: Step[]) => {
  const tourGuide = new Tourguide({ steps });
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
