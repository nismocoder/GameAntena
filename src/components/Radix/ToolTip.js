import * as Tooltip from '@radix-ui/react-tooltip';

import styled from 'styled-components';
import { ToolTip } from '.';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ trigger, content }) => (
  <Tooltip.Provider delayDuration={500}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {trigger}
      </Tooltip.Trigger>
      <StyledContent style={{ padding: '0.5rem', borderRadius: '5px' }}>
        {content}
        <Tooltip.Arrow style={{ fill: 'white' }} />
      </StyledContent>
    </Tooltip.Root>
  </Tooltip.Provider>
);

const StyledContent = styled(Tooltip.TooltipContent)`
  background-color: white;
`;