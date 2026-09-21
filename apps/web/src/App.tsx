import { HashRouter } from "react-router-dom";
import AppRoutes from "./router/routes";
import { StoreProvider } from "./store/storeProvider.tsx";
import { QueryClientProviderC } from "./providers/tanstack.tsx";

function App() {
  return (
    <QueryClientProviderC>
      <StoreProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </StoreProvider>
    </QueryClientProviderC>
  );
}

export default App;
