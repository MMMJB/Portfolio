import React from "react";

import Cursor from "./Components/Cursor";
import Landing from "./Pages/Landing/Landing";

export default function App() {
  return (
    <div className="max-w-screen h-full min-h-screen w-screen bg-background">
      <Cursor />
      <Landing />
    </div>
  );
}
