import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useProjectProcess } from "../../lib/utils/projectProcess";

function LoadMenu({ setGrid }) {
  const { handleLoad, projects } = useProjectProcess();

  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : "LOAD PROJECT"}</MenuButton>
      )}
    >
      {projects?.map((project, i) => (
        <MenuItem
          onClick={() => {
            handleLoad(project, setGrid);
          }}
          key={i}
        >
          {project.name}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default LoadMenu;
