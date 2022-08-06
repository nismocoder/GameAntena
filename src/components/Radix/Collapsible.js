import * as Collapsible from "@radix-ui/react-collapsible";

export default ({ trigger, content, open = false }) => {
  return (
    <Collapsible.Root open={open}>
      <Collapsible.Trigger asChild>{trigger}</Collapsible.Trigger>
      <Collapsible.Content asChild>{content}</Collapsible.Content>
    </Collapsible.Root>
  );
};
