// import { streamsReducer, uiReducer } from "../../redux/reducers";
// // import { screen } from "@testing-library/react";
// // import { renderReduxConnected } from "../../testUtils";
// // import YoutubeGaming from "./YoutubeGaming";

// const reducers = {
//   ui: uiReducer,
//   streams: streamsReducer
// };

describe("YoutubeGaming page - /youtube-gaming", () => {
  describe("Channel menu", () => {
    test("Show channel menu cover (No Youtube account linked yet)", () => {
      // renderReduxConnected(<YoutubeGaming />, reducers, {
      //   withReactQuery: true,
      //   withRouter: true,
      //   route: "/youtube-gaming"
      // });
      // expect(
      //   screen.getByText(/link your youtube account/i)
      // ).toBeInTheDocument();
    });

    test("Show the actual channel menu (Twitch account's linked)", () => {});

    describe("Should show/hide correctly", () => {
      test("With channel menu cover (No account linked yet)", async () => {});

      test("Without channel menu cover (Twitch account's linked)", async () => {});
    });

    describe("Link Twitch account should work correctly", () => {
      test("Should redirect not logged in user to login page", async () => {});

      test("Should redirect logged in user to twitch authentication page", async () => {});
    });
  });

  describe("Search", () => {
    test('Should have a placeholder - "Search a Twitch channel or live stream.."', () => {});

    test("Should show/hide suggestions on typing/focus/blur", async () => {});
  });

  describe("Top gaming streams", () => {
    test("Successfuly fetched streams", () => {});

    test("Error", () => {});
  });
});
