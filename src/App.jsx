import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import HeroSection from "./Components/HeroSection/HeroSection";
import ThingsToDo from "./Components/ThingsToDo/ThingsToDo";
import ExploreIsland from "./Components/ExploreIsland/ExploreIsland";
import Footer from "./Components/Footer/Footer";
import Menu from "./Components/Menu/Menu";
import Resort from "./Components/Resort/Resort";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Menu />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/resort" element={<Resort />} />
            <Route path="/thingstodo" element={<ThingsToDo />} />
            <Route path="/exploretheisland" element={<ExploreIsland />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
