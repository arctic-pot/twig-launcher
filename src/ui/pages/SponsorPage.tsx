import React from 'react';
import { Button, Icon, Stack, Typography } from '@mui/material';
import { shell } from 'electron';

export default function SponsorPage(): React.ReactElement {
  const GITHUB_URL = 'https://github.com/datapack-planet/twig-launcher';
  const AFDIAN_URL = 'https://afdian.net/@TheColdPot';

  return (
    <Stack
      sx={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
      gap={2}
    >
      <Typography variant="h6">Feeling Twig Launcher Nice?</Typography>
      <Typography>
        Twig Launcher is fully open-sourced and maintained by me and the community.
      </Typography>
      <Typography>
        Your contribution and sponsors help Twig Launcher grow bigger and better.
      </Typography>
      <Stack sx={{ width: '30%' }} gap={1}>
        <Button
          variant="outlined"
          startIcon={<Icon>mood</Icon>}
          onClick={() => shell.openExternal(GITHUB_URL)}
          color="success"
        >
          Contribute on GitHub
        </Button>
        {navigator.languages.includes('zh-CN') && (
          <Button
            variant="outlined"
            startIcon={<Icon>paid</Icon>}
            onClick={() => shell.openExternal(AFDIAN_URL)}
          >
            Sponsor on Afdian
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
