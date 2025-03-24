"use client";
import { useEffect, useState } from "react";

type Warframe = {
  name: string;
  image: string;
};

export default function WarframesPage() {
  const [warframes, setWarframes] = useState<Warframe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/warframes")
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched warframes:", data);
        setWarframes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch Warframes:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid rounded-full border-primary border-t-transparent"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Warframes Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {warframes.map((warframe) => (
          <div
            key={warframe.name}
            className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={warframe.image}
                alt={warframe.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                onError={() => console.log(`Image failed to load: ${warframe.image}`)}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{warframe.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
