import { useSelector, useDispatch } from "react-redux";

const dispatch = useDispatch();

//instruments
export const updateSelectedInstrument = (newInst) => {
  dispatch({ type: "SET_SELECTED_INSTRUMENT", payload: newInst });
};

export const updateColor = (newColor) => {
  dispatch({ type: "SET_COLOR_INSTRUMENT", payload: newColor });
};

export const updateSelected = (select) => {
  dispatch({ type: "SET_SELECTED", payload: select });
};

export const updateBeat = (newBeat) => {
  dispatch({ type: "SET_BEAT", payload: newBeat });
};

export const updateSoundArr = (soundArr) => {
  dispatch({ type: "SET_SOUND_ARRAY", payload: soundArr });
};

export const updateChorus = (chorus) => {
  dispatch({ type: "SET_CHORUS", payload: chorus });
};

export const updatePhaser = (phaser) => {
  dispatch({ type: "SET_PHASER", payload: phaser });
};

export const updateTremolo = (trem) => {
  dispatch({ type: "SET_TREMOLO", payload: trem });
};

export const updateMoog = (moog) => {
  dispatch({ type: "SET_MOOG", payload: moog });
};

// project

export const updateGrid = (grid) => {
  dispatch({ type: "SET_GRID", payload: grid });
};

export const updateUID = (uid) => {
  dispatch({ type: "SET_UNIQUE_ID", payload: uid });
};

export const updatePlay = (play) => {
  dispatch({ type: "SET_PLAYING", payload: play });
};

export const updateName = (name) => {
  dispatch({ type: "SET_NAME", payload: name });
};

export const updateBPM = (bpm) => {
  dispatch({ type: "SET_BPM", payload: bpm });
};

export const updateMute = (mute) => {
  dispatch({ type: "SET_MUTE", payload: mute });
};

export const updateMasterVol = (master) => {
  dispatch({ type: "SET_MASTER_VOLUME", payload: master });
};
