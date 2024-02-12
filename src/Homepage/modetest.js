const MyComponent = (title,datas) => {
    const data = datas
    // Function to extract all keys including nested keys
    const getAllKeys = (obj) => {
      let keys = [];
      for (let key in obj) {
        keys.push(key);
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          keys = keys.concat(getAllKeys(obj[key]).map(subKey => key + '.' + subKey));
        }
      }
      return keys;
    };
  
    // Function to extract all first-level keys
    const getFirstLevelKeys = (dataset) => {
      let keys = [];
      dataset.forEach(obj => {
        Object.keys(obj).forEach(key => {
          keys.push(key);
        });
      });
      return keys;
    };
  
    // Call the function to get all first-level keys
    const firstLevelKeys = getFirstLevelKeys(data);
    const getSublevelKeys = (obj) => {
      let sublevelKeys = [];
  
      const extractSublevelKeys = (nestedObj) => {
        for (let key in nestedObj) {
          if (typeof nestedObj[key] === 'object' && nestedObj[key] !== null) {
            extractSublevelKeys(nestedObj[key]);
          } else {
            sublevelKeys.push(key);
          }
        }
      };
  
      extractSublevelKeys(obj);
      return [...new Set(sublevelKeys)];
    };
  
    // Call the function to get all sublevel keys
    const sublevelKeys = getSublevelKeys(data[0]);
    const newDataFormat = {};
  
    // Iterate over each first-level key
    Object.keys(data[0]).forEach(firstLevelKey => {
      // Initialize an array for the first-level key
      newDataFormat[firstLevelKey] = [];
  
      // Iterate over each subkey
      sublevelKeys.forEach(subKey => {
        // If the subkey exists, push its value to the array, otherwise push 0
        newDataFormat[firstLevelKey].push(data[0][firstLevelKey][subKey] || 0);
      });
    });
    const final = [
      firstLevelKeys,
      sublevelKeys,
      newDataFormat,
      title,
      
    ];
    return final;
  };
  
  export default MyComponent;
  