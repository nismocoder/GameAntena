import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchedSearchGames } from '../../actions/gamesAction';
import {
  fetchSearchTwitch,
  fetchSearchYoutube,
} from '../../actions/streamsAction';
import { getSearchPlaceholder } from '../../utils/basedOnPath';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getSearchTwitch } from '../../services/streams/twitchStreams';
import { useDebouncedCallback } from 'use-debounce';
import Suggestions from './Suggestions';
import { getSearchYoutube } from '../../services/streams/youtubeStreams';

const suggestionsInitialState = {
  notLive: [],
  live: [],
};

const Search = ({
  showSearch,
  setShowSearch,
  pathname,
  textInput,
  setTextInput,
}) => {
  const [searchSuggestions, setSearchSuggestions] = React.useState({
    isLoading: false,
    suggestions: suggestionsInitialState,
  });

  const [isFocusedOnInput, setIsFocusedOnInput] = React.useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTextInput(e.target.value);

    setSearchSuggestions((state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
  };

  const handleInputFocus = useDebouncedCallback(() => {
    setIsFocusedOnInput(true);
  }, 180);

  const handleInputBlur = useDebouncedCallback(() => {
    setIsFocusedOnInput(false);
  }, 180);

  const closeSearch = () => {
    setTextInput('');
    setShowSearch(false);
  };

  const submitSearch = (e) => {
    e.preventDefault();

    if (textInput) {
      if (pathname === '/') dispatch(fetchedSearchGames(textInput));

      if (pathname === '/twitch-gaming') dispatch(fetchSearchTwitch(textInput));

      if (pathname === '/youtube-gaming')
        dispatch(fetchSearchYoutube(textInput));

      if (pathname === '/my-profile') {
        dispatch(fetchedSearchGames(textInput));
        navigate('/');
      }
    }
  };

  const updateSearchSuggestionState = (live = [], notLive = []) => {
    setSearchSuggestions((state) => {
      return {
        ...state,
        isLoading: false,
        suggestions: {
          live,
          notLive,
        },
      };
    });
  };

  const updateSuggestions = useDebouncedCallback(async () => {
    if (pathname === '/twitch-gaming') {
      try {
        const { suggestions } = await getSearchTwitch(textInput);

        updateSearchSuggestionState(suggestions.live, suggestions.not_live);
      } catch (error) {
        setSearchSuggestions((state) => {
          return {
            ...state,
            isLoading: false,
          };
        });
      }
    }

    if (pathname === '/youtube-gaming') {
      try {
        const { suggestions } = await getSearchYoutube(textInput);

        updateSearchSuggestionState(suggestions.live, suggestions.not_live);
      } catch (error) {
        setSearchSuggestions((state) => {
          return {
            ...state,
            isLoading: false,
          };
        });
      }
    }
  }, 150);

  React.useEffect(() => {
    if (textInput === '') return setSearchSuggestions(suggestionsInitialState);

    updateSuggestions();
  }, [textInput, updateSuggestions]);

  return (
    <>
      <div className='mobile search'>
        {!showSearch ? (
          <FontAwesomeIcon
            icon={faSearch}
            onClick={() => setShowSearch(true)}
          />
        ) : (
          <StyledSearchMobile
            onSubmit={submitSearch}
            initial={{ width: '0%', opacity: 0 }}
            animate={{ width: '90%', opacity: 1 }}
            exit={{ width: '0%', opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon
              className='close-icon'
              icon={faTimes}
              onClick={closeSearch}
            />
            <input
              placeholder={getSearchPlaceholder(pathname)}
              value={textInput}
              onChange={handleInputChange}
              type='text'
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {isFocusedOnInput && (
              <Suggestions
                isLoading={searchSuggestions.isLoading}
                searchSuggestions={searchSuggestions.suggestions}
                submitSearch={submitSearch}
                textInput={textInput}
                pathname={pathname}
              />
            )}
          </StyledSearchMobile>
        )}
      </div>
      <StyledSearchDesktop onSubmit={submitSearch} className='desktop'>
        <input
          placeholder={getSearchPlaceholder(pathname)}
          value={textInput}
          onChange={handleInputChange}
          type='text'
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <FontAwesomeIcon
          className='search-icon hoverable'
          icon={faSearch}
          onClick={submitSearch}
        />
        {isFocusedOnInput && (
          <Suggestions
            isLoading={searchSuggestions.isLoading}
            searchSuggestions={searchSuggestions.suggestions}
            submitSearch={submitSearch}
            textInput={textInput}
            thumbnailSize={40}
            pathname={pathname}
          />
        )}
      </StyledSearchDesktop>
    </>
  );
};

const StyledSearchDesktop = styled(motion.form)`
  position: relative;

  .search-icon {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translateY(-50%);
    color: var(--light);
    z-index: 5;
    background-color: var(--shade-2);
    height: 99%;
    width: 1.5rem;
    padding: 0 0.6rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  input {
    width: 100%;
    font-size: 1.2rem;
    border: 1px solid var(--primary);
    background-color: var(--light);
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
`;

const StyledSearchMobile = styled(motion.form)`
  width: 90%;
  text-align: left;
  margin-left: auto;
  position: relative;
  border-radius: 50rem;
  background-color: var(--light);
  padding: 0.3rem 1rem;

  .close-icon {
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: var(--primary-light);
    font-size: 1.5rem;
  }

  input {
    width: 85%;
    font-size: 1.2rem;
    border: none;
    outline: none;
    background: none;
  }
`;

export default Search;
