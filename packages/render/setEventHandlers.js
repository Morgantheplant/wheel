

export const setEventHandlers = (element, events) =>
  Object.entries(events).forEach(([event, handler]) => {
    element.addEventListener(formatEventName(event), handler);
  });
