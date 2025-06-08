import React, { useState } from "react";
import styles from "./SettingsPanel.module.css";

const SettingsPanel = ({
  unit,
  toggleUnit,
  reload,
  refreshInterval,
  setRefreshInterval,
}) => {
  const [intervalInput, setIntervalInput] = useState(refreshInterval);

  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value);
    setIntervalInput(value);
    if (!isNaN(value)) {
      setRefreshInterval(value);
    }
  };

  return (
    <div className={styles.panel}>
      <h3>⚙️ Sozlamalar</h3>

      <div className={styles.setting}>
        <label>Birlik: </label>
        <button onClick={toggleUnit}>
          {unit === "metric" ? "°C → °F" : "°F → °C"}
        </button>
      </div>

      <div className={styles.setting}>
        <label>Yangilanish oraliği (sekund): </label>
        <input
          type="number"
          value={intervalInput}
          onChange={handleIntervalChange}
          min="5"
        />
      </div>

      <div className={styles.setting}>
        <button onClick={reload}>🔄 Qayta yuklash</button>
      </div>
    </div>
  );
};

export default SettingsPanel;
