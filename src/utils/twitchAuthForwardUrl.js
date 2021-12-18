import { randomString } from "./randomString";


export const twitchAuthForwardUrl = ({
  clientId,
  authRedirectUri,
  scope = [],
  email,
}) => {
  const base = `https://id.twitch.tv/oauth2/authorize`;

  if (scope.length > 0) {
    return `${base}?client_id=${clientId}&redirect_uri=${authRedirectUri}&response_type=code&scope=${scope.join(
      '%20',
    )}&state=${randomString(20)}:email${email}:&force_verify=true`;
  }

  throw Error('Must define at least one (1) scope');
};
