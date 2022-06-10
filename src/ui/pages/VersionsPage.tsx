import React, { useEffect, useState } from "react";
import {
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
  Stack
} from "@mui/material";
import NotFoundBox from "@/ui/placeholder/NotFoundBox";
import { GameIcon, getVersionDetails, IGameVersion, PatchType, versionState } from "@/base/version";
import { useRecoilState } from "recoil";

export function VersionsPage(): React.ReactElement {
  const [filter, setFilter] = useState('');
  const [versions] = useState<IGameVersion[]>([
    {
      displayName: '1.18.2',
      path: 's',
      rootPath: '',
      icon: GameIcon.grassBlock,
      version: '1.18.2',
      patches: [
        {id: PatchType.optifine, version: 'H5'},
        {id: PatchType.forge, version: '41.0.4'}
      ]
    },
    {
      displayName: '1.17.1',
      path: 'n',
      rootPath: '',
      icon: GameIcon.grassBlock,
    },
  ]);
  const [activeVersion, setActiveVersion] = useRecoilState(versionState);
  const filteredVersion = versions.filter((version) => version.displayName.includes(filter));

  useEffect(() => {
    localStorage.version = JSON.stringify(activeVersion);
  }, [activeVersion]);

  return (
    <Stack direction="column" sx={{ boxSizing: 'border-box', width: '100%', height: '100%' }}>
      <Paper sx={{ m: 1 }}>
        <Stack direction="row" gap={1} p={1}>
          <InputBase
            sx={{ flexGrow: 1, pl: 1 }}
            placeholder="Search..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
          <IconButton>
            <Icon>add</Icon>
          </IconButton>
          <IconButton>
            <Icon>download</Icon>
          </IconButton>
        </Stack>
      </Paper>
      {filteredVersion.length > 0 ? (
        <List>
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
              <ListItemText primary={version.displayName} secondary={getVersionDetails(version).join(', ')} />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <NotFoundBox />
      )}
    </Stack>
  );
}
