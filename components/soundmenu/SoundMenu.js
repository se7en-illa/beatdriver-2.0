import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

//firebase
import { collection } from "firebase/firestore";
import { database } from "../../lib/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
//redux
import { useAppDispatch } from "../../lib/utils/dispatch";
import { useSelector } from "react-redux";

function SoundMenu({ handleBeatChange, currentUser }) {
  const drumsRef = collection(database, "built_in_drums");
  const bassRef = collection(database, "built_in_bass");
  const guitarRef = collection(database, "built_in_guitar");
  const vocalsRef = collection(database, "built_in_vocals");
  const [drums] = useCollectionData(drumsRef);
  const [bass] = useCollectionData(bassRef);
  const [vocals] = useCollectionData(vocalsRef);
  const [guitar] = useCollectionData(guitarRef);
  const { selected } = useSelector((state) => state.instruments);
  const { updateSelected, updateSelectedInstrument } = useAppDispatch();

  const customSoundsExist = currentUser && currentUser.sounds;

  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : `${selected}`}</MenuButton>
      )}
    >
      <SubMenu label="INSTRUMENTS">
        <SubMenu label="drums">
          {drums?.map((docs, i) => {
            return (
              <SubMenu label={docs.id} key={i}>
                {docs.sounds?.map((sound, i) => (
                  <MenuItem
                    label={sound.name}
                    key={i}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      updateSelected(`${docs.id}-${sound.name}`);
                      updateSelectedInstrument(`DRUMS`);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
        <SubMenu label="bass">
          {bass?.map((docs, i) => {
            return (
              <SubMenu label={docs.id} key={i}>
                {docs.sounds?.map((sound, i) => (
                  <MenuItem
                    label={sound.name}
                    key={i}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      updateSelected(`${docs.id}-${sound.name}`);
                      updateSelectedInstrument(`BASS`);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
        <SubMenu label="guitar">
          {guitar?.map((docs, i) => {
            return (
              <SubMenu label={docs.id} key={i}>
                {docs.sounds?.map((sound, i) => (
                  <MenuItem
                    label={sound.name}
                    key={i}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      updateSelected(`${docs.id}-${sound.name}`);
                      updateSelectedInstrument(`GUITAR`);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
        <SubMenu label="vocals">
          {vocals?.map((docs, i) => {
            return (
              <SubMenu label={docs.id} key={i}>
                {docs.sounds?.map((sound, i) => (
                  <MenuItem
                    label={sound.name}
                    key={i}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      updateSelected(`${docs.id}-${sound.name}`);
                      updateSelectedInstrument(`VOCALS`);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
        ;
        {customSoundsExist && (
          <SubMenu label={currentUser?.name}>
            {currentUser?.sounds?.map((sound, i) => (
              <MenuItem
                label={sound.name}
                key={i}
                onClick={() => {
                  handleBeatChange(sound.url);
                  updateSelected(`${currentUser?.name}-${sound.name}`);
                  updateSelectedInstrument(`USER`);
                }}
              >
                {sound.name}
              </MenuItem>
            ))}
          </SubMenu>
        )}
      </SubMenu>
    </Menu>
  );
}

export default SoundMenu;
