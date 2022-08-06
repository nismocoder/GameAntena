import { useDebouncedCallback } from "use-debounce";
import { getSearchTwitch } from "../../services/streams/twitchStreams";
import { getSearchYoutube } from "../../services/streams/youtubeStreams";

// eslint-disable-next-line import/prefer-default-export
export const useUpdateSearchSuggestions = ({
  pathname = "/",
  textInput = "",
  setSearchSuggestions
}) => {
  const updateSearchSuggestionState = (live = [], notLive = []) => {
    setSearchSuggestions((state) => {
      return {
        ...state,
        isLoading: false,
        suggestions: {
          live,
          notLive
        }
      };
    });
  };

  const updateSuggestions = useDebouncedCallback(async () => {
    if (pathname === "/twitch-gaming") {
      try {
        const { suggestions } = await getSearchTwitch(textInput);

        updateSearchSuggestionState(suggestions.live, suggestions.not_live);
      } catch (error) {
        if (error.response) {
          // console.error(error.response.data.message);
          return;
        }

        // console.error(error.message);
        return;
      } finally {
        setSearchSuggestions((state) => {
          return {
            ...state,
            isLoading: false
          };
        });
      }
    }

    if (pathname === "/youtube-gaming") {
      try {
        const { suggestions } = await getSearchYoutube(textInput);

        updateSearchSuggestionState(suggestions.live, suggestions.not_live);
      } catch (error) {
        if (error.response) {
          // console.error(error.response.data.message);
          return;
        }

        // console.error(error.message);
        return;
      } finally {
        setSearchSuggestions((state) => {
          return {
            ...state,
            isLoading: false
          };
        });
      }
    }

    setSearchSuggestions((state) => {
      return {
        ...state,
        isLoading: false
      };
    });
  }, 150);

  return { updateSuggestions };
};
