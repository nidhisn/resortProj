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
import HeroSection from "./Components/HeroSection/HeroSection";
import Book from "./Components/Book/Book";
import Faqs from "./Components/Faqs/Faqs";
import Gallery from "./Components/Gallery/Gallery";
import LoaderWrapper from "./Components/Loader/LoaderWrapper"; // <-- import wrapper
import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import SmoothScrollProvider from "./SmoothScrollProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ConditionalHome() {
  const [useThreeHome, setUseThreeHome] = useState(() => {
    if (typeof window === "undefined") return false;
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqPointerFine = window.matchMedia("(pointer: fine)");
    return mqDesktop.matches && mqPointerFine.matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqPointerFine = window.matchMedia("(pointer: fine)");

    const handleChange = () => {
      setUseThreeHome(mqDesktop.matches && mqPointerFine.matches);
    };

    if (mqDesktop.addEventListener) {
      mqDesktop.addEventListener("change", handleChange);
      mqPointerFine.addEventListener("change", handleChange);
    } else {
      mqDesktop.addListener(handleChange);
      mqPointerFine.addListener(handleChange);
    }

    handleChange();

    return () => {
      if (mqDesktop.removeEventListener) {
        mqDesktop.removeEventListener("change", handleChange);
        mqPointerFine.removeEventListener("change", handleChange);
      } else {
        mqDesktop.removeListener(handleChange);
        mqPointerFine.removeListener(handleChange);
      }
    };
  }, []);

  return useThreeHome ? <Home /> : <HeroSection />;
}

function App() {
  const footerRef = useRef(null);
  const location = useLocation();
  const [isHeroHome, setIsHeroHome] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqPointerFine = window.matchMedia("(pointer: fine)");

    const evaluate = () => {
      const useThreeHome = mqDesktop.matches && mqPointerFine.matches;
      setIsHeroHome(!useThreeHome);
    };

    if (mqDesktop.addEventListener) {
      mqDesktop.addEventListener("change", evaluate);
      mqPointerFine.addEventListener("change", evaluate);
    } else {
      mqDesktop.addListener(evaluate);
      mqPointerFine.addListener(evaluate);
    }

    evaluate();

    return () => {
      if (mqDesktop.removeEventListener) {
        mqDesktop.removeEventListener("change", evaluate);
        mqPointerFine.removeEventListener("change", evaluate);
      } else {
        mqDesktop.removeListener(evaluate);
        mqPointerFine.removeListener(evaluate);
      }
    };
  }, []);

  const shouldShowFooter =
    !["/gallery"].includes(location.pathname) &&
    !(location.pathname === "/" && isHeroHome);

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
            <Route path="/" element={<ConditionalHome />} />
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
