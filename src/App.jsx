import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import ThingsToDo from "./Components/ThingsToDo/ThingsToDo";
import ExploreIsland from "./Components/ExploreIsland/ExploreIsland";
import Footer from "./Components/Footer/Footer";
import Menu from "./Components/Menu/Menu";
import Resort from "./Components/Resort/Resort";
import Home from "./Components/Home/Home";
import Book from "./Components/Book/Book";
import Faqs from "./Components/Faqs/Faqs";
import Gallery from "./Components/Gallery/Gallery";
import LoaderWrapper from "./Components/Loader/LoaderWrapper"; // <-- import wrapper
import "./App.css";
import React, { useEffect, useRef } from "react";
import SmoothScrollProvider from "./SmoothScrollProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  const footerRef = useRef(null);
  const location = useLocation();

  const shouldShowFooter = !["/gallery"].includes(location.pathname);

  useEffect(() => {
    // Ensure ScrollTrigger recalculates positions on route changes
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div className="app">
      <Menu />
      <Header />
      <main>
        <LoaderWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resort" element={<Resort />} />
            <Route path="/thingstodo" element={<ThingsToDo />} />
            <Route path="/exploretheisland" element={<ExploreIsland />} />
            <Route path="/booking" element={<Book />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </LoaderWrapper>
      </main>
      {shouldShowFooter && <Footer ref={footerRef} />}
    </div>
  );
}

function RootApp() {
  return (
    <SmoothScrollProvider>
      <Router>
        <App />
      </Router>
    </SmoothScrollProvider>
  );
}

export default RootApp;
