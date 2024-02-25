import { database, auth } from "../lib/firebase/firebase";
import {
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";

// Action to save a new project
export const saveNewProject = (projectData) => async (dispatch) => {
  try {
    const newProject = await addDoc(collection(database, "projects"), {
      ...projectData,
      createdAt: serverTimestamp(),
    });

    await setDoc(
      doc(database, `projects/${newProject.id}`),
      {
        projectId: newProject.id,
      },
      { merge: true }
    );

    dispatch({ type: "SET_UNIQUE_ID", payload: newProject.id });
    return newProject.id; // Return the new project ID for routing
  } catch (error) {
    console.error("Error saving new project:", error);
    // Handle error, e.g., dispatch an error action
  }
};

// Add more Firebase actions as needed
