import { ElementAttributes } from "./types";

const isObject = (value: any) => typeof value === 'object' && !Array.isArray(value) && value !== null

/** memo transforms so only changed values are returned  */
export const memoTransform = (transform: (currentState: object, ownProps?: object) => object) => {
    const cache: Record<string,any> = {};
    
    const memoize = (currentState: object, ownProps: ElementAttributes) => {
        const transformValues = transform(currentState, ownProps) || {};
        return Object.entries(transformValues).reduce<Record<string, any>>((acc, [key, value]) => {
            
            // handles any sub dict values
            if (isObject(value)){
              const subTransforms = Object.entries(value).reduce<Record<string, any>>((subAcc, [subKey, subValue])=>{
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