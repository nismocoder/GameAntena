import * as Tooltip from "@radix-ui/react-tooltip";

export default ({ trigger, content, theme = "light" }) => {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
        <Tooltip.Content
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            backgroundColor:
              theme === "light" ? "var(--light)" : "var(--shade-2)",
            color: theme === "light" ? "var(--primary-light)" : "var(--light)"
          }}
        >
          {content}
          <Tooltip.Arrow
            style={{
              fill: theme === "light" ? "var(--light)" : "var(--shade-2)"
            }}
          />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
