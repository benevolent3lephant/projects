// Drum Arrays
const createNewDrumArray = () => new Array(16).fill(false);

let kicks = createNewDrumArray();
let snares = createNewDrumArray();
let hiHats = createNewDrumArray();
let rideCymbals = createNewDrumArray();

const getDrumName = (name) => {
  switch (name) {
    case 'kicks':
      return kicks;
    case 'snares':
      return snares;
    case 'hiHats':
      return hiHats;
    case 'rideCymbals':
      return rideCymbals;
    default:
      return;
  }
}

const toggleDrum = (array, index) => {
  const drums = getDrumName(array);
  if(!drums || index < 0 || index > 15) {
    return;
  }
  drums[index] = !drums[index];
};

const clear = (array) => {
  const drums = getDrumName(array);
  if(!drums){
    return;
  }
  drums.fill(false);
}

const invert = (array) => {
  drums = getDrumName(array);
  if(!drums){
    return;
  }
  for (let i=0; i<drums.length; i++) {
    drums[i] = !drums[i];
  }
}
