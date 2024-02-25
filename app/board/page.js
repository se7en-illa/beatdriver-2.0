"use client";

import * as htmlToImage from "html-to-image";
import React, { useState, useEffect, createRef } from "react";


//redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/utils/dispatch";

//components
import Looper from "../../components/board/Looper";
import TopToolbar from "../../components/toolbar/TopToolbar";
import EffectsMenu from "../../components/effectsmenu/EffectsMenu";

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

/* THE BOARD*/
const steps = 8;
const buttonState = {
  triggered: false,
  activated: false,
  audio: "",
  instrument: "",
};

// //sets up how big the grid will be
const initialGrid = [
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
  new Array(8).fill(buttonState),
];

const Board = () => {
  const router = useRouter();
  const { uniqueID, playing, name, bpm, mute, masterVolume } = useSelector(
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
  const { updateBeat, updateUID, updateSoundArr, updateColor, updatePlay } =
    useAppDispatch();
  const [grid, setGrid] = useState(initialGrid);

  //authentication + user info
  const [user] = useAuthState(auth);
  const dbRef = collection(database, "users");
  const [docs] = useCollectionData(dbRef);
  let currentUser;
  if (user) {
    currentUser = docs?.find((doc) => doc.email === user.email);
  }

  const ref = createRef(null);
  const dbInstance = query(
    collection(database, "projects"),
    where(`ownerId`, "==", `${user?.uid}`)
  );
  const [projects] = useCollectionData(dbInstance);

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

  const handleSave = async () => {
    const image = await takeScreenShot(ref.current);

    if (!uniqueID) {
      const newProject = await addDoc(collection(database, `projects`), {
        createdAt: serverTimestamp(),
        ownerId: user.uid,
        collaboratorIds: [],
        username: currentUser.name,
        name: name,
        soundArray: soundArray,
        beat,
        selected,
        selectedInstrument,
        grid: {
          r1: grid[0],
          r2: grid[1],
          r3: grid[2],
          r4: grid[3],
          r5: grid[4],
        },
        bpm: +bpm,
        masterVolume: +masterVolume,
        isPublic: true,
        screen: image,
        chorus: chorus,
        phaser: phaser,
        tremolo: tremolo,
        moog: moog,
      });

      updateUID(newProject.id);

      await setDoc(
        doc(database, `projects/${newProject.id}`),
        {
          projectId: newProject.id,
          screen: image,
        },
        { merge: true }
      );

      router.push({
        pathname: `/board/[id]`,
        query: { id: newProject.id },
      });
    }
  };

  const takeScreenShot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node);
    return dataURI;
  };

  const [val, setVal] = useState("");

  const handleBeatChange = (value) => {
    const findSample = soundArray.find((sample) => sample === value);
    if (!findSample) {
      let arrayCopy = [...soundArray];
      arrayCopy.push(value);
      updateSoundArr(arrayCopy);
    }
    setVal(value);
  };

  useEffect(() => {
    const idx = soundArray.indexOf(val);
    updateBeat(idx);
    updateColor(selectedInstrument);
  }, [soundArray, val, beat, selectedInstrument]);

  const togglePlaying = () => {
    updatePlay((prev) => !prev);
  };

  return (
    <div>
      <div className="grid grid-cols-12 text-xl">
        <div className="col-span-8 bg-slate-900">
          <div className="col-span-8 bg-black">
            {/* TOOLBAR */}
            <TopToolbar
              projects={projects}
              handleBeatChange={handleBeatChange}
              playing={playing}
              user={user}
              handleSave={handleSave}
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
