import { useState } from "react";
import "./App.css";

import Header from "./Components/Header/Header";
import HeroSection from "./Components/HeroSection/HeroSection";
import ThingsToDo from "./Components/ThingsToDo/ThingsToDo";
import ExploreIsland from "./Components/ExploreIsland/ExploreIsland";
import Footer from "./Components/Footer/Footer";
import Menu from "./Components/Menu/Menu";

function App() {
  return (
    <>
      <div className="app">
        <Menu />
        <main>
          <Header />
          <HeroSection />
          <ThingsToDo />
          <ExploreIsland />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
