import WeatherWidget from "./components/weatherWidget/WeatherWidget";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import { ErrorBoundary } from "./components/errorBoundary/ErrorBoundary";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="app">
          <WeatherWidget />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
