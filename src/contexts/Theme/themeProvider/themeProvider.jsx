import React, { useState } from 'react';
import ThemeContext from '../themeContext';
const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const mode = {
        darkMode,
        setDarkMode
    }
    return (
        <ThemeContext value={mode}>
            {children}
        </ThemeContext>

    );
};
export default ThemeProvider;