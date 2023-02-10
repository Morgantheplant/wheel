export const renderToDOM = (selector, App) => {
    document.querySelector(selector).appendChild(App)
}