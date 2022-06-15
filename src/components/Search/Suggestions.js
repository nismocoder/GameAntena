import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Loader from '../Loader/Loader';
import styled from 'styled-components';

const Suggestions = ({
  isLoading = false,
  searchSuggestions = {
    notLive: [],
    live: [],
  },
  textInput = '',
  submitSearch = () => {},
  thumbnailSize = 30,
  pathname = '/',
}) => {
  const getPathBasedHref = (pathname = '/', channel) => {
    if (pathname === '/twitch-gaming')
      return `https://twitch.tv/${channel.user_name}`;

    if (pathname === '/youtube-gaming') {
      if (channel.is_live) return `https://youtube.com/watch?v=${channel.id}`;

      return `https://youtube.com/channel/${channel.id}`;
    }
  };

  const getPathBasedChannelName = (pathname = '/', channel) => {
    if (pathname === '/twitch-gaming') return channel.user_name;

    if (pathname === '/youtube-gaming') return channel.channel_name;
  };

  return (
    <StyledSuggestions>
      {isLoading ? (
        <div className='loader'>
          <Loader />
        </div>
      ) : (
        <>
          {searchSuggestions.live.length > 0 &&
            searchSuggestions.live.map((channel) => (
              <a
                href={getPathBasedHref(pathname, channel)}
                target='_blank'
                className='suggestion hoverable'
                key={channel.id}
                rel='noreferrer'
              >
                <div className='info'>
                  <img
                    className='thumbnail'
                    width={thumbnailSize}
                    height={thumbnailSize}
                    src={channel.thumbnail_url}
                    alt={`${getPathBasedChannelName(
                      pathname,
                      channel,
                    )}'s thumbnail`}
                  />
                  <p>{getPathBasedChannelName(pathname, channel)}</p>
                </div>
                <div className='live'>Live</div>
              </a>
            ))}
          {searchSuggestions.notLive.length > 0 &&
            searchSuggestions.notLive.map((channel) => (
              <a
                href={getPathBasedHref(pathname, channel)}
                target='_blank'
                className='suggestion hoverable'
                key={channel.id}
                rel='noreferrer'
              >
                <div className='info'>
                  <img
                    className='thumbnail'
                    width={thumbnailSize}
                    height={thumbnailSize}
                    src={channel.thumbnail_url}
                    alt={`${getPathBasedChannelName(
                      pathname,
                      channel,
                    )}'s thumbnail`}
                  />
                  <p>{getPathBasedChannelName(pathname, channel)}</p>
                </div>
              </a>
            ))}
        </>
      )}

      {textInput && (
        <div className='suggestion term hoverable' onClick={submitSearch}>
          <div className='info'>
            <FontAwesomeIcon className='icon hoverable' icon={faSearch} />
            <p>{textInput}</p>
          </div>
        </div>
      )}
    </StyledSuggestions>
  );
};

const StyledSuggestions = styled.div`
  position: absolute;

  .loader {
    background-color: var(--light);
    padding: 1rem 0;
  }

  top: 100%;
  width: 100%;

  .suggestion {
    background-color: var(--light);
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--primary);

    .info {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      .thumbnail {
        border-radius: 50%;
      }

      .icon {
        font-size: 1.3rem;
      }

      p {
        color: var(--primary);
      }
    }

    .live {
      background-color: var(--danger);
      font-size: 0.9rem;
      color: var(--light);
      padding: 0.1rem 0.5rem;
      border-radius: 3px;
    }
  }

  .suggestion.term {
    padding: 1rem 1.7rem;

    .info {
      gap: 1rem;
    }
  }
`;

export default Suggestions;
