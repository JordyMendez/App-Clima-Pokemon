import axios from "axios";

export const getWeather = async (location: string) => {
  // 1. Obtener coordenadas desde el nombre de la ciudad o país
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;

  const geoResponse = await axios.get(geoUrl);
  const results = geoResponse.data.results;

  if (!results || results.length === 0) {
    throw new Error("No se encontraron coordenadas para la ubicación ingresada.");
  }

  const { latitude, longitude } = results[0];

  // 2. Usar coordenadas para obtener el clima actual
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const weatherResponse = await axios.get(weatherUrl);
  return weatherResponse.data.current_weather;
};
