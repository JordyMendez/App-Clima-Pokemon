import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../services/wather";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function Weather() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", search],
    queryFn: () => getWeather(search),
    enabled: !!search,
  });

  return (
    <div className="bg-background text-foreground border border-border rounded-2xl " >
      <div className="w-full max-w-lg bg-white dark:bg-[#1e1e2f] border border-border rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-foreground dark:text-white">
          Consulta del Clima
        </h1>

        <Input
          placeholder="Ciudad (ej. Quito, Guayaquil, Manabí)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="text-black placeholder-white/60"
        />

        <div className="space-y-4">
          <Button className="w-full" onClick={() => setSearch(city)}>
            Consultar
          </Button>
          <Button  className="w-full" onClick={() => navigate({ to: "/pokemon" })}>
            Volver a Pokémon
          </Button>
        </div>

        <div className="mt-6 text-center">
          {isLoading && <p className="text-muted-foreground">Cargando clima...</p>}
          {isError && <p className="text-destructive">Ciudad no válida o no disponible</p>}
          {data && (
            <div className="bg-muted p-6 rounded-xl shadow-lg space-y-2">
              <p className="text-xl font-semibold text-foreground">🌡 Temperatura: {data.temperature}°C</p>
              <p className="text-foreground">💨 Viento: {data.windspeed} km/h</p>
              <p className="text-foreground">⛅ Clima: {data.weathercode}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
