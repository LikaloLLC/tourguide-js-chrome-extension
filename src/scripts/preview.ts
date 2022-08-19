import Tourguide from 'tourguidejs';
import '../styles/tourguide.css';

const startTourGuide = (steps: Step[]) => {
  const cleanedSteps = steps.filter((step) => step.selector !== '');

  const iframeMinimize = () => {
    chrome.runtime.sendMessage({
      type: 'IFRAME_MINIMIZE',
    });
  };
  const iframeMaximize = () => {
    chrome.runtime.sendMessage({
      type: 'IFRAME_MAXIMIZE',
    });
  };

  const tourGuide = new Tourguide({
    onStart: iframeMinimize,
    steps: cleanedSteps,
    onStop: iframeMaximize,
    onComplete: iframeMaximize,
  });

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
