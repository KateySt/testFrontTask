import cityReducer, { addCity, removeCity } from "@/store/city/citySlice";

describe("City Slice", () => {
  const initialState = {
    cities: [],
  };

  it("adds a city to the list", () => {
    const actual = cityReducer(initialState, addCity("Kyiv"));
    expect(actual.cities).toContain("Kyiv");
    expect(actual.cities).toHaveLength(1);
  });

  it("does not add a duplicate city", () => {
    const state = { cities: ["Kyiv"] };
    const actual = cityReducer(state, addCity("Kyiv"));
    expect(actual.cities).toHaveLength(1);
  });

  it("removes a city from the list", () => {
    const state = { cities: ["Kyiv", "Lviv"] };
    const actual = cityReducer(state, removeCity("Kyiv"));
    expect(actual.cities).not.toContain("Kyiv");
    expect(actual.cities).toHaveLength(1);
  });

  it("adds multiple cities", () => {
    let state: { cities: string[] } = initialState;
    state = cityReducer(state, addCity("Kyiv"));
    state = cityReducer(state, addCity("Lviv"));
    state = cityReducer(state, addCity("Odesa"));

    expect(state.cities).toHaveLength(3);
    expect(state.cities).toEqual(["Kyiv", "Lviv", "Odesa"]);
  });
});
