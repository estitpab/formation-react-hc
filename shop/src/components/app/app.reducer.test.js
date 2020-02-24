import { initialState, reducer } from "./app.reducer";
import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesError
} from "./app.actions";

// TODO fix (on a viré les action creators)
describe.skip("App reducer", () => {
  test("start", () => {
    const state = reducer(initialState, getCategoriesStart());
    expect(state.categories).toHaveProperty("loading", true);
  });

  test("success", () => {
    const state = reducer(initialState, getCategoriesSuccess(["toto"]));
    expect(state.categories).toHaveProperty("loading", false);
    expect(state.categories).toHaveProperty("result", ["toto"]);
  });

  test("error", () => {
    const state = reducer(initialState, getCategoriesError(new Error("oops")));
    expect(state).toMatchSnapshot();
  });
});
