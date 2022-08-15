import React, { PropsWithChildren } from 'react';
import {
  Button,
  Icon,
  IconButton,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as os from 'os';
import { useStorageBoundState } from '@/base/hook';
import { useSnackbar } from 'notistack';

interface ISettingItemProps {
  label: string;
}

function SettingItem({ children, label }: PropsWithChildren<ISettingItemProps>) {
  return (
    <Stack direction="column" sx={{ mx: 2, mt: 2 }}>
      <Typography component="span" variant="body1" sx={{ mb: 1 }}>
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

interface ISettingGroupProps {
  subheader: React.ReactNode;
}

function SettingGroup({ subheader, children }: PropsWithChildren<ISettingGroupProps>) {
  // const [hovering, setHovering] = useState(false);
  // const [moveIn, moveOut] = useBooleanSwitcher(setHovering);

  return (
    <Paper
      sx={{ m: 2, pb: 2 }}
      // elevation={hovering ? 1 : 0}
      // // variant={hovering ? 'elevation' : 'outlined'}
      // onMouseOver={moveIn}
      // onMouseOut={moveOut}
    >
      <ListSubheader sx={{ zIndex: 0 }} disableSticky>
        {subheader}
      </ListSubheader>
      {children}
    </Paper>
  );
}

// // This is a hook which extends the origin setState.
// const useStorageBoundState_JSON = (key: string, defaultValue?: unknown) => {
//   // g stands for getter, s stands for setter.
//   const [g, s] = useState(JSON.parse(localStorage[key] ?? '""') ?? defaultValue);
//   useEffect(() => {
//     localStorage[key] = JSON.stringify(g);
//   }, [g]);
//   return [g, s];
// };
// const useStorageBoundState = (key: string, defaultValue?: unknown) => {
//   // g stands for getter, s stands for setter.
//   const [g, s] = useState(localStorage[key] ?? defaultValue);
//   useEffect(() => {
//     localStorage[key] = g;
//   }, [g]);
//   return [g, s];
// };
// Object.assign(useStorageBoundState, { json: useStorageBoundState_JSON });

export default function SettingsPage(): React.ReactElement {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  function noticeRestart() {
    enqueueSnackbar(t('settings.needRestart'), {
      action: () => (
        <Button color="inherit" onClick={() => location.reload()}>
          {t('settings.restartNow')}
        </Button>
      ),
      preventDuplicate: true,
    });
  }

  //region settings states
  const useSBState = useStorageBoundState;
  const [gamePaths, setGamePaths] = useSBState.json('gamePaths', []);
  const [lang, setLang] = useSBState('lang', 'SYSTEM');
  //endregion settings states

  return (
    <Stack direction="column" sx={{ height: '100%' }}>
      <SettingGroup subheader={t('settings.general')}>
        <SettingItem label={t('settings.gamePath')}>
          {gamePaths && (
            <List disablePadding dense>
              {gamePaths.map((gamePath: string) => (
                <ListItem
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
                  <ListItemText inset primary={gamePath} />
                </ListItem>
              ))}
            </List>
          )}
        </SettingItem>
        <SettingItem label={t('settings.maxMem')}>
          <Slider
            marks={[{ value: 2, label: '2.0' }]}
            valueLabelFormat={(value) => `${value} GB`}
            max={~~(os.totalmem() / 1073741824)}
            min={1}
            step={0.2}
            valueLabelDisplay="auto"
          />
        </SettingItem>
        <SettingItem label={t('settings.lang')}>
          <Select
            size="small"
            defaultValue={localStorage.lang ?? 'SYSTEM'}
            fullWidth
            value={lang}
            onChange={({ target }) => {
              noticeRestart();
              setLang(target.value);
            }}
          >
            <MenuItem value="SYSTEM">{t('settings.followSys')}</MenuItem>
            <MenuItem value="en-US">English (United States)</MenuItem>
            <MenuItem value="zh-CN">简体中文（中国大陆）</MenuItem>
            <ListSubheader>Planned</ListSubheader>
            <MenuItem value="en-UK" disabled>
              English (United Kingdom)
            </MenuItem>
            <MenuItem value="zh-TW" disabled>
              繁體中文（中國臺灣、澳門特別行政區）
            </MenuItem>
            <MenuItem value="zh-HK" disabled>
              繁體中文（香港特別行政區）
            </MenuItem>
          </Select>
        </SettingItem>
      </SettingGroup>
      {/*<SettingGroup subheader={t('settings.customize')}>*/}
      {/*  <SettingItem label={t('settings.themeColor')}>*/}
      {/*  </SettingItem>*/}
      {/*</SettingGroup>*/}
    </Stack>
  );
}
