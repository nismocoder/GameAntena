import * as Collapsible from '@radix-ui/react-collapsible';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ trigger, content, open = false }) => (
  <Collapsible.Root open={open}>
    <Collapsible.Trigger asChild>{trigger}</Collapsible.Trigger>
    <Collapsible.Content asChild>{content}</Collapsible.Content>
  </Collapsible.Root>
);
