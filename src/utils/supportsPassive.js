//https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
export const supportsPassive = (() => {
  const memo = {};
  const SUPPORTS_PASSIVE = "supportsPassive";
  return () => {
    if (memo.hasOwnProperty(SUPPORTS_PASSIVE)) {
      return memo[SUPPORTS_PASSIVE];
    }
    memo[SUPPORTS_PASSIVE] = false;
    try {
      let opts = Object.defineProperty({}, "passive", {
        get: function () {
          memo[SUPPORTS_PASSIVE] = true;
        },
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}
    return memo[SUPPORTS_PASSIVE];
  };
})();
