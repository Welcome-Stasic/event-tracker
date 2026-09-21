import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./router/routes";
import { QueryClientProviderC } from "./providers/tanstack";
import { StoreProvider } from "./store/storeProvider";
import { NuqsAdapter } from "nuqs/adapters/react";

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <QueryClientProviderC>
      <StoreProvider>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>
      </StoreProvider>
    </QueryClientProviderC>
  );
};

export default App;
