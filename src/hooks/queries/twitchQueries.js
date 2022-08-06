import { useQuery } from "react-query";
import { getTwitchTopGamingStreams } from "../../services/streams/twitchStreams";
import { getUserTwitchData } from "../../services/user/twitchData";

export const useGetUserTwitchData = (accessToken = "", pathname = "") => {
  const initialData = {
    twitch_user_id: "",
    twitch_followers_count: 15420,
    twitch_display_name: "SomeTwitchChannel",
    twitch_display_picture:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/54c59710-6f7a-44f9-b1a1-75b8a3d38ce7-profile_image-300x300.png",
    subscribers: [],
    twitch_channel_qualified: true
  };

  const onlyFetchIf = () => {
    if (accessToken && !pathname) return true;

    /**
     *  If pathname is supplied,
     *  validate it to only fetch to certain pathnames
     */
    if (
      accessToken &&
      (pathname === "/twitch-gaming" || pathname === "/my-profile")
    )
      return true;

    return false;
  };

  const { data: userTwitchData, isLoading: userTwitchDataLoading } = useQuery(
    "user-twitch-data",
    () => getUserTwitchData(accessToken),
    {
      initialData,
      enabled: onlyFetchIf(),
      refetchOnWindowFocus: false
    }
  );

  return { userTwitchData, userTwitchDataLoading };
};

export const useGetTwitchTopGamingStreams = () => {
  const {
    data: twitchTopGamingStreams,
    isLoading,
    error
  } = useQuery("top-twitch-gaming-streams", getTwitchTopGamingStreams, {
    refetchOnWindowFocus: false
  });

  return { twitchTopGamingStreams, isLoading, error };
};
