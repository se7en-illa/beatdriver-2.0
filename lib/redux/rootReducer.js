/* Instruments */
import { instrumentsReducer } from "./slices/boardSlice/boardSlice";
import { projectInfoReducer } from "./slices/boardSlice/boardSlice";
import userReducer from "./slices/userSlice/userSlice";
import authReducer from "./slices/userSlice/authSlice";

export const reducer = {
  instruments: instrumentsReducer,
  projectInfo: projectInfoReducer,
  user: userReducer,
  auth: authReducer,
};
