import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
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

const InkWell = CardActionArea;

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
        <InkWell onClick={() => navigate('/versions')} sx={{ borderRadius: 1 }}>
          <Paper sx={{ p: 2 }}>
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
          </Paper>
        </InkWell>
        {/*<Paper sx={{ p: 2, height: 144 }}>*/}
        {/*  <Stack*/}
        {/*    direction="column"*/}
        {/*    alignItems="center"*/}
        {/*    justifyContent="center"*/}
        {/*    sx={{ height: '100%' }}*/}
        {/*    gap={1}*/}
        {/*  >*/}

        {/*  </Stack>*/}
        {/*</Paper>*/}
        <InkWell sx={{ borderRadius: 1 }} onClick={openAccountDialog}>
          <Paper sx={{ p: 2 }}>
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
          </Paper>
        </InkWell>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <InkWell onClick={() => navigate('/mods')} sx={{ borderRadius: 1 }}>
              <Paper sx={{ px: 2, py: 1 }} variant="outlined">
                <Stack direction="row" gap={1}>
                  <Typography>Mods: unavailable</Typography>
                </Stack>
              </Paper>
            </InkWell>
          </Grid>
          <Grid item xs={4}>
            <InkWell onClick={() => navigate('/res-packs')} sx={{ borderRadius: 1 }}>
              <Paper sx={{ px: 2, py: 1 }} variant="outlined">
                <Stack direction="row" gap={1}>
                  <Typography>Resource Packs: 3</Typography>
                </Stack>
              </Paper>
            </InkWell>
          </Grid>
          <Grid item xs={4}>
            <InkWell onClick={() => navigate('/shader-packs')} sx={{ borderRadius: 1 }}>
              <Paper sx={{ px: 2, py: 1 }} variant="outlined">
                <Stack direction="row" gap={1}>
                  <Typography>Shader Packs: unavailable</Typography>
                </Stack>
              </Paper>
            </InkWell>
          </Grid>
        </Grid>
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
  const [accountType, setAccountType] = useState('ms');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Switch account</DialogTitle>
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
          <ToggleButton value="ms">Microsoft</ToggleButton>
          <ToggleButton value="offline">Offline</ToggleButton>
          <ToggleButton value="authlib" disabled>
            External
          </ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ height: ({ spacing }) => spacing(2) }} />
        {accountType === 'ms' && (
          <Stack direction="column" sx={{ width: '100%' }} alignItems="stretch" gap={1}>
            <LoadingButton variant="contained">Login with Microsoft</LoadingButton>
            <Typography variant="caption">
              Didn't buy Minecraft: Java Edition? Head to minecraft.net!
            </Typography>
          </Stack>
        )}
        {accountType === 'offline' && (
          <Stack direction="column" sx={{ width: '100%' }} alignItems="center" gap={1}>
            <TextField sx={{ width: '100%' }} label="Player name" />
            <Button
              onClick={() => {
                onClose.call(null);
              }}
            >
              Done
            </Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
