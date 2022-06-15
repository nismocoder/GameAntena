import styled from 'styled-components';

export default styled.div`
  a {
    display: flex !important;
    width: 100%;
    max-width: 20rem;
    gap: 1rem;
  }

  .thumbnail {
    border-radius: 50%;
  }

  .info {
    overflow: hidden;

    .username,
    .channel-name {
      hyphens: auto;
      color: var(--primary);
      font-size: 1.1rem;
    }

    .followers,
    .subscribers {
      font-size: 0.9rem;
    }
  }
`;
