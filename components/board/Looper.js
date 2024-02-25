import Tuna from "tunajs";
import React, { useState, useEffect, useRef } from "react";
import Grid from "./Grid";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
//redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/utils/dispatch";

let audioContext;
let tuna;
let source;

if (typeof window !== "undefined") {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
  tuna = new Tuna(audioContext);
}

const Looper = ({ steps }) => {
  const { grid, playing, bpm, masterVolume } = useSelector(
    (state) => state.projectInfo
  );
  const {
    selectedInstrument,
    colorInstrument,
    selected,
    beat,
    soundArray,
    chorus,
    phaser,
    tremolo,
    moog,
  } = useSelector((state) => state.instruments);
  const { updateGrid } = useAppDispatch();
  const [currButton, setCurrButton] = useState(0);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  //audio things
  const [samples, setSamples] = useState([]);

  const getSample = async (filepath) => {
    const res = await fetch(filepath);
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  const setupSamples = async (paths) => {
    const audioBuffers = [];
    for (const path of paths) {
      const sample = await getSample(path);
      audioBuffers.push(sample);
    }
    return audioBuffers;
  };

  useEffect(() => {
    setupSamples(soundArray).then((res) => {
      setSamples(res);
    });
  }, [soundArray, beat]);

  const tunaChorus = useRef();
  const tunaPhaser = useRef();
  const tunaTremolo = useRef();
  const tunaMoog = useRef();

  useEffect(() => {
    if (tuna) {
      tunaChorus.current = new tuna.Chorus({
        rate: chorus.rate,
        feedback: chorus.feedback,
        delay: chorus.delay,
        bypass: 0,
      });
    }
  }, [chorus]);

  useEffect(() => {
    if (tuna) {
      tunaPhaser.current = new tuna.Phaser({
        rate: phaser.rate, //0.01 to 8 is a decent range, but higher values are possible
        depth: phaser.depth, //0 to 1
        feedback: phaser.feedback, //0 to 1+
        stereoPhase: phaser.stereoPhase, //0 to 180
        baseModulationFrequency: phaser.baseModulationFrequency, //500 to 1500
        bypass: 0,
      });
    }
  }, [phaser]);

  useEffect(() => {
    if (tuna) {
      tunaTremolo.current = new tuna.Tremolo({
        intensity: tremolo.intensity, //0 to 1
        rate: tremolo.rate, //0.001 to 8
        stereoPhase: tremolo.stereoPhase, //0 to 180
        bypass: 0,
      });
    }
  }, [tremolo]);

  useEffect(() => {
    if (tuna) {
      tunaMoog.current = new tuna.MoogFilter({
        cutoff: moog.cutoff, //0 to 1
        resonance: moog.resonance, //0 to 4
        bufferSize: 4096, //256 to 16384
      });
    }
  }, [moog]);

  const playAudio = (audioBuffer, startTime) => {
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    const volume = audioContext.createGain();

    volume.gain.value = masterVolume;
    source.connect(volume);
    volume.connect(tunaChorus.current);
    tunaChorus.current.connect(tunaPhaser.current);
    tunaPhaser.current.connect(tunaTremolo.current);
    tunaTremolo.current.connect(audioContext.destination);
    source.start(startTime);
    console.log(audioContext, "AUDIO CONTEXT");
  };
  //end audio things

  // const toggleActivation = (row, col) => {
  //   if (selected === "SELECTED") {
  //     setOpen(true);
  //   } else {
  //     const gridCopy = [...grid];
  //     const { triggered, activated } = gridCopy[row][col];
  //     gridCopy[row][col] = {
  //       triggered,
  //       activated: !activated,
  //       audio: beat,
  //       instrument: colorInstrument,
  //     };
  //     updateGrid(gridCopy);
  //   }
  // };

  const toggleActivation = (row, col) => {
    if (selected === "SELECTED") {
      setOpen(true);
    } else {
      // Create a deep copy of the grid
      const gridCopy = grid.map((row) => row.map((cell) => ({ ...cell })));

      // Update the specified cell in the grid copy
      const cellCopy = { ...gridCopy[row][col] };
      cellCopy.activated = !cellCopy.activated;
      cellCopy.audio = beat;
      cellCopy.instrument = colorInstrument;
      gridCopy[row][col] = cellCopy;

      // Dispatch the updated grid
      updateGrid(gridCopy);
    }
  };

  //this is what goes through the loop and triggers each row
  //if a button is triggered and already activated (by user) then it plays the sample
  const nextButton = (currButton) => {
    const gridCopy = grid.map((row) => row.map((cell) => ({ ...cell })));
    for (let i = 0; i < gridCopy.length; i++) {
      for (let j = 0; j < gridCopy[i].length; j++) {
        gridCopy[i][j] = {
          ...gridCopy[i][j],
          triggered: j === currButton,
        };

        if (
          gridCopy[i][j].triggered &&
          gridCopy[i][j].activated &&
          gridCopy[i][j].audio !== ""
        ) {
          //plays the sound associated with the button
          playAudio(samples[gridCopy[i][j].audio], 0);
        }
      }
    }
    updateGrid(gridCopy);
  };

  // const nextButton = (currButton) => {
  //   for (let i = 0; i < grid.length; i++) {
  //     for (let j = 0; j < grid[i].length; j++) {
  //       const { activated, audio, instrument } = grid[i][j];
  //       grid[i][j] = {
  //         activated,
  //         triggered: j === currButton,
  //         audio,
  //         instrument,
  //       };

  //       if (
  //         grid[i][j].triggered &&
  //         grid[i][j].activated &&
  //         grid[i][j].audio !== ""
  //       ) {
  //         //plays the sound associated with the button
  //         playAudio(samples[grid[i][j].audio], 0);
  //       }
  //     }
  //   }
  //   updateGrid(grid);
  // };

  //timer of the loop, sets what rows are triggered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing) {
        audioContext.resume();
        setCurrButton((currButton + 1) % steps);
        nextButton(currButton);
      } else {
        audioContext.suspend();
      }
      //use line below to control speed of timer/works like tempo!
    }, 60000 / bpm); //(60,000 / bpm = milliseconds for 1/4 notes)
    return () => {
      clearTimeout(timer);
    };
  }, [currButton, playing]);

  return (
    <div className="">
      <Grid
        grid={grid}
        toggleActivation={toggleActivation}
        selectedInstrument={selectedInstrument}
      />
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        className="popup-content"
      >
        <div className="grid bg-oxford_blue place-items-center">
          <p className="text-4xl mt-10 mb-5">PLEASE SELECT A SOUND!</p>
          <p className="mb-10">click anywhere to close</p>
        </div>
      </Popup>
    </div>
  );
};

export default Looper;
