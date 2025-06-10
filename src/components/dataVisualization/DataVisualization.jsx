import React, { useState } from "react";
import styles from "./DataVisualization.module.css";

const getWeekDay = (dateStr) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date(dateStr).getDay()];
};

const DataVisualization = ({ data, unit }) => {
  const [hovered, setHovered] = useState(null);

  const width = 770;
  const height = 300;
  const padding = 50;

  const temps = data.map((d) => d.temp_avg);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const xStep = (width - padding * 2) / (data.length - 1);
  const yScale = (val) =>
    height -
    padding -
    ((val - minTemp) / (maxTemp - minTemp)) * (height - padding * 2);

  const points = data.map((d, i) => {
    const x = padding + i * xStep;
    const y = yScale(d.temp_avg);
    return { ...d, x, y };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Temperature Chart</h2>
      <div
        className={styles.chartContainer}
        onMouseLeave={() => {
          setTimeout(() => setHovered(null), 1000);
        }}
      >
        <svg width={width} height={height} className={styles.svgBackground}>
          <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth={2} />

          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={6}
                fill="#3b82f6"
                className={styles.circle}
                onMouseEnter={() => setHovered(p)}
                onMouseLeave={() => {
                  setTimeout(() => {
                    setHovered(null);
                  }, 1000);
                }}
              />
              <text
                x={p.x}
                y={p.y - 12}
                fontSize={10}
                textAnchor="middle"
                fill="#333"
              >
                {p.temp_avg.toFixed(1)}
              </text>
              <text
                x={p.x}
                y={height - 30}
                fontSize={10}
                textAnchor="middle"
                fill="#555"
              >
                {p.date.slice(5)}
              </text>
              <text
                x={p.x}
                y={height - 15}
                fontSize={10}
                textAnchor="middle"
                fill="#777"
              >
                {getWeekDay(p.date)}
              </text>
            </g>
          ))}
        </svg>

        {hovered && (
          <div
            className={styles.tooltip}
            style={{
              top: hovered ? hovered?.y - 100 : "",
              left: hovered ? hovered?.x - 60 : "",
            }}
          >
            <div
              className={styles.tooltipHeader}
              onClick={() => console.log("Hello")}
            >
              <img
                src={`https://openweathermap.org/img/wn/${hovered?.icon}@2x.png`}
                alt={hovered?.description}
                className={styles?.weatherIcon}
              />
              <span className={styles.tooltipDay}>
                {getWeekDay(hovered?.date)}
              </span>
            </div>
            <div className={styles.tooltipDate}>{hovered?.date}</div>
            <div className={styles.tooltipDetails}>
              <div>Avg: {hovered?.temp_avg}°C</div>
              <div>Min: {hovered?.temp_min}°C</div>
              <div>Max: {hovered?.temp_max}°C</div>
              <div className={styles.tooltipDesc}>{hovered?.description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataVisualization;
