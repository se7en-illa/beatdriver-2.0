/* Instruments */
import { instrumentsReducer } from "./slices/boardSlice/boardSlice";
import { projectInfoReducer } from "./slices/boardSlice/boardSlice";

export const reducer = {
  instruments: instrumentsReducer,
  projectInfo: projectInfoReducer,
};
