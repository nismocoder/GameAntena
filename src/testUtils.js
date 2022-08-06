import * as React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// eslint-disable-next-line import/prefer-default-export
export const renderReduxConnected = (
  ui,
  reducers = {},
  renderOptions = { withReactQuery: false, withRouter: false, route: "/" }
) => {
  const { withReactQuery, withRouter, route } = renderOptions;

  const user = userEvent.setup();

  const store = configureStore({ reducer: { ...reducers } });

  function Wrapper({ children }) {
    if (withRouter) {
      if (withReactQuery) {
        const queryClient = new QueryClient();

        return (
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
            </Provider>
          </QueryClientProvider>
        );
      }

      return (
        <Provider store={store}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </Provider>
      );
    }

    if (withReactQuery && !withRouter) {
      const queryClient = new QueryClient();

      return (
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      );
    }

    return <Provider store={store}>{children}</Provider>;
  }

  return {
    user,
    store,
    ...render(ui, {
      wrapper: Wrapper
    })
  };
};
