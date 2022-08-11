import React from 'react';
import {
  Box,
  Divider,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMatch, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// interface NavItemData {
//   text: string;
//   icon: string;
//   page: string;
// }

// export const useNavigate = (): [Page, React.Dispatch<React.SetStateAction<Page>>] =>
//   useContext(NavContext);

const NavListItem = ({ text, icon, page }: { text: string; icon: string; page: string }) => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      disableRipple={false}
      onClick={() => navigate(page)}
      selected={!!useMatch(page)}
      sx={{
        borderRadius: 1,
        maxHeight: 40,
        '&.Mui-selected': {
          span: { color: 'primary.main' },
        },
        '&:not(:last-child)': {
          mb: 0.5,
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

// const Navs: NavItemData[] = [];

export default function Navigation(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: 240 }}>
      <List component="nav" disablePadding sx={{ px: 1 }}>
        <List>
          <NavListItem text={t('general.home')} icon="home" page="/" />
        </List>
        <Divider />
        <List>
          <NavListItem text={t('general.skin')} icon="styler" page="/skin" />
          <NavListItem text={t('general.versions')} icon="list" page="/versions" />
          <NavListItem text={t('general.mods')} icon="widgets" page="mods" />
          <NavListItem text={t('general.packs.resource')} icon="gradient" page="res-packs" />
          <NavListItem text={t('general.packs.shader')} icon="lightbulb" page="shader-packs" />
        </List>
        <Divider />
        <List>
          <NavListItem text="Multiplayer" icon="people" page="multiplayer" />
          <NavListItem text="Server" icon="dns" page="server" />
        </List>
        <Divider />
        <List>
          <NavListItem text={t('general.settings')} icon="settings" page="settings" />
          {/*<NavListItem text="Info" icon="info" page="info" />*/}
          {/*<NavListItem text="Sponsor" icon="redeem" page="sponsor" />*/}
        </List>
        <Divider />
        <List>
          <NavListItem text="Extensions" icon="extension" page="extensions" />
        </List>
        {process.env.NODE_ENV === 'development' && (
          <>
            <Divider />
            <List>
              <NavListItem text="Development" icon="home_repair_service" page="/dev" />
            </List>
          </>
        )}
      </List>
    </Box>
  );
}
