import React, { createContext, useContext } from 'react';
import {
  Box,
  Divider,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
} from '@mui/material';
import { useHref, useLocation, useMatch, useNavigate } from 'react-router-dom';

// export const useNavigate = (): [Page, React.Dispatch<React.SetStateAction<Page>>] =>
//   useContext(NavContext);

interface NavItemData {
  text: string;
  icon: string;
  page: string;
}

const NavListItem = ({ text, icon, page }: { text: string; icon: string; page: string }) => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      disableRipple
      onClick={() => navigate(page)}
      selected={!!useMatch(page)}
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

const Navs: NavItemData[] = []

export default function Navigation(): React.ReactElement {
  return (
    <Box sx={{ width: 240 }}>
      <List component="nav" disablePadding>
        <List>
          <NavListItem text="Home" icon="home" page="/" />
        </List>
        <Divider />
        <List>
          <NavListItem text="Accounts" icon="account_circle" page="/accounts" />
          <NavListItem text="Versions" icon="list" page="/versions" />
        </List>
        <Divider />
        <List>
          <NavListItem text="Mods" icon="widgets" page="mods" />
          <NavListItem text="Resource Packs" icon="gradient" page="res-packs" />
          <NavListItem text="Shader Packs" icon="lightbulb" page="shader-packs" />
        </List>
        <Divider />
        <List>
          <NavListItem text="Multiplayer" icon="people" page="multiplayer" />
          <NavListItem text="Server" icon="dns" page="server" />
        </List>
        <Divider />
        <List>
          <NavListItem text="Settings" icon="settings" page="settings" />
          <NavListItem text="Info" icon="info" page="info" />
          <NavListItem text="Sponsor" icon="redeem" page="sponsor" />
        </List>
        {process.env.NODE_ENV === 'development' && (
          <>
            <Divider />
            <List dense>
              <NavListItem text="Development" icon="home_repair_service" page="/dev" />
            </List>
          </>
        )}
      </List>
    </Box>
  );
}
