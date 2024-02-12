import React from 'react';

function MyComponent() {
  const data = [{'didji':{'car':2882,'fn':874374,'fghdfn':874374},'dididfdhhji':{'car':2882,'fn':874374,'f':874374},'dididi':{'car':2882},'sdjhsdjh':{'car':2882,'fn':874374}}];

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
  return (
    <div>
      <h2>First Level Keys with Subdomain Keys:</h2>
      <ul>
        {firstLevelKeys.map(key => (
          <li key={key}>
            {key}
            <ul>
              {getAllKeys(data[0][key]).map(subKey => (
                <li key={subKey}>{subKey}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div>
      <h2>All Sublevel Keys (Without Repetitions and Excluding First-Level Keys):</h2>
      <ul>
        {sublevelKeys.map(key => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default MyComponent;
