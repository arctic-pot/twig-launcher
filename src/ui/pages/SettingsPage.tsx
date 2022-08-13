import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Icon,
  IconButton,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText,
  ListSubheader,
  Slider,
  Stack,
} from '@mui/material';
import { ipcRenderer } from 'electron';
import { useTranslation } from 'react-i18next';
import * as os from 'os';

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
  const { t } = useTranslation();
  //region settings states
  const [gamePaths, setGamePaths] = useLocalBindState('gamePaths', []);
  //endregion settings states

  return (
    <Stack direction="column" sx={{ py: 1, height: '100%' }}>
      <List subheader={<ListSubheader>{t('settings.general')}</ListSubheader>}>
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
              {t('general.add')}
            </Button>
          }
        >
          {/*<ListItemIcon>*/}
          {/*  <Icon>folder</Icon>*/}
          {/*</ListItemIcon>*/}
          <ListItemText primary={t('settings.gamePath')} />
        </ListItem>
        {gamePaths && (
          <List disablePadding dense>
            {gamePaths.map((gamePath: string) => (
              <ListItem
                sx={{ pl: 8 }}
                key={gamePath}
                secondaryAction={
                  <IconButton

                    size="small"
                    onClick={() => setGamePaths(gamePaths.filter((p: string) => p !== gamePath))}
                  >
                    <Icon>close</Icon>
                  </IconButton>
                }
              >
                <ListItemText primary={gamePath} />
              </ListItem>
            ))}
          </List>
        )}

        <ListItem>
          {/*<ListItemIcon>*/}
          {/*  <Icon>memory</Icon>*/}
          {/*</ListItemIcon>*/}
          <ListItemText
            primary={t('settings.maxMem')}
            secondary={
              <Slider
                marks={[{ value: 2, label: '2.0' }]}
                valueLabelFormat={(value) => `${value} GB`}
                max={~~(os.totalmem() / 1073741824)}
                min={1}
                step={0.2}
                valueLabelDisplay="auto"
              />
            }
          />
        </ListItem>
        <Box sx={{ pr: 4, pl: 9 }}></Box>
      </List>
      <List subheader={<ListSubheader>{t('settings.customize')}</ListSubheader>}>
        <ListItem>
          {/*<ListItemIcon>*/}
          {/*  <Icon>palette</Icon>*/}
          {/*</ListItemIcon>*/}
          <ListItemText
            primary={t('settings.themeColor')}
            secondary={'Coming soon!'}
          />
        </ListItem>
      </List>
    </Stack>
  );
}
