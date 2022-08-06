import React from 'react';
import { Avatar, Box, Button, CardActionArea, Grid, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getVersionDetails, versionIcon, versionState } from '@/base/version';

const InkWell = CardActionArea;

type AccountType = 'microsoft' | 'offline';

export default function HomePage(): React.ReactElement {
  const [activeVersion] = useRecoilState(versionState);
  // const [accountType, setAccountType] = useState<AccountType>(
  //   localStorage.accountType ?? 'microsoft'
  // );
  const navigate = useNavigate();

  // useEffect(() => {
  //   localStorage.accountType = accountType;
  // }, [accountType]);

  return (
    <Stack
      direction="column"
      gap={2}
      sx={{ p: 2, width: '100%', height: '100%', boxSizing: 'border-box' }}
    >
      <InkWell onClick={() => navigate('/versions')} sx={{ borderRadius: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <img
              src={versionIcon(activeVersion)}
              alt="Game Icon"
              style={{ width: 45, height: 45 }}
            />
            <Stack direction="column">
              <Typography variant="h6" component="div">
                {activeVersion.displayName}
              </Typography>
              <Typography variant="body2" component="div">
                {getVersionDetails(activeVersion).join(', ')}
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
      <InkWell sx={{ borderRadius: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Avatar>CP</Avatar>
            <Stack direction="column">
              <Typography variant="h6" component="div">
                TheColdPot
              </Typography>
              <Typography variant="body2" component="div">
                Microsoft Account
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
          Launch
        </Typography>
      </Button>
    </Stack>
  );
}
