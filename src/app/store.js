import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { templatesApiSlice } from "../features/templates/templateApi";
import { authApiSlice } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { documentApiSlice } from "../features/document/documentApi";
import { businessApiSlice } from "../features/business/businessApi";
import { settingsApiSlice } from "../features/settings/settingsApi";
import { chatApiSlice } from "../features/chat/chatApi";
import { subscriptionApiSlice } from "../features/subscriptions/subscriptionApi";
import commonSlice from "../features/common/commonSlice";

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
    common: commonSlice,
    [templatesApiSlice.reducerPath]: templatesApiSlice.reducer,
    [documentApiSlice.reducerPath]: documentApiSlice.reducer,
    [businessApiSlice.reducerPath]: businessApiSlice.reducer,
    [settingsApiSlice.reducerPath]: settingsApiSlice.reducer,
    [chatApiSlice.reducerPath]: chatApiSlice.reducer,
    [subscriptionApiSlice.reducerPath]: subscriptionApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      templatesApiSlice.middleware,
      documentApiSlice.middleware,
      businessApiSlice.middleware,
      settingsApiSlice.middleware,
      chatApiSlice.middleware,
      subscriptionApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
