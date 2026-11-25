
import React, { useState } from "react";
import Login from "./Login.jsx";
import MusicPlayer from "./MelodyPlayer.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <MusicPlayer />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
