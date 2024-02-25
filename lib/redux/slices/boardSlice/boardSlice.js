// instrumentsReducer.js
export const instrumentsReducer = (
  state = {
    selectedInstrument: "selected",
    colorInstrument: "",
    selected: "SELECTED",
    beat: 0,
    soundArray: [],
    chorus: {
      rate: 0,
      delay: 0,
      feedback: 0,
      bypass: 0,
    },
    phaser: {
      rate: 0.1,
      depth: 0,
      feedback: 0,
      stereoPhase: 0,
      baseModulationFrequency: 700,
      bypass: 0,
    },
    tremolo: {
      intensity: 0,
      rate: 0.001,
      stereoPhase: 0,
      bypass: 0,
    },
    moog: {
      cutoff: 0.0,
      resonance: 0,
      bufferSize: 4096,
    },
  },
  action
) => {
  switch (action.type) {
    case "SET_SELECTED_INSTRUMENT":
      return { ...state, selectedInstrument: action.payload };
    case "SET_COLOR_INSTRUMENT":
      return { ...state, colorInstrument: action.payload };
    case "SET_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_BEAT":
      return { ...state, beat: action.payload };
    case "SET_SOUND_ARRAY":
      return { ...state, soundArray: action.payload };
    case "SET_CHORUS":
      return { ...state, chorus: action.payload };
    case "SET_PHASER":
      return { ...state, phaser: action.payload };
    case "SET_TREMOLO":
      return { ...state, tremolo: action.payload };
    case "SET_MOOG":
      return { ...state, moog: action.payload };
    default:
      return state;
  }
};

const buttonState = {
  triggered: false,
  activated: false,
  audio: "",
  instrument: "",
};

// //sets up how big the grid will be
// const initialGrid = [
//   new Array(8).fill(buttonState),
//   new Array(8).fill(buttonState),
//   new Array(8).fill(buttonState),
//   new Array(8).fill(buttonState),
//   new Array(8).fill(buttonState),
// ];

// Create a new button state object for each cell in the grid
const createButtonState = () => ({
  triggered: false,
  activated: false,
  audio: "",
  instrument: "",
});

const initialGrid = Array.from({ length: 5 }, () =>
  Array.from({ length: 8 }, () => ({ ...buttonState }))
);


// projectInfoReducer.js
export const projectInfoReducer = (
  state = {
    grid: initialGrid,
    uniqueID: null,
    playing: false,
    name: "Untitled",
    bpm: 120,
    mute: false,
    masterVolume: 1,
  },
  action
) => {
  switch (action.type) {
    case "SET_GRID":
      // Create a new grid array without mutating the original state
      const newGrid = action.payload.map((row) => [...row]);
      // Return a new state object with the updated grid
      return {
        ...state,
        grid: newGrid,
      };
    case "SET_UNIQUE_ID":
      return { ...state, uniqueID: action.payload };
    case "SET_PLAYING":
      return { ...state, playing: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_BPM":
      return { ...state, bpm: action.payload };
    case "SET_MUTE":
      return { ...state, mute: action.payload };
    case "SET_MASTER_VOLUME":
      return { ...state, masterVolume: action.payload };
    default:
      return state;
  }
};
