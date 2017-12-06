// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const isRequest = (request) => {
  if(request === 'PUT' || request === 'GET'){
  return request;
} else {
  return;
  }
}

const isIndex = (index) => {
  if(index <= 0 && index >= 3){
    return index;
  }
}

getPreset = (index) => {
  return presets[index] || null
}

createOrUpdatePreset = (index, array) => {
  if (!presets[index]) {
    return;
  }
  presets[index] = array;
  return presets[index];
}

const presetHandler = (method, index, newPresetArray) => {
  if (method === 'GET') {
    let preset = getPreset(index);
    if (preset) {
      return [200, preset];
    } else {
      return [404];
    }
  } else if (method === 'PUT') {
    let newPreset = createOrUpdatePreset(index, newPresetArray)
    if (newPreset) {
      return [200, newPreset]
    } else {
      return [404]
    }
  } else {
    return [400];
  }
}



  /*const request = isRequest(requestType);
  const index = isIndex(arrayIndex);
  const inputArray = newPresetArray
  const returnArray = new Array(2);

  if(!request) {
    returnArray[0] = 400;
    return returnArray;
  } if(request === 'GET') {
    if(arrayIndex < 0 || arrayIndex > 3) {
      returnArray[0] = 404;
    } else if(arrayIndex >= 0 && arrayIndex <=3) {
      returnArray[0] = 200;
    }
      returnArray.push(presets[index]);

  } if(request === 'PUT') {
    if(arrayIndex < 0 || arrayIndex > 3) {
      returnArray[0] = 404;
    } else if(arrayIndex >= 0 && arrayIndex <=3) {
      returnArray[0] = 200;
    }
      returnArray[1] = presets[index];
  }


  return returnArray;
};*/

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
