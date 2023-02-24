import { createStore } from "../store/createStore";

declare global {
  namespace JSX {
    export interface IntrinsicElements {
      fragment: ReactFragment;
    }
  }
}

declare module 'react' {
  interface Attributes {
    store?: ReturnType<typeof createStore>;
    selector?: (state: ReturnType<typeof createStore.getState>) => any;
    connect?: (selection: any) => Partial<CSSStyleDeclaration> & {textContent?: string};
  }
}