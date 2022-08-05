import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Icon,
  IconButton,
  InputBase,
  // List,
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
  GameIcon,
  getVersionDetails,
  getVersionsFrom,
  IGameVersion,
  versionState,
} from '@/base/version';
import { useRecoilState } from 'recoil';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import GrassBlock from 'assets/version-icons/grass-block.webp'; // @ts-ignore
import Furnace from 'assets/version-icons/furnace.webp';
// import { act } from 'react-dom/test-utils'; // @ts-ignore
/* eslint-enable @typescript-eslint/ban-ts-comment */

export function VersionsPage(): React.ReactElement {
  const [filter, setFilter] = useState('');
  const [versions, setVersions] = useState<IGameVersion[]>([]);
  const [activeVersion, setActiveVersion] = useRecoilState(versionState);
  const filteredVersion = versions.filter((version) => version.displayName.includes(filter));

  useEffect(() => {
    localStorage.version = JSON.stringify(activeVersion);
  }, [activeVersion]);

  // Load versions from paths
  useEffect(() => {
    getVersionsFrom(JSON.parse(localStorage.gamePaths)).then((gameVersions) =>
      setVersions(gameVersions)
    );
  }, []);

  // Check if the `version` is selected
  const isSelected = useCallback(
    (version: IGameVersion) =>
      activeVersion.displayName === version.displayName && activeVersion.path === version.path,
    [activeVersion]
  );

  return (
    <Stack
      direction="column"
      sx={{ boxSizing: 'border-box', width: '100%', height: '100%', position: 'relative' }}
    >
      <Box
        sx={{
          m: 1,
          borderRadius: 1,
          backgroundColor: ({ palette }) =>
            palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        {/* The margin part will actually display as 80% opacity background */}
        <Paper sx={{ m: 1 }}>
          <Stack direction="row" gap={1} p={1}>
            <InputBase
              sx={{ flexGrow: 1, pl: 1 }}
              placeholder="Search..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
            <Tooltip title="Import">
              <IconButton>
                <Icon>download</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Add">
              <IconButton>
                <Icon>add</Icon>
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Box>

      {filteredVersion.length > 0 ? (
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            position: 'relative',
            '&::-webkit-scrollbar': { width: 8 },
            '&::-webkit-scrollbar-thumb': {
              width: 8,
              backgroundColor: ({ palette }) => palette.text.secondary,
              borderRadius: 1,
              opacity: 0.5,
            },
          }}
        >
          <Box
            sx={{
              maxHeight: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Stack
              direction="row"
              gap={1}
              sx={{ position: 'relative', pt: 11, flexWrap: 'wrap', px: 1 }}
            >
              {filteredVersion.map((version) => (
                <ListItemButton
                  onClick={() => setActiveVersion(version)}
                  key={version.path}
                  sx={{
                    width: ({ spacing }) => `calc(50% - ${spacing(0.5)})`,
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 6 }}>
                    <Radio
                      disableRipple
                      edge="start"
                      checked={isSelected(version)}
                      sx={{ pointerEvents: 'none' }}
                    />
                  </ListItemIcon>
                  <ListItemAvatar>
                    <Stack justifyContent="center" alignItems="center">
                      <img
                        src={
                          { [GameIcon.grassBlock]: GrassBlock, [GameIcon.furnace]: Furnace }[
                            version.icon as 0
                          ]
                        }
                        alt="Game Icon"
                        style={{ width: 30, height: 30 }}
                      />
                    </Stack>
                  </ListItemAvatar>
                  <ListItemText
                    primary={version.displayName}
                    secondary={getVersionDetails(version).join(', ')}
                  />
                </ListItemButton>
              ))}
            </Stack>
          </Box>
        </Box>
      ) : (
        <Stack sx={{ pt: 9, width: '100%', height: '100%', boxSizing: 'border-box' }}>
          <NotFoundBox />
        </Stack>
      )}
    </Stack>
  );
}
