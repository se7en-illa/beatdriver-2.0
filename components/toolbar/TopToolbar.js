import React, { useState } from "react";
import { useAppDispatch } from "../../lib/utils/dispatch";
import { useProjectProcess } from "../../lib/utils/projectProcess";

//redux
import { useSelector } from "react-redux";
import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { Knob } from "primereact/knob";
// import ReactTooltip from "react-tooltip";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SoundMenu from "../soundmenu/SoundMenu";
import LoadMenu from "../loadmenu/LoadMenu";
import ElementMaker from "./ElementMaker";
import Recorder from "../recorder/Recorder";

function TopToolbar({ user, grid, setGrid, playing, togglePlaying, setVal }) {
  const { name, bpm, masterVolume } = useSelector((state) => state.projectInfo);
  const { updateMasterVol, updateName, updateBPM } = useAppDispatch();
  const { handleSave } = useProjectProcess();
  const [showInputEle, setShowInputEle] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const handleClear = () => {
    const gridCopy = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        triggered: false,
        activated: false,
        audio: "",
      }))
    );

    setGrid(gridCopy);
  };

  const notLoggedIn = () => (user ? handleSave() : setOpen(true));

  return (
    <div className="flex flex-grow cursor-pointer place-items-center space-x-6 py-2">
      {/* PROJECT TITLE */}
      <div>
        <button data-tip data-for="title" className="hover:scale-110">
          <ElementMaker
            value={name}
            handleChange={(e) => updateName(e.target.value)}
            handleDoubleClick={() => setShowInputEle(true)}
            handleBlur={() => setShowInputEle(false)}
            showInputEle={showInputEle}
          />
        </button>
        {/* <ReactTooltip
          id="title"
          place="top"
          type="dark"
          effect="float"
          multiline="true"
        >
          <span>DOUBLE CLICK TO EDIT</span>
        </ReactTooltip> */}
      </div>
      {/* RECORDER */}
      <div>
        <button data-tip data-for="record" className="hover:scale-110">
          <Recorder togglePlaying={togglePlaying} name={name} />
        </button>
        {/* <ReactTooltip id="record" place="left" type="dark" effect="float">
          <span>CLICK TO RECORD</span>
        </ReactTooltip> */}
      </div>
      {/* PLAY BUTTON */}
      <div>
        <button onClick={togglePlaying} className="hover:scale-110">
          {playing ? (
            <BsStopFill className="text-white hover:text-blue-500 h-12 w-12" />
          ) : (
            <BsFillPlayFill className="text-white h-12 w-12" />
          )}
        </button>
      </div>
      {/* SAVE BUTTON */}
      <div>
        <BiSave className="h-16 w-8 hover:scale-110" onClick={notLoggedIn} />
      </div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        className="popup-content"
      >
        <div className="grid bg-oxford_blue place-items-center">
          <p className="text-4xl mt-10 mb-5">
            PLEASE LOG IN OR SIGN UP TO SAVE YOUR PROJECT!
          </p>
          <p className="mb-10">click anywhere to close</p>
        </div>
      </Popup>
      {/* LOAD MENU */}
      <div className="hover:scale-110">
        <LoadMenu setGrid={setGrid} />
      </div>

      {/* SOUND MENU */}
      <div className="">
        <label className="pr-2">SOUNDS:</label>
        <SoundMenu setVal={setVal} />
      </div>
      {/* BPM */}
      <div className="grid grid-cols-1 m-2 place-items-center hover:scale-110">
        <Knob
          size={60}
          value={bpm}
          min={50}
          max={300}
          valueColor={"MediumPurple"}
          rangeColor={"White"}
          textColor={"White"}
          onChange={(e) => updateBPM(e.value)}
        />
        <label className="col-span-1 text-sm">BPM</label>
      </div>
      {/* MASTER VOLUME */}
      <div className="grid grid-cols-1 m-2 place-items-center hover:scale-110">
        <Knob
          size={60}
          value={Math.round(masterVolume * 100)}
          valueTemplate={"{value}%"}
          min={0}
          max={100}
          valueColor={"MediumPurple"}
          rangeColor={"White"}
          textColor={"White"}
          onChange={(e) => updateMasterVol(e.value / 100)}
        />
        <label className="col-span-1 text-sm">MASTER</label>
      </div>
      {/* CLEAR BUTTON */}
      <div>
        <button
          onClick={handleClear}
          className="mt-1 mx-2 border-2 p-2 bg-red-900 hover:bg-red-600 border-white hover:scale-110 rounded-md"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}

export default TopToolbar;
