import React from 'react';
import { Box, Button, Chip, Icon, Paper, Stack, Typography } from '@mui/material';

export default function HomePage(): React.ReactElement {
  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
        <Paper sx={{ m: 2, p: 2 }}>
          <Stack direction="row" gap={2}>
            <Typography variant="h6">1.18.10-Optifine</Typography>
            <Button variant="outlined" startIcon={<Icon>build</Icon>} size="small">
              Configure
            </Button>
          </Stack>
          <br />
          <Stack direction="row" gap={1}>
            <Chip label="1.18.1" />
            <Chip label="Optifine G8" />
            <Chip label="5 Mods affected" color="info" />
          </Stack>
        </Paper>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 32, right: 32 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Icon>rocket_launch</Icon>}
          sx={{ height: 64 }}
        >
          Launch Minecraft
        </Button>
      </Box>
    </Box>
  );
}
