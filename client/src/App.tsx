import { useContext } from "react";

import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import City from "./pages/[city]";
import { GlobalStateContext } from "./state";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const state = useContext(GlobalStateContext);

  return (
    <>
      <Routes>
        <Route index element={<Index />} />
        {/* check if user isLoggedIn */}
        <Route
          path="/:city"
          element={<ProtectedRoute isLoggedIn={state.isLoggedIn} />}>
          <Route path="/:city/" element={<City />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
