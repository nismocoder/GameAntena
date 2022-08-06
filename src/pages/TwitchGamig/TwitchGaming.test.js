import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TwitchGaming from "./TwitchGaming";
import { renderReduxConnected } from "../../testUtils";
import { searchStreamsReducer, uiReducer } from "../../redux/reducers";

import {
  useGetUserTwitchData,
  useGetTwitchTopGamingStreams
} from "../../hooks/queries/twitchQueries";

import { getSearchTwitch } from "../../services/streams/twitchStreams";

import Login from "../auth/Login";
import { persistToken } from "../../utils/auth";
import { useGetUserData } from "../../hooks/queries/userQueries";

jest.mock("../../hooks/queries/userQueries.js", () => {
  return {
    useGetUserData: jest.fn()
  };
});

jest.mock("../../hooks/queries/twitchQueries.js", () => {
  return {
    useGetUserTwitchData: jest.fn(),
    useGetTwitchTopGamingStreams: jest.fn()
  };
});

jest.mock("../../services/streams/twitchStreams", () => {
  return {
    getSearchTwitch: jest.fn()
  };
});

window.scrollTo = jest.fn();

const reducers = {
  ui: uiReducer,
  searchStreams: searchStreamsReducer
};

describe("TwitchGaming page - /twitch-gaming", () => {
  beforeEach(() => {
    useGetUserTwitchData.mockImplementation(() => {
      return {
        userTwitchData: {}
      };
    });

    useGetTwitchTopGamingStreams.mockImplementation(() => {
      return {
        twitchTopGamingStreams: []
      };
    });

    useGetUserData.mockImplementation(() => {
      return { userData: {} };
    });
  });

  describe("Channel menu", () => {
    test("Show channel menu cover (No Twitch account linked yet)", () => {
      renderReduxConnected(<TwitchGaming />, reducers, {
        withReactQuery: true,
        withRouter: true,
        route: "/twitch-gaming"
      });

      expect(screen.getByText(/link your twitch account/i)).toBeInTheDocument();
    });

    test("Show the actual channel menu (Twitch account's linked)", () => {
      useGetUserTwitchData.mockImplementation(() => {
        return {
          userTwitchData: {
            twitch_user_id: "twitch-id",
            twitch_followers_count: 15420,
            twitch_display_name: "ActualTwitchChannel",
            twitch_display_picture:
              "https://static-cdn.jtvnw.net/jtv_user_pictures/54c59710-6f7a-44f9-b1a1-75b8a3d38ce7-profile_image-300x300.png",
            subscribers: [],
            twitch_channel_qualified: true
          }
        };
      });

      renderReduxConnected(<TwitchGaming />, reducers, {
        withReactQuery: true,
        withRouter: true,
        route: "/twitch-gaming"
      });

      expect(screen.getByText(/ActualTwitchChannel/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/link your twitch account/i)
      ).not.toBeInTheDocument();
    });

    describe("Should show/hide correctly", () => {
      const hiddenChannelMenu = async () => {
        await waitFor(() => {
          expect(screen.getByTestId("channel-menu-drawer")).toBeInTheDocument();
        });
        await waitFor(() =>
          expect(screen.queryByTestId("channel-menu")).not.toBeInTheDocument()
        );
      };

      const shownChannelMenu = async () => {
        await waitFor(() => {
          expect(
            screen.queryByTestId("channel-menu-drawer")
          ).not.toBeInTheDocument();
        });

        await waitFor(() => {
          expect(screen.getByTestId("channel-menu")).toBeInTheDocument();
        });
      };

      test("With channel menu cover (No account linked yet)", async () => {
        const { user } = renderReduxConnected(<TwitchGaming />, reducers, {
          withReactQuery: true,
          withRouter: true,
          route: "/twitch-gaming"
        });

        // Check if close button is on screen (channel menu cover)
        const initialCloseButton = screen.getByTestId("close-icon");
        expect(initialCloseButton).toBeInTheDocument();

        // Channel menu will be hidden and the drawer will be shown
        await act(async () => {
          const userClick = await user.click(initialCloseButton);
          return userClick;
        });

        await hiddenChannelMenu();

        // Channel menu will be shown and the drawer will be hidden
        await user.hover(screen.getByTestId("channel-menu-drawer"));

        await shownChannelMenu();

        // Channel menu will be hidden and the drawer will be shown
        await user.click(screen.getByTestId("close-icon"));

        await hiddenChannelMenu();
      });

      test("Without channel menu cover (Twitch account's linked)", async () => {
        useGetUserTwitchData.mockImplementation(() => {
          return {
            userTwitchData: {
              twitch_user_id: "twitch-id",
              twitch_followers_count: 15420,
              twitch_display_name: "SomeTwitchChannel",
              twitch_display_picture:
                "https://static-cdn.jtvnw.net/jtv_user_pictures/54c59710-6f7a-44f9-b1a1-75b8a3d38ce7-profile_image-300x300.png",
              subscribers: [],
              twitch_channel_qualified: true
            }
          };
        });

        const { user } = renderReduxConnected(<TwitchGaming />, reducers, {
          withReactQuery: true,
          withRouter: true,
          route: "/twitch-gaming"
        });

        const hideButton = screen.getByTestId("hide-button");
        expect(hideButton).toBeInTheDocument();

        // Channel menu will be hidden and the drawer will be shown
        user.click(hideButton);

        await hiddenChannelMenu();

        // Channel menu will be shown and the drawer will be hidden
        await user.hover(screen.getByTestId("channel-menu-drawer"));

        await shownChannelMenu();

        // Channel menu will be hidden and the drawer will be shown
        await user.click(screen.getByTestId("hide-button"));

        await hiddenChannelMenu();
      });
    });

    describe("Link Twitch account should work correctly", () => {
      test("Should redirect not logged in user to login page", async () => {
        const { user } = renderReduxConnected(
          <Routes>
            <Route path="/twitch-gaming" element={<TwitchGaming />} />
            <Route path="/login" element={<Login />} />
          </Routes>,
          reducers,
          { withReactQuery: true, withRouter: true, route: "/twitch-gaming" }
        );

        const linkButton = screen
          .getByText(/Link your Twitch account/i)
          .closest("a");

        await act(async () => {
          const userClick = await user.click(linkButton);
          return userClick;
        });
        await waitFor(() => {
          expect(
            screen.getByText(/Welcome to Game-Antena/i)
          ).toBeInTheDocument();
        });
      });

      test("Should redirect logged in user to twitch authentication page", async () => {
        persistToken("valid-access-token");

        useGetUserData.mockImplementation(() => {
          return {
            userData: {
              id: "user-id",
              displayName: "hey",
              email: "hey@gmail.com"
            }
          };
        });

        renderReduxConnected(<TwitchGaming />, reducers, {
          withReactQuery: true,
          withRouter: true,
          route: "/twitch-gaming"
        });

        const linkButton = screen
          .getByText(/Link your Twitch account/i)
          .closest("a");

        expect(
          linkButton.href.includes("https://id.twitch.tv/oauth2/authorize")
        ).toBe(true);
      });
    });
  });

  describe("Search", () => {
    test('Should have a placeholder - "Search a Twitch channel or live stream.."', () => {
      renderReduxConnected(<TwitchGaming />, reducers, {
        withReactQuery: true,
        withRouter: true,
        route: "/twitch-gaming"
      });

      expect(
        screen.getByPlaceholderText(/Search a Twitch channel or live stream../i)
      ).toBeInTheDocument();
    });

    test("Should show/hide suggestions on typing/focus/blur", async () => {
      getSearchTwitch.mockImplementation(() => {
        return {
          suggestions: {
            live: [],
            notLive: []
          }
        };
      });

      const { user } = renderReduxConnected(<TwitchGaming />, reducers, {
        withReactQuery: true,
        withRouter: true,
        route: "/twitch-gaming"
      });

      const searchInput = screen.getByPlaceholderText(
        /Search a Twitch channel or live stream../i
      );

      await act(async () => {
        const userInput = await user.type(searchInput, "hey");
        return userInput;
      });

      const suggestionTerm = await screen.findByTestId("suggestion-term-text");

      expect(suggestionTerm).toBeInTheDocument();
      expect(suggestionTerm.textContent).toBe("hey");

      searchInput.blur();

      await waitFor(() => {
        expect(
          screen.queryByTestId("suggestion-term-text")
        ).not.toBeInTheDocument();
      });

      searchInput.focus();

      await waitFor(() => {
        expect(screen.getByTestId("suggestion-term-text")).toBeInTheDocument();
      });
    });
  });

  describe("Top gaming streams", () => {
    test("Successfuly fetched streams", () => {});

    test("Error", () => {});
  });
});
