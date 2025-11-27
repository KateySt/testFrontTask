import { combineReducers, configureStore } from "@reduxjs/toolkit";
import citySlice from "@/store/city/citySlice";
import { weatherApi } from "@/store/services/weather";

export type RootState = ReturnType<typeof rootReducer>;

const STORAGE_KEY = "weatherAppState";

const saveToLocalStorage = (state: Partial<RootState>) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serializedState);
    }
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
};

const loadFromLocalStorage = (): Partial<RootState> | undefined => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem(STORAGE_KEY);
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error("Error loading from localStorage:", err);
    return undefined;
  }
};

const rootReducer = combineReducers({
  city: citySlice,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const makeStore = () => {
  const preloadedState = loadFromLocalStorage();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(weatherApi.middleware),
    preloadedState,
  });

  store.subscribe(() => {
    saveToLocalStorage({
      city: store.getState().city,
    });
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
