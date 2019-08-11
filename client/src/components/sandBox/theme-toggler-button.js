import React from 'react';

import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // ThemeTogglerButton получает из контекста
  // не только значение UI-темы, но и функцию toggleTheme.
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme cb
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
