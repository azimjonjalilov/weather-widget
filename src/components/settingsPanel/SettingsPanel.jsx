import React, { useRef } from "react";
import styles from "./SettingsPanel.module.css";

const SettingsPanel = ({
  isSetting,
  setIsSetting,
  unit,
  toggleUnit,
  reload,
}) => {
  const refreshInpRef = useRef();

  const handleReload = () => {
    const time = +refreshInpRef.current.value;
    console.log(time);

    reload(time);
    refreshInpRef.current.value = "";
    setIsSetting(false);
  };
  return (
    <div className={`${styles.container} ${isSetting ? styles.active : ""}`}>
      <div className={styles.content}>
        <div className={styles.setting}>
          <label>Birlik: </label>
          <button onClick={toggleUnit}>
            {unit === "metric" ? "°C → °F" : "°F → °C"}
          </button>
        </div>

        <div className={styles.setting}>
          <label>Yangilanish oraliği (sekund): </label>
          <input ref={refreshInpRef} type="number" min="5" />
        </div>
        <div className={styles.setting}>
          <button onClick={handleReload}>Qayta yuklash</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
