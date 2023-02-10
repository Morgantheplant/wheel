
const isObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null

/** memo transforms so only changed values are returned  */
export const memoTransform = (transform) => {
    const cache = {};
    
    const memoize = (...args) => {
        const transformValues = transform(...args) || {};
        return Object.entries(transformValues).reduce((acc, [key, value]) => {
            
            // handles any sub dict values
            if (isObject(value)){
              const subTransforms = Object.entries(value).reduce((subAcc, [subKey, subValue])=>{
                // cache any sub dict values by key and subkey e.g. `style:background-color`
                const keyAndSubKey = `${key}:${subKey}`
                if(cache[keyAndSubKey] !== subValue){
                  cache[keyAndSubKey] = subValue;
                  subAcc[subKey] = subValue
                }
                return subAcc
              }, {})
              // only return changed values from any sub dicts
              if(Object.keys(subTransforms).length){
                acc[key] = subTransforms;
              }
              return acc;
            }
            // only return changed attributes
            if (cache[key] !== value) {
                cache[key] = value;
                acc[key] = value;
            }
          return acc;
        }, {});
      };
    return memoize;
  };