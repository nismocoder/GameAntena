import React from 'react';

import styled from 'styled-components';

import { Nav, Card, TextSection, Footer, ScrollUp } from '../components';

import headerBG from '../img/header-bg.webp';
import antenaIcon from '../img/logo/antena-icon.webp';

import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  React.useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <>
      <Nav
        showBars={false}
        showNavLogoText={false}
        showNavSearch={false}
        showAuthOnMobile={true}
      />
      <AboutUsContent>
        <Header>
          <div style={{ backgroundImage: `url(${headerBG})` }} className='text'>
            GAME ANTENA
            <img className='antena' src={antenaIcon} alt='antena-icon' />
          </div>
        </Header>
        <Cards>
          <Card
            icons={[faSearch]}
            description={
              'Browse Top Games & Gaming Streams or search your favorite ones!'
            }
            buttonText={'Show me!'}
            redirectTo='/'
          />
          <Card
            icons={[faYoutube, faTwitch]}
            description={`Easily view your Youtube/Twitch channel's subscribers`}
            buttonText={'View mine!'}
            redirectTo='/twitch-gaming'
          />
        </Cards>
        <AboutText>
          <TextSection heading='Our Purpose'>
            Developing a platform dedicated to gamers and streamers. Imagine a
            platform where you can <strong>browse top games</strong> and{' '}
            <strong>live gaming streams</strong> on youtube/twitch. A platform
            that allows users to link their youtube/twitch account to and easily
            view important channel details such as{' '}
            <strong>channel subuscribers</strong> and{' '}
            <strong>total subscribers count</strong>
          </TextSection>
          <TextSection heading='Our Team'>
            Developing a platform dedicated to gamers and streamers. Imagine a
            platform where you can <strong>browse top games</strong> and{' '}
            <strong>live gaming streams</strong> on youtube/twitch. A platform
            that allows users to link their youtube/twitch account to and easily
            view important channel details such as{' '}
            <strong>channel subuscribers</strong> and{' '}
            <strong>total subscribers count</strong>
          </TextSection>
        </AboutText>
      </AboutUsContent>
      <Footer background={'var(--primary)'} textAlign='center' />
      <ScrollUp />
    </>
  );
};

const AboutUsContent = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  row-gap: 1.5rem;
  padding-bottom: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  font-size: 3.5rem;
  font-weight: 800;
  padding-top: 1rem;

  .text {
    background-size: cover;
    position: relative;
    width: min-content;
    margin-left: -1.3rem;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;

    .antena {
      position: absolute;
      bottom: 43%;
      right: 2%;
      width: 4rem;
      transform: translateX(50%);
    }
  }

  @media (min-width: 768px) {
    font-size: 5rem;

    .text {
      margin-left: -1.5rem;

      .antena {
        width: 5.5rem;
      }
    }
  }
`;

const Cards = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  row-gap: 1rem;
  column-gap: 3rem;
  padding: 0 2rem;

  .card {
    max-width: 20rem;
  }

  .card:nth-child(1) {
    border-color: var(--shade-4);
    color: var(--shade-4);
    background-color: var(--shade-4-fade);

    button {
      color: var(--shade-4);
    }

    :hover {
      background-color: var(--shade-4);
      color: var(--light);
    }
  }

  .card:nth-child(2) {
    border-color: var(--shade-2);
    color: var(--shade-2);
    background-color: var(--shade-2-fade);

    button {
      color: var(--shade-2);
    }

    :hover {
      background-color: var(--shade-2);
      color: var(--light);
    }
  }
`;

const AboutText = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-flow: column;
  gap: 2rem;
  padding: 1rem 1.5rem;
`;

export default AboutUs;
