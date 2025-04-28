import { WeatherDataDashboard } from "@/lib/definitions";

export async function fetchWeatherDataDashboard(
  lat: number,
  lon: number
): Promise<WeatherDataDashboard> {
  const apiKey = process.env.OPEN_WHEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  return fetch(url, {
    method: "GET",
    next: { revalidate: 60 },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        rainfall: data.rain ? data.rain["1h"] : 0,
        wind: Math.round(data.wind.speed),
        provice: data.name,
      };
    });
}
