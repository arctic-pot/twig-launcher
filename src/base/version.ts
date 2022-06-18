import { atom } from 'recoil';
import fs from 'fs-extra';
import * as path from 'path';
import YAML from 'yaml';

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
  furnace,
}

export enum PatchType {
  optifine,
  forge,
}

export const getPatchName = (p: PatchType): string =>
  ({ [PatchType.optifine]: 'Optifine', [PatchType.forge]: 'Forge' }[p]);

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
  jar: string;
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
            // const jarPath = path.resolve(directory, `${directoryName}.jar`);
            const jsonPath = path.resolve(directory, `${directoryName}.json`);
            const verInfoPath = path.resolve(directory, 'version_info.yml');
            const manifest = fs.readJSONSync(jsonPath);
            // fs.removeSync(verInfoPath);
            // Init a version info file if it doesn't exist
            if (!fs.existsSync(verInfoPath)) {
              const defaultContent = YAML.stringify({
                version: '1.0',
                launcherData: {
                  twig: {
                    icon: GameIcon.furnace,
                  },
                },
              });
              fs.writeFileSync(verInfoPath, defaultContent);
            }
            const verInfo = YAML.parse(fs.readFileSync(verInfoPath, 'utf-8'))?.launcherData?.twig ?? {};
            return {
              displayName: manifest.id,
              path: directory,
              rootPath: rootPath,
              icon: verInfo.icon,
              jar: manifest.jar,
            };
          } catch (e) {
            return null;
          }
        });
      })
      .filter((version) => version)
  );
}
