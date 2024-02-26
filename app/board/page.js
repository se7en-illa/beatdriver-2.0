"use client";
import React, { useState, useEffect, createRef } from "react";
//redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/utils/dispatch";
//image capture
import * as htmlToImage from "html-to-image";
import { useProjectProcess } from "../../lib/utils/projectProcess";
//components
import Looper from "../../components/board/Looper";
import TopToolbar from "../../components/toolbar/TopToolbar";
import EffectsMenu from "../../components/effectsmenu/EffectsMenu";
import { steps, initialGrid } from "../../components/board/initialBoard";
//firebase imports
import {
  collection,
  doc,
  serverTimestamp,
  addDoc,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import { database, auth } from "../../lib/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouter } from "next/navigation";

const Board = () => {
  const { selectedInstrument, beat, soundArray } = useSelector(
    (state) => state.instruments
  );
  const { updateBeat, updateColor } = useAppDispatch();
  const [grid, setGrid] = useState(initialGrid);
  const [playing, setPlaying] = useState(false);

  //authentication + user info
  const user = useSelector((state) => state.user.userInfo);
  const ref = createRef(null);
  const dbInstance = query(
    collection(database, "projects"),
    where(`ownerId`, "==", `${user?.uid}`)
  );
  const [projects] = useCollectionData(dbInstance);
  const [val, setVal] = useState("");

  useEffect(() => {
    // handleClear
    const gridCopy = [...grid];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        gridCopy[i][j] = {
          triggered: false,
          activated: false,
          audio: "",
          instrument: "",
        };
      }
    }
    setGrid(gridCopy);
  }, []);

  useEffect(() => {
    const idx = soundArray.indexOf(val);
    updateBeat(idx);
    updateColor(selectedInstrument);
  }, [soundArray, val, beat, selectedInstrument]);

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <div>
      <div className="grid grid-cols-12 text-xl">
        <div className="col-span-8 bg-slate-900">
          <div className="col-span-8 bg-black">
            {/* TOOLBAR */}
            <TopToolbar
              projects={projects}
              setVal={setVal}
              playing={playing}
              user={user}
              togglePlaying={togglePlaying}
              grid={grid}
              setGrid={setGrid}
            />
          </div>
          <div ref={ref}>
            <Looper
              playing={playing}
              steps={steps}
              grid={grid}
              setGrid={setGrid}
            />
          </div>
        </div>

        <div className="col-span-4 ml-4 bg-slate-900">
          <EffectsMenu />
        </div>
      </div>
    </div>
  );
};

export default Board;
