import { ReactNode } from "react";

export const renderToDOM = (selector: string, App: HTMLElement | ReactNode) => {
    const entry =  document.querySelector(selector);
    if(!entry) throw Error('Entrypoint not found. Pass a valid CSS selector') 
    entry.appendChild(App as HTMLElement)
}