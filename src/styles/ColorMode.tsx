import { useState } from 'react';

const ColorMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChange = () => {
    setIsDarkMode(prevMode => !prevMode);
    
    if (!isDarkMode) {
      // Change to Light mode
      document.documentElement.style.setProperty('--Eerie-black', '#1C1C1C');
      document.documentElement.style.setProperty('--Olive-black', '#3B3B3B');
      document.documentElement.style.setProperty('--Cali-Gold', '#b28228');
      document.documentElement.style.setProperty('--button-change', '#3b3b3b');
      document.documentElement.style.setProperty('--button-text', '#b28228');
      document.documentElement.style.setProperty('--change-Color-mode', '#b28228');
      document.documentElement.style.setProperty('--color-mode-label', '#ffffff');
      document.documentElement.style.setProperty('--center-slider-change', '#b28228');
    } else {
        // Change to DARK mode
      document.documentElement.style.setProperty('--Eerie-black', '#FFF4F4');
      document.documentElement.style.setProperty('--Olive-black', '#F7E6C4');
      document.documentElement.style.setProperty('--Cali-Gold', '#606C5D');
      document.documentElement.style.setProperty('--button-change', '#606C5D');
      document.documentElement.style.setProperty('--button-text', '#F7E6C4');
      document.documentElement.style.setProperty('--change-Color-mode', '#000000');
      document.documentElement.style.setProperty('--color-mode-label', '#000000');
      document.documentElement.style.setProperty('--center-slider-change', '#f7e6c4');
    }
  };

  return (
    <div className="switch">
      <label>
        <input type="checkbox" checked={isDarkMode} onChange={handleChange} />
        <span className="slider round"></span>
      </label>
      <div>
      <p className='color-mode-label'>{isDarkMode ? 'Dark Mode' : 'Light Mode' }</p>
      </div>
    </div>
  );
};


export default ColorMode;