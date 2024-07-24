import React, {useContext} from "react";
import {ThemeContext} from "./ThemeContext";

const ThemeToggleButton = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"} Theme
        </button>
    );
};

export default ThemeToggleButton;