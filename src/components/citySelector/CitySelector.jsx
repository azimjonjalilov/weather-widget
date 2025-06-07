import React, { useState } from "react";
import styles from "./CitySelector.module.css";

const CitySelector = ({ city, changeCity }) => {
  const [inputValue, setInputValue] = useState(city);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed || !/^[a-zA-Z\s]+$/.test(trimmed)) {
      setError("Iltimos, to‘g‘ri shahar nomini kiriting.");
      return;
    }

    changeCity(trimmed);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <input
        type="text"
        value={inputValue}
        placeholder="Shahar nomini yozing"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Izlash</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default CitySelector;
