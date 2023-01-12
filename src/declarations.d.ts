interface Action {
	label: string;
	action: "next" | "previous" | "stop" | string;
	primary?: boolean;
	[key: string]: any;
}

interface Step {
  step: number;
  title: string;
  content: string;
  selector: string;
  image: null | string;
  layout: "horizontal" | "vertical";
  actions?: [] | Action[];
}

interface StepWithId {
  id: string;
  step: number;
  title: string;
  content: string;
  selector: string;
  image: null | string;
  layout: "horizontal" | "vertical";
  actions?: [] | Action[];
}
declare module 'tourguidejs';
