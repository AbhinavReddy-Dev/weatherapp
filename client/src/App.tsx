import { useContext } from "react";

import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import City from "./pages/[city]";
import Login from "./pages/login";
import { GlobalStateContext } from "./state";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const state = useContext(GlobalStateContext);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* check if user isLoggedIn */}
        <Route
          path="/"
          element={<ProtectedRoute isLoggedIn={state.isLoggedIn} />}>
          <Route index element={<Index />} />
          <Route path="/:city/" element={<City />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
