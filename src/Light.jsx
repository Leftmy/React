import { motion, useAnimation } from "framer-motion";
import { useTrafficLights } from "./context/TrafficLightsContext";
import PropTypes from "prop-types";

const Light = ({ tlColor, blinkCount = 2, blinkBrightness = 1.5 }) => {
  const controls = useAnimation();
  const { changeLight } = useTrafficLights();

  const handleClick = async () => {
    await changeLight(tlColor);

    for (let i = 0; i < blinkCount; i++) {
      await controls.start({ opacity: 0.2, filter: `brightness(${blinkBrightness})` });
      await controls.start({ opacity: 1, filter: "brightness(1)" });
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      animate={controls}
      className="w-12 h-12 rounded-full m-4 cursor-pointer"
      style={{ backgroundColor: tlColor }}
    />
  );
};

Light.propTypes = {
  tlColor: PropTypes.string.isRequired,
  blinkCount: PropTypes.number,
  blinkBrightness: PropTypes.number,
};

export default Light;
