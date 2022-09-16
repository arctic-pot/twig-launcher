import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { versionState } from '@/base/version';
import { LoadingButton } from '@mui/lab';
import { useBooleanSwitcher } from '@/base/hook';
import { useTranslation } from 'react-i18next';
import * as electron from 'electron';
import fs from 'fs-extra';
import * as path from 'path';

// type AccountType = 'microsoft' | 'offline';

export default function HomePage(): React.ReactElement {
  const { t } = useTranslation();
  const [activeVersion] = useRecoilState(versionState);
  // const [accountType, setAccountType] = useState<AccountType>(
  //   localStorage.accountType ?? 'microsoft'
  // );
  const [showAccountDialog, setShowAccountDialog] = useState<boolean>(false);
  const [openAccountDialog, closeAccountDialog] = useBooleanSwitcher(setShowAccountDialog);
  // This is for display
  const [versionSize, setVersionSize] = useState<string>(void 0);
  const navigate = useNavigate();

  useEffect(() => {
    const gamePath = activeVersion.path;
    fs.readdir(gamePath)
      .then((files) => files.find((file) => file.endsWith('.jar')))
      .then((jarPath) => path.resolve(gamePath, jarPath))
      .then(fs.stat)
      .then((stat) => setVersionSize((~~((stat.size / 1024 / 1024) * 100) / 100).toString() + ' MB'));
  }, []);

  // useEffect(() => {
  //   localStorage.accountType = accountType;
  // }, [accountType]);

  return (
    <>
      <Stack
        direction="column"
        gap={2}
        sx={{ p: 2, width: '100%', height: '100%', boxSizing: 'border-box' }}
      >
        {/*<CardActions>*/}
        {/*  <Chip label={t('glance.modCount', { count: 0 })} />*/}
        {/*  <Chip label={t('glance.resourcePackCount', { count: 3 })} />*/}
        {/*  <Chip label={t('glance.shaderPackCount', { count: 0 })} />*/}
        {/*  <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />*/}
        {/*</CardActions>*/}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" gap={2} alignItems="flex-end">
          <Paper sx={{ flexGrow: 1 }}>
            <List>
              <ListItemButton onClick={() => navigate('/versions')}>
                <ListItemIcon>
                  {/*<img*/}
                  {/*  src={activeVersion.visualIcon}*/}
                  {/*  alt="Game Icon"*/}
                  {/*  style={{ width: 45, height: 45 }}*/}
                  {/*/>*/}
                </ListItemIcon>
                <ListItemText
                  primary={activeVersion.displayName}
                  secondary={activeVersion.details.join(', ')}
                />
              </ListItemButton>
              <ListItemButton onClick={openAccountDialog}>
                <ListItemIcon>
                  <Avatar>CP</Avatar>
                </ListItemIcon>
                <ListItemText primary="TheColdPot" secondary="Microsoft Account" />
              </ListItemButton>
              <ListItem>
                <Stack direction="row" gap={1}>
                  <Chip
                    icon={<Icon fontSize="small">folder_open</Icon>}
                    onClick={() => electron.shell.openPath(activeVersion.path)}
                    label={versionSize ?? '? MB'}
                  />
                  <Chip
                    icon={<Icon fontSize="small">widgets</Icon>}
                    onClick={() => navigate('/mods')}
                    label={t('glance.modCount', { count: 1 })}
                  />
                </Stack>
              </ListItem>
            </List>
          </Paper>
          <Stack direction="column">
            <ButtonGroup variant="contained" sx={{ height: 64 }} disableElevation>
              <Button size="large" sx={{ width: 240 }} onClick={() => {
                console.log(activeVersion.generateLaunchScripts())
              }}>
                <Typography variant="h6" component="span">
                  {t('general.launch')}
                </Typography>
              </Button>
              <Button>
                <Icon>more_horiz</Icon>
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Stack>
      <AccountPicker open={showAccountDialog} onClose={closeAccountDialog} />
    </>
  );
}

interface IAccountPickerProps {
  open: boolean;
  onClose: () => void;
}

export function AccountPicker({ open, onClose }: IAccountPickerProps): React.ReactElement {
  const { t } = useTranslation();
  const [accountType, setAccountType] = useState('ms');
  const [offlineName, setOfflineName] = useState('');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('account.switch')}</DialogTitle>
      <DialogContent>
        <ToggleButtonGroup
          value={accountType}
          exclusive
          onChange={(_, value) => {
            if (value) setAccountType(value);
          }}
          color="primary"
          sx={{ '& .MuiToggleButton-root': { width: 128 } }}
        >
          <ToggleButton value="ms">{t('account.microsoft')}</ToggleButton>
          <ToggleButton value="offline">{t('account.offline')}</ToggleButton>
          <ToggleButton value="authlib" disabled>
            External
          </ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ height: ({ spacing }) => spacing(2) }} />
        {accountType === 'ms' && (
          <Stack direction="column" sx={{ width: '100%' }} alignItems="stretch" gap={1}>
            <LoadingButton variant="contained">{t('account.login.microsoft')}</LoadingButton>
            <Typography variant="caption">{t('account.buyHint')}</Typography>
          </Stack>
        )}
        {accountType === 'offline' && (
          <Stack direction="column" sx={{ width: '100%' }} alignItems="center" gap={1}>
            <TextField
              sx={{ width: '100%' }}
              label={t('account.playerName')}
              value={offlineName}
              onChange={(event) => setOfflineName(event.target.value)}
              helperText={t('account.nameHint')}
            />
            <Button
              onClick={() => {
                onClose.call(null);
              }}
            >
              {t('account.createDone')}
            </Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
