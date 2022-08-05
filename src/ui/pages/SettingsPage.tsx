import React, { useEffect, useState } from 'react';
import {
  Button,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ipcRenderer } from 'electron';

// This is a hook which extends the origin setState.
const useLocalBindState = (key: string, defaultValue?: unknown) => {
  // g stands for getter, s stands for setter.
  const [g, s] = useState(JSON.parse(localStorage[key] ?? '""') ?? defaultValue);
  useEffect(() => {
    localStorage[key] = JSON.stringify(g);
  }, [g]);
  return [g, s];
};

export default function SettingsPage(): React.ReactElement {
  //region settings states
  const [gamePaths, setGamePaths] = useLocalBindState('gamePaths', []);
  //endregion settings states

  return (
    <>
      <List>
        <ListItem
          secondaryAction={
            <Button
              startIcon={<Icon>add</Icon>}
              onClick={() => {
                ipcRenderer
                  .invoke('open-dialog', { properties: ['openDirectory'] })
                  .then(({ filePaths }) => {
                    const filePath = filePaths[0];
                    if (!gamePaths.includes(filePath) && filePath)
                      setGamePaths([...gamePaths, filePath]);
                  });
              }}
            >
              Add
            </Button>
          }
        >
          <ListItemIcon>
            <Icon>folder</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Game paths"
            secondary="The working directory (.minecraft) of the game"
          />
        </ListItem>
        {gamePaths && (
          <List disablePadding dense>
            {gamePaths.map((gamePath: string) => (
              <ListItem sx={{ pl: 4 }} key={gamePath} secondaryAction={
                <IconButton
                  size="small"
                  onClick={() => setGamePaths(gamePaths.filter((p: string) => p !== gamePath))}
                >
                  <Icon>close</Icon>
                </IconButton>}>

                <ListItemText primary={gamePath} />
              </ListItem>
            ))}
          </List>
        )}
      </List>
    </>
  );
}
