import { useState, useContext } from "react";

import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import City from "./pages/[city]";
import "./App.css";
import { GlobalStateContext } from "./state";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

function App() {
  const state = useContext(GlobalStateContext);

  return (
    <>
      <NavBar isLoggedIn={state.isLoggedIn} user={state.user} />
      <Routes>
        <Route
          index
          element={<Index isLoggedIn={state.isLoggedIn} user={state.user} />}
        />
        {/* check if user and user.isLoggedIn */}
        {/* Can use <Outlet /> if there are multiple protected routes */}
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
