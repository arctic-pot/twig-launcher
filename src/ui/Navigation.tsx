import React, { createContext, useContext } from 'react';
import {
  Box,
  Divider,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export enum Page {
  home,
  accounts,
  versions,
  mods,
  resPacks,
  shaderPacks,
  multiplayer,
  server,
  settings,
  info,
  sponsor,
  dev,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NavContext = createContext({} as any);

const NavListItem = ({ text, icon, page }: { text: string; icon: string; page: Page }) => {
  const [selectedPage, setSelectedPage] = useContext(NavContext);
  return (
    <ListItemButton
      disableRipple
      selected={selectedPage === page}
      onClick={() => {
        setSelectedPage(page);
      }}
      sx={{
        '&.Mui-selected': {
          span: { color: 'primary.main' },
          '.MuiTypography-root': { fontWeight: '600' },
        },
      }}
    >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default function Navigation(): React.ReactElement {
  return (
    <Box sx={{ width: 240 }}>
      <List component="nav" disablePadding>
        <List>
          <NavListItem text="Home" icon="home" page={Page.home} />
        </List>
        <Divider />
        <List>
          <NavListItem text="Accounts" icon="account_circle" page={Page.accounts} />
          <NavListItem text="Versions" icon="list" page={Page.versions} />
        </List>
        <Divider />
        <List>
          <NavListItem text="Mods" icon="widgets" page={Page.mods} />
          <NavListItem text="Resource Packs" icon="gradient" page={Page.resPacks} />
          <NavListItem text="Shader Packs" icon="lightbulb" page={Page.shaderPacks} />
        </List>
        <Divider />
        <List>
          <NavListItem text="Multiplayer" icon="people" page={Page.multiplayer} />
          <NavListItem text="Server" icon="dns" page={Page.server} />
        </List>
        <Divider />
        <List>
          <NavListItem text="Settings" icon="settings" page={Page.settings} />
          <NavListItem text="Info" icon="info" page={Page.info} />
          <NavListItem text="Sponsor" icon="redeem" page={Page.sponsor} />
        </List>
        {process.env.NODE_ENV === 'development' && (
          <>
            <Divider />
            <List dense>
              <NavListItem text="Development" icon="home_repair_service" page={Page.dev} />
            </List>
          </>
        )}
      </List>
    </Box>
  );
}
