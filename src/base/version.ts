import { atom } from 'recoil';
import fs from 'fs-extra';
import * as path from 'path';

export const versionState = atom({
  key: 'version',
  default: JSON.parse(localStorage.version ?? '{}') as IGameVersion,
});

export interface IGamePatch {
  id: PatchType;
  version: string;
}

export enum GameIcon {
  grassBlock,
}

export enum PatchType {
  optifine,
  forge,
}

export function getPatchName(p: PatchType): string {
  return { [PatchType.optifine]: 'Optifine', [PatchType.forge]: 'Forge' }[p];
}

export function getVersionDetails(version: IGameVersion): string[] {
  if (version.patches) {
    return [
      version.version,
      ...version.patches.map((patch) => `${getPatchName(patch.id)} ${patch.version}`),
    ];
  } else {
    return ['External'];
  }
}

export interface IGameVersion {
  displayName: string;
  path: string;
  rootPath: string;
  patches?: IGamePatch[];
  icon: GameIcon;
  release?: boolean;
  // The minecraft version
  version?: string;
}

export async function getVersionsFrom(paths: string[]): Promise<IGameVersion[]> {
  return (
    paths
      // .minecraft directory
      .flatMap((rootPath) => {
        const versionsPath = path.resolve(rootPath, './versions');
        return fs.readdirSync(versionsPath).map((directoryName) => {
          try {
            const directory = path.resolve(rootPath, 'versions', directoryName);
            return {
              displayName: directoryName,
              path: directory,
              rootPath: rootPath,
              icon: GameIcon.grassBlock,
            };
          } catch (e) {
            return null;
          }
        });
      })
      .filter((version) => version)
  );
}
