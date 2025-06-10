import React, { useState, useEffect, useMemo } from "react";
import styles from "./CitySelector.module.css";
import { debounce } from "../../utils/debounce";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { cities } from "../../data/cityData";

export default function CitySelector({ city, changeCity }) {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  const [filteredCities, setFilteredCities] = useState(cities);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const filtered = cities.filter((c) =>
          c.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCities(filtered);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSelect = (selectedCity) => {
    setSearch(selectedCity);
    setShowList(false);
  };

  const onSubmit = () => {
    changeCity(search);
    setSearch("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inpDiv}>
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={onChange}
          className={styles.input}
          onFocus={() => setShowList(true)}
        />
        {showList ? (
          <FaAngleUp
            className={styles.icon}
            onClick={() => setShowList(!showList)}
          />
        ) : (
          <FaAngleDown
            className={styles.icon}
            onClick={() => setShowList(!showList)}
          />
        )}
        {showList && (
          <ul className={styles.list}>
            {filteredCities.map((c, i) => (
              <li
                key={i}
                onClick={() => onSelect(c)}
                className={c === city ? styles.selected : ""}
              >
                {c}
              </li>
            ))}
            {filteredCities.length === 0 && <li>No cities found</li>}
          </ul>
        )}
      </div>
      <button className={styles.btn} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}
