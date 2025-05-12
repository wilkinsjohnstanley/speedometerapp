import { useEffect, useState } from "react";

const Home = () => {
  const [speed, setSpeed] = useState<number | null>(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const rawSpeed = position.coords.speed;
        const speedKmh = rawSpeed !== null ? Math.round(rawSpeed * 3.6) : 0;
        setSpeed(speedKmh);
      },
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Speedometer</h1>
      <div className="w-64 h-64 rounded-full border-8 border-green-500 flex items-center justify-center">
        <span className="text-5xl font-extrabold">
          {speed !== null ? speed : 0} km/h
        </span>
      </div>
      <p className="mt-6 text-sm text-gray-400">
        Start moving to see speed update
      </p>
    </div>
  );
};

export default Home;
