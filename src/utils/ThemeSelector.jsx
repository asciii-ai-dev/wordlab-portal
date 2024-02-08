import React from "react";
import { BiMoon } from "react-icons/bi";
import { HiOutlineSun } from "react-icons/hi";

const ThemeSelector = ({ setHeaderLogo }) => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggleTheme = (value) => {
    setTheme(value);
    setHeaderLogo(value);
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return theme === "dark" ? (
    <button className="text-[20px]" onClick={() => handleToggleTheme("light")}>
      <HiOutlineSun className="" />
    </button>
  ) : (
    <button className="text-[18px]" onClick={() => handleToggleTheme("dark")}>
      <BiMoon />
    </button>
  );
};

export default ThemeSelector;
