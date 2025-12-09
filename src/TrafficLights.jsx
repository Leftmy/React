import Light from "./Light";
import { useTrafficLights } from "./context/TrafficLightsContext";

const TrafficLights = () => {
  const { direction } = useTrafficLights();
  const isVertical = direction === "vertical";

  return (
    <div
      className={`flex items-center justify-center p-4 rounded-lg gap-4 ${
        isVertical ? "flex-col" : "flex-row"
      } bg-warning`}
    >
      <Light tlColor="red" blinkCount={5} blinkBrightness={2} />
      <Light tlColor="yellow" blinkCount={3} blinkBrightness={1.5} />
      <Light tlColor="green" blinkCount={4} blinkBrightness={1.8} />
    </div>
  );
};

export default TrafficLights;
