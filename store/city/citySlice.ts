import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CityState = {
  cities: string[];
};

const initialState: CityState = {
  cities: ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Donetsk"],
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
    },
  },
});

export const { addCity, removeCity } = citySlice.actions;

export default citySlice.reducer;
