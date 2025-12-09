import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TrafficLightsContext = createContext();

const API = "https://script.google.com/macros/s/AKfycbxu4pO3VS_QROxkHxAk-DbpAEuksZeW46WDd9c3RQs_eqdsEAuK6YqVTZUZszoipDJt/exec";

export const TrafficLightsProvider = ({ children }) => {
  const location = useLocation();
  const [direction, setDirection] = useState("vertical");
  const [currentLight, setCurrentLight] = useState(null);

  useEffect(() => {
    if (location.pathname.includes("horizontal")) setDirection("horizontal");
    else if (location.pathname.includes("vertical")) setDirection("vertical");
    else setDirection("vertical");
  }, [location.pathname]);

  useEffect(() => {
    if (!direction) return;

    const callbackName = "jsonpCallback_" + Math.random().toString(36).substring(2);

    window[callbackName] = (data) => {
      setCurrentLight({
        direction,
        color: data.lights[direction],
        stats: data.stats[direction]
      });
      delete window[callbackName];
      document.body.removeChild(script);
    };

    const script = document.createElement("script");
    script.src = `${API}?action=getLights&callback=${callbackName}`;
    document.body.appendChild(script);

    return () => {
      if (window[callbackName]) delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [direction]);

  const changeLight = (newColor) => {
    if (!currentLight) return;

    return new Promise((resolve, reject) => {
      const callbackName = "jsonpCallbackSet_" + Math.random().toString(36).substring(2);

      window[callbackName] = (data) => {
        delete window[callbackName];
        document.body.removeChild(script);

        if (data.error) {
          console.error("Error updating light:", data.error);
          reject(data.error);
        } else if (data.lights && data.stats && data.stats[currentLight.direction]) {
          setCurrentLight({
            direction: currentLight.direction,
            color: newColor,
            stats: data.stats[currentLight.direction]
          });
          resolve(data);
        } else {
          console.error("Unexpected response:", data);
          reject("Unexpected response");
        }
      };

      const script = document.createElement("script");
      script.src = `${API}?action=setLight&direction=${currentLight.direction}&color=${newColor}&callback=${callbackName}`;
      document.body.appendChild(script);
    });
  };

  const toggleDirection = () => {
    const newDirection = direction === "vertical" ? "horizontal" : "vertical";
    setDirection(newDirection);
  };

  const color = currentLight?.color || "red";
  const stats = currentLight?.stats || { red: 0, yellow: 0, green: 0 };

  return (
    <TrafficLightsContext.Provider
      value={{ color, stats, direction, changeLight, toggleDirection }}
    >
      {children}
    </TrafficLightsContext.Provider>
  );
};

export const useTrafficLights = () => useContext(TrafficLightsContext);
