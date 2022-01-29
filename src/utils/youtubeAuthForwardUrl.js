import { randomString } from './randomString';

export const youtubeAuthForwardUrl = ({
  clientId,
  authRedirectUri,
  scope = [],
  email,
}) => {
  const base = `https://accounts.google.com/o/oauth2/v2/auth`;

  if (scope.length > 0) {
    return `${base}?client_id=${clientId}&redirect_uri=${authRedirectUri}&response_type=code&scope=${scope.join(
      '%20',
    )}&state=${randomString(20)}:email${email}:&prompt=consent`;
  }

  throw Error('Must define at least one (1) scope');
};
