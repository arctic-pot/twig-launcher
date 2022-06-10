import React from 'react';
import { Box, Button, ButtonGroup, Chip, Icon, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { versionState } from '@/base/version';

export default function HomePage(): React.ReactElement {
  //const [, setPage] = useNavigate();
  const [version] = useRecoilState(versionState);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Stack
        sx={{
          position: 'absolute',
          bottom: 32,
          left: 32,
          right: 32,
          alignItems: 'flex-end',
          gap: '32px',
        }}
        direction="row"
      >
        <Paper sx={{ p: 2, width: '65.5%', flexGrow: 1 }}>
          <Stack direction="row" gap={1}>
            <Typography variant="h6">{version.displayName}</Typography>
            <IconButton
              size="small"
              onClick={() => navigate('/versions')}
            >
              <Icon>build</Icon>
            </IconButton>
          </Stack>
          <br />
          <Stack direction="row" gap={1}>
            <Chip label="1.18.1" />
            <Chip label="5 Mods affected" color="info" onClick={() => navigate('/mods')} />
          </Stack>
        </Paper>
        <Button
          variant="contained"
          size="large"
          startIcon={<Icon>rocket_launch</Icon>}
          sx={{ height: 84 }}
          disableElevation={false}
        >
          Launch Game
        </Button>
      </Stack>
      <Stack
        sx={{ position: 'absolute', bottom: 32, right: 32, alignItems: 'flex-end' }}
        direction="column"
        gap={1}
      >
        <ButtonGroup variant="text">
          {/*<Button startIcon={<Icon>person</Icon>} size="small">*/}
          {/*  TheColdPot*/}
          {/*</Button>*/}
          {/*<Button size="small" onClick={() => navigate('/accounts')}>*/}
          {/*  <Icon fontSize="small">settings</Icon>*/}
          {/*</Button>*/}
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
