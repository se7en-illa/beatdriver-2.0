/* THE BOARD*/
export const steps = 8;

const buttonState = {
  triggered: false,
  activated: false,
  audio: "",
  instrument: "",
};

//sets up how big the grid will be
export const initialGrid = [
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
];
