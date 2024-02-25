import { useDispatch } from "react-redux";

// Define a custom hook to use dispatch
export const useAppDispatch = () => {
  const dispatch = useDispatch();
  return {
    updateSelectedInstrument: (newInst) => {
      dispatch({ type: "SET_SELECTED_INSTRUMENT", payload: newInst });
    },
    updateColor: (newColor) => {
      dispatch({ type: "SET_COLOR_INSTRUMENT", payload: newColor });
    },
    updateSelected: (select) => {
      dispatch({ type: "SET_SELECTED", payload: select });
    },
    updateBeat: (newBeat) => {
      dispatch({ type: "SET_BEAT", payload: newBeat });
    },
    updateSoundArr: (soundArr) => {
      dispatch({ type: "SET_SOUND_ARRAY", payload: soundArr });
    },
    updateChorus: (chorus) => {
      dispatch({ type: "SET_CHORUS", payload: chorus });
    },
    updatePhaser: (phaser) => {
      dispatch({ type: "SET_PHASER", payload: phaser });
    },
    updateTremolo: (trem) => {
      dispatch({ type: "SET_TREMOLO", payload: trem });
    },
    updateMoog: (moog) => {
      dispatch({ type: "SET_MOOG", payload: moog });
    },
    updateGrid: (grid) => {
      dispatch({ type: "SET_GRID", payload: grid });
    },
    updateUID: (uid) => {
      dispatch({ type: "SET_UNIQUE_ID", payload: uid });
    },
    updatePlay: (play) => {
      dispatch({ type: "SET_PLAYING", payload: play });
    },
    togglePlaying: () => {
      dispatch({ type: "TOGGLE_PLAYING" });
    },
    updateName: (name) => {
      dispatch({ type: "SET_NAME", payload: name });
    },
    updateBPM: (bpm) => {
      dispatch({ type: "SET_BPM", payload: bpm });
    },
    updateMute: (mute) => {
      dispatch({ type: "SET_MUTE", payload: mute });
    },
    updateMasterVol: (master) => {
      dispatch({ type: "SET_MASTER_VOLUME", payload: master });
    },
  };
};
