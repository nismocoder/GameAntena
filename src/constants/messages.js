import { Link } from "react-router-dom";

// eslint-disable-next-line import/prefer-default-export
export const getPopupMessage = () => {
  return (
    <>
      By using Game-Antena&apos;s service you agree to our{" "}
      <Link to="/privacy-policy">Privacy policy</Link> and its{" "}
      <Link to="/terms-and-conditions">Terms</Link>. Game-Antena also uses
      YouTube API Services to bring you gaming related experiences from YouTube
    </>
  );
};
