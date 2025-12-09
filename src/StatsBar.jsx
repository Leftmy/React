import { useNavigate } from "react-router-dom";
import { useTrafficLights } from "./context/TrafficLightsContext";
import { useAuth } from "./context/AuthContext";

const StatsBar = () => {
  const { user } = useAuth();

  if (!user)
    return (
      <p className="text-center text-lg">
        Увійдіть, щоб керувати світлофором
      </p>
    );

  const navigate = useNavigate();
  const { stats, direction, toggleDirection } = useTrafficLights();

  const handleSwitch = () => {
    toggleDirection();
    navigate(direction === "vertical" ? "/horizontal" : "/vertical");
  };

  return (
    <div className="card p-6 flex flex-col items-center gap-4 shadow-md rounded-lg bg-base-100">
      <button
        className="btn bg-white text-black border border-black hover:bg-gray-100 px-8 py-8 w-60 font-bold"
        onClick={handleSwitch}
      >
        Змінити вигляд ({direction === "vertical" ? "горизонтальний" : "вертикальний"})
      </button>
      <div className="text-center">
        <p>Red — {stats.red}</p>
        <p>Yellow — {stats.yellow}</p>
        <p>Green — {stats.green}</p>
      </div>
    </div>
  );
};

export default StatsBar;
