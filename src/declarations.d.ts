interface Step {
  step: number;
  title: string;
  content: string;
  selector: string;
  image: null | string;
  layout: "horizontal" | "vertical";
}

interface StepWithId {
  id: string;
  step: number;
  title: string;
  content: string;
  selector: string;
  image: null | string;
  layout: "horizontal" | "vertical";
}
declare module 'tourguidejs';
