interface Step {
  step: number;
  title: string;
  content: string;
  selector: string;
  image: null | string;
}

interface StepWithId {
  id: string;
  step: number;
  title: string;
  content: string;
  selector: string;
  image: null | string;
}
declare module 'tourguidejs';
