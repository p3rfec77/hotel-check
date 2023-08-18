import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Auth, Hotels } from "./routes";

import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hotels />} />
      <Route path="auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
