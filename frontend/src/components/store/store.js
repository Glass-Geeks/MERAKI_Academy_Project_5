import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "./schools/index";
import friendReducer from "./friends/index";
import authReducer from "./auth/index";
import connectionReducer from "./Connection";
export default configureStore({
  reducer: {
    schools: schoolReducer,
    friends: friendReducer,
    auth: authReducer,
    connection: connectionReducer,
  },
});
