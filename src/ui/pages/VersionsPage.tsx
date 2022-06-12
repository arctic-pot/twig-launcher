import React, { useEffect, useState } from 'react';
import {
  Box,
  Icon,
  IconButton,
  InputBase,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Radio,
  Stack,
  Tooltip,
} from '@mui/material';
import NotFoundBox from '@/ui/placeholder/NotFoundBox';
import {
  getVersionDetails,
  getVersionsFrom,
  IGameVersion,
  versionState,
} from '@/base/version';
import { useRecoilState } from 'recoil';

export function VersionsPage(): React.ReactElement {
  const [filter, setFilter] = useState('');
  const [versions, setVersions] = useState<IGameVersion[]>([]);
  const [activeVersion, setActiveVersion] = useRecoilState(versionState);
  const filteredVersion = versions.filter((version) => version.displayName.includes(filter));

  useEffect(() => {
    localStorage.version = JSON.stringify(activeVersion);
  }, [activeVersion]);

  useEffect(() => {
    getVersionsFrom(['D:/mc/.minecraft']).then((gameVersions) => setVersions(gameVersions));
  }, []);

  return (
    <Stack direction="column" sx={{ boxSizing: 'border-box', width: '100%', height: '100%' }}>
      <Paper sx={{ m: 2 }}>
        <Stack direction="row" gap={1} p={1}>
          <InputBase
            sx={{ flexGrow: 1, pl: 1 }}
            placeholder="Search..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
          <Tooltip title="Import">
            <IconButton>
              <Icon>add</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton>
              <Icon>download</Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>
      {filteredVersion.length > 0 ? (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', position: 'relative' }}>
          <Box sx={{ maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0 }}>
            <List disablePadding>
              {filteredVersion.map((version) => (
                <ListItemButton onClick={() => setActiveVersion(version)} key={version.path}>
                  <ListItemIcon>
                    <Radio
                      disableRipple
                      edge="start"
                      checked={
                        version.path + version.displayName ===
                        activeVersion.path + activeVersion.displayName
                      }
                      sx={{ pointerEvents: 'none' }}
                    />
                  </ListItemIcon>
                  <ListItemAvatar>{version.icon}</ListItemAvatar>
                  <ListItemText
                    primary={version.displayName}
                    secondary={getVersionDetails(version).join(', ')}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>
      ) : (
        <NotFoundBox />
      )}
    </Stack>
  );
}
