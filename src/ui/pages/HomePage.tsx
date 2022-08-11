import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Icon,
  IconButton,
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

// type AccountType = 'microsoft' | 'offline';

export default function HomePage(): React.ReactElement {
  const { t } = useTranslation();
  const [activeVersion] = useRecoilState(versionState);
  // const [accountType, setAccountType] = useState<AccountType>(
  //   localStorage.accountType ?? 'microsoft'
  // );
  const [showAccountDialog, setShowAccountDialog] = useState<boolean>(false);
  const [openAccountDialog, closeAccountDialog] = useBooleanSwitcher(setShowAccountDialog);
  const navigate = useNavigate();

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
        <Card>
          <CardActionArea onClick={() => navigate('/versions')}>
            <CardContent>
              <Stack direction="row" alignItems="center" gap={2}>
                <img
                  src={activeVersion.visualIcon}
                  alt="Game Icon"
                  style={{ width: 45, height: 45 }}
                />
                <Stack direction="column">
                  <Typography variant="h6" component="div">
                    {activeVersion.displayName}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {activeVersion.details.join(', ')}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Chip label={t('glance.modCount', { count: 0 })} />
            <Chip label={t('glance.resourcePackCount', { count: 3 })} />
            <Chip label={t('glance.shaderPackCount', { count: 0 })} />
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />
            <IconButton onClick={() => electron.shell.openPath(activeVersion.path)} size="small">
              <Icon>folder</Icon>
            </IconButton>
          </CardActions>
        </Card>
        <Card>
          <CardActionArea sx={{ borderRadius: 1 }} onClick={openAccountDialog}>
            <CardContent>
              <Stack direction="row" alignItems="center" gap={2}>
                <Avatar>CP</Avatar>
                <Stack direction="column">
                  <Typography variant="h6" component="div">
                    TheColdPot
                  </Typography>
                  <Typography variant="body2" component="div">
                    {t('account.microsoft')}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" size="large" sx={{ height: 64 }}>
          <Typography variant="h6" component="span">
            {t('general.launch')}
          </Typography>
        </Button>
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
