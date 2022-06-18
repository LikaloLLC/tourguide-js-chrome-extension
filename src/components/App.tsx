import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import Body from './Body';
import Header from './Header';
import Style from './Style';

function App() {
  const [recording, setRecording] = useState<boolean>();
  const [steps, setSteps] = useState<Step[]>([{ title: '', content: '', selector: '' }]);
  const [select, setSelect] = useState<number | null>();

  function stepAdd() {
    setSteps((current) => [...current, { title: '', content: '', selector: '' }]);
  }

  function stepUpdate(change: { [k: string]: string }, i: number) {
    setSteps((current) =>
      current.map((value, index) => {
        if (index === i) {
          return { ...value, ...change };
        }

        return value;
      })
    );
  }

  function stepRemove(i: number) {
    setSteps((current) =>
      current.filter((value, index) => {
        return index !== i;
      })
    );
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      console.log('editOnTab', message);
      if (message.type === 'editOnTab') {
        setSteps((current) => message.data.steps);
        console.log('editOnTab', message.data.steps);
      }

      if (message.pickerValue) {
        setSelect(message.stepIndex);
        stepUpdate({ selector: message.pickerValue.querySelector }, message.stepIndex);
      }
    });
  }, []);

  return (
    <>
      <Style />
      <div className="d-flex flex-column">
        <Header steps={steps} recording={recording} setRecording={setRecording} />
        <Body
          recording={recording}
          steps={steps}
          select={select}
          setSelect={setSelect}
          stepAdd={stepAdd}
          stepUpdate={stepUpdate}
          stepRemove={stepRemove}
        />
      </div>
    </>
  );
}

export default App;
