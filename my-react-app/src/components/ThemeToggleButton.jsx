import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; // Ensure this path is correct
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon Icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun Icon

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle-container">
      <IconButton onClick={toggleTheme}>
        {theme === "light" ? <Brightness4Icon sx={{ color: 'black' }}/> : <Brightness7Icon sx={{ color: 'white' }}/>}
      </IconButton>
    </div>
  );
};

export default ThemeToggleButton;
