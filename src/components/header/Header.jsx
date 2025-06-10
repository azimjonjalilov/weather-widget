import styles from "./Header.module.css";
import { useTheme } from "../../context/ThemeContext";
import { FaRegSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <a href="/">Weather Dashboard Widget</a>
      <button onClick={toggleTheme}>
        {theme == "dark" ? (
          <FaRegSun className={styles.icon} />
        ) : (
          <FaMoon className={styles.icon} />
        )}
      </button>
    </header>
  );
};

export default Header;
