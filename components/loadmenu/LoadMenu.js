import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useRouter } from "next/navigation";
//redux
import { useAppDispatch } from "../../lib/utils/dispatch";

function LoadMenu({ projects, grid, setGrid }) {
  const { updateUID, updateName } = useAppDispatch();
  const router = useRouter();
  // const handleLoad = (project) => {
  //   const objGrid = project.grid;
  //   const orderedKeys = Object.keys(objGrid).sort();
  //   const loadGrid = orderedKeys.map((row) => objGrid[row]);

  //   updateUID(project.projectId);
  //   updateName(project.name);
  //   updateGrid(loadGrid);
  //   router.push({
  //     pathname: `/board/[id]`,
  //     query: { id: project.projectId },
  //   });
  // };

  const handleLoad = (project) => {
    const objGrid = project.grid;
    const orderedKeys = Object.keys(objGrid).sort();
    const loadGrid = orderedKeys.map((row) =>
      objGrid[row].map((cell) => ({ ...cell }))
    );

    updateUID(project.projectId);
    updateName(project.name);
    setGrid(loadGrid);
    router.push({
      pathname: `/board/[id]`,
      query: { id: project.projectId },
    });
  };

  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : "LOAD PROJECT"}</MenuButton>
      )}
    >
      {projects?.map((project, i) => (
        <MenuItem
          onClick={() => {
            handleLoad(project);
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
