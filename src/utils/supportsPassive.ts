//https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
export const supportsPassive = (() => {
  const memo: { supportsPassive?: boolean } = {};
  const SUPPORTS_PASSIVE = "supportsPassive";
  return (): boolean => {
    if (memo.hasOwnProperty(SUPPORTS_PASSIVE)) {
      return !!memo[SUPPORTS_PASSIVE];
    }
    memo[SUPPORTS_PASSIVE] = false;
    try {
      let opts = Object.defineProperty({}, "passive", {
        get: function () {
          memo[SUPPORTS_PASSIVE] = true;
        },
      });
      const eventName = "testPassive" as keyof WindowEventMap;
      const noop = () => {};
      window.addEventListener(eventName, noop, opts);
      window.removeEventListener(eventName, noop, opts);
    } catch (e) {}
    return memo[SUPPORTS_PASSIVE];
  };
})();
