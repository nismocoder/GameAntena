import styled from "styled-components";

export default styled.div`
  overflow: hidden;

  .thumbnail {
    position: relative;
    width: 100%;

    img {
      width: 100%;
      aspect-ratio: 16 / 9;
    }

    .live {
      position: absolute;
      top: 10%;
      left: 2%;
      transform: translateY(-50%);
      color: var(--light);
      font-size: 0.85rem;
      padding: 0rem 0.4rem;
      background-color: var(--danger);
      border-radius: 5px;
    }

    .viewer-count {
      position: absolute;
      top: 90%;
      left: 2%;
      transform: translateY(-50%);
      color: var(--light);
      font-size: 0.85rem;
      padding: 0rem 0.25rem;
      background-color: var(--dark-fade);
      border-radius: 2px;
    }
  }

  .info {
    padding: 0.5rem 0.5rem;

    .title {
      color: var(--primary);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 1.1rem;
    }

    .channel-name {
      font-size: 0.9rem;
    }
  }

  @media (min-width: 768px) {
    .thumbnail {
      width: fit-content;
    }

    .info {
      padding: 0.5rem 0;
    }
  }
`;
