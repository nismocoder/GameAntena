import randomString from "./randomString";

const twitchAuthForwardUrl = ({
  clientId,
  authRedirectUri = "",
  scope = [],
  email = "",
  redirectPage = ""
}) => {
  const base = "https://id.twitch.tv/oauth2/authorize";

  if (scope.length > 0) {
    return `${base}?client_id=${clientId}&redirect_uri=${authRedirectUri}&response_type=code&scope=${scope.join(
      "%20"
    )}&state=${randomString(
      20
    )}:email${email}:redirect_page${redirectPage}:&force_verify=true`;
  }

  if (!email) {
    throw Error("Email must be define");
  }

  throw Error("Must define at least one (1) scope");
};

export default twitchAuthForwardUrl;
