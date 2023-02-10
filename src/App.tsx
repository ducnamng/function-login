import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./page/PrivateRoute";
import AuthScreen from "./page/AuthScreen";
import HomeScreen from "./page/HomeScreen";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<AuthScreen />} />
        <Route
          path="/"
          element={<PrivateRoute>{<HomeScreen />}</PrivateRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
