/* Core */
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * ? A utility function to create Async Thunk Actions.
 */
export const createAppAsyncThunk = (typePrefix, payloadCreator) => {
  return createAsyncThunk(typePrefix, payloadCreator);
};
