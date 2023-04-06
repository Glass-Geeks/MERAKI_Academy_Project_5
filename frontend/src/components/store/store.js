import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "./schools/index";
import friendReducer from "./friends/index";
import authReducer from "./auth/index";
export default configureStore({
  // the reducer object is empty for now but after creating reducers we add them to this object
  reducer: {
    schools: schoolReducer,
    friends: friendReducer,
    auth: authReducer,
  },
});
