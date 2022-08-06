import { useQuery } from "react-query";
import { getYoutubeTopGamingStreams } from "../../services/streams/youtubeStreams";
import { getUserYoutubeData } from "../../services/user/youtubeData";

export const useGetUserYoutubeData = (accessToken = "", pathname = "") => {
  const initialYoutubeData = {
    youtube_user_id: "",
    youtube_display_name: "My YouTube Channel",
    youtube_display_picture:
      "https://yt3.ggpht.com/XvMwB4gwGxnMUZZIMPNw6eZgebSCJskpko45RfqMT_jKFBgohCUsAB4wc0LYJbaiLA17Aw6pUw=s600-c-k-c0x00ffffff-no-rj-rp-mo",
    subscribers: [],
    youtube_subscribers_count: 69420
  };

  const onlyFetchIf = () => {
    if (accessToken && !pathname) return true;

    /**
     *  If pathname is supplied,
     *  validate it to only fetch to certain pathnames
     */
    if (
      accessToken &&
      (pathname === "/youtube-gaming" || pathname === "/my-profile")
    )
      return true;

    return false;
  };

  const { data: userYoutubeData, isLoading: userYoutubeDataLoading } = useQuery(
    "user-youtube-data",
    () => getUserYoutubeData(accessToken),
    {
      initialData: initialYoutubeData,
      enabled: onlyFetchIf(),
      refetchOnWindowFocus: false
    }
  );

  return { userYoutubeData, userYoutubeDataLoading };
};

export const useGetYoutubeTopGamingStreams = () => {
  const {
    data: youtubeTopGamingStreams,
    isLoading,
    error
  } = useQuery("top-youtube-gaming-streams", getYoutubeTopGamingStreams, {
    refetchOnWindowFocus: false
  });

  return {
    youtubeTopGamingStreams,
    isLoading,
    error
  };
};
