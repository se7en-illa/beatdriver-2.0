"use client";
import React, { useState, useEffect, createRef } from "react";
//redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/utils/dispatch";
//image capture
import * as htmlToImage from "html-to-image";
//firebase imports
import {
  collection,
  doc,
  query,
  where,
  serverTimestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { database } from "../../lib/firebase/firebase";
import { useRouter } from "next/navigation";

export const useProjectProcess = () => {
  const user = useSelector((state) => state.user.userInfo);
  const { uniqueID, name, bpm, masterVolume } = useSelector(
    (state) => state.projectInfo
  );
  const {
    selectedInstrument,
    selected,
    beat,
    soundArray,
    chorus,
    phaser,
    tremolo,
    moog,
  } = useSelector((state) => state.instruments);
  const { updateUID, updateSoundArr, updateName } = useAppDispatch();
  const router = useRouter();
  const ref = createRef(null);
  const dbInstance = query(
    collection(database, "projects"),
    where(`ownerId`, "==", `${user?.uid}`)
  );

  const [projects] = useCollectionData(dbInstance);

  const takeScreenShot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node);
    return dataURI;
  };

  const handleLoad = (project, setGrid) => {
    const objGrid = project.grid;
    const orderedKeys = Object.keys(objGrid).sort();
    const loadGrid = orderedKeys.map((row) =>
      objGrid[row].map((cell) => ({ ...cell }))
    );

    updateUID(project.projectId);
    updateName(project.name);
    setGrid(loadGrid);
    router.push({
      pathname: `/board/[id]`,
      query: { id: project.projectId },
    });
  };

  const handleSave = async (grid, ref) => {
    const image = await takeScreenShot(ref.current);

    if (!uniqueID) {
      const newProject = await addDoc(collection(database, `projects`), {
        createdAt: serverTimestamp(),
        ownerId: user.uid,
        collaboratorIds: [],
        username: user.name,
        name,
        soundArray,
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
        chorus,
        phaser,
        tremolo,
        moog,
      });

      dispatch(updateUID(newProject.id));

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

  const handleBeatChange = (value, setValue) => {
    const findSample = soundArray.find((sample) => sample === value);
    if (!findSample) {
      let arrayCopy = [...soundArray];
      arrayCopy.push(value);
      updateSoundArr(arrayCopy);
    }
    setValue(value);
  };

  return { handleSave, handleBeatChange, handleLoad, projects };
};
