import TrafficLights from "../TrafficLights";
import StatsBar from "../StatsBar";

export default function Vertical() {
  return (
    <div className="flex flex-col items-center gap-6">
      <StatsBar />
      <TrafficLights />
    </div>
  );
}
