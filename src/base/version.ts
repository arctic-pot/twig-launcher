import { atom } from 'recoil';
import fs from 'fs-extra';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid'

/* eslint-disable @typescript-eslint/ban-ts-comment */ // @ts-ignore
import GrassBlock from 'assets/version-icons/grass-block.webp'; // @ts-ignore
import Furnace from 'assets/version-icons/furnace.webp'; // @ts-ignore
/* eslint-enable @typescript-eslint/ban-ts-comment */

import { t } from 'i18next';

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

interface IGameVersion {
  displayName: string;
  path: string;
  rootPath: string;
  patches?: IGamePatch[];
  icon: GameIcon;
  release?: boolean;
  jar: string;
  // The minecraft version
  version?: string;
  manifest?: Record<string, unknown>
  token: string;
}

export class GameVersion implements IGameVersion {
  public readonly displayName: string;
  public readonly icon: GameIcon;
  public readonly jar: string;
  public readonly patches?: IGamePatch[];
  public readonly path: string;
  public readonly release?: boolean;
  public readonly rootPath: string;
  public readonly version?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly manifest?: Record<string, any>;
  public readonly token: string;

  protected constructor(game: IGameVersion) {
    this.displayName = game.displayName;
    this.icon = game.icon;
    this.jar = game.jar;
    this.patches = game.patches;
    this.path = game.path;
    this.release = game.release;
    this.rootPath = game.rootPath;
    this.version = game.version;
    this.manifest = game.manifest;
  }

  public get visualIcon(): string {
    return { [GameIcon.grassBlock]: GrassBlock, [GameIcon.furnace]: Furnace }[this.icon as 0];
  }

  public static convert(origin: IGameVersion): GameVersion {
    return new GameVersion(origin);
  }

  public get details(): string[] {
    if (this.patches) {
      return [
        this.version,
        ...this.patches.map((patch) => `${getPatchName(patch.id)} ${patch.version}`),
      ];
    } else {
      return [t('version.external')];
    }
  }

  public generateLaunchScripts(): string {
    return `java`
  }

  // public static withoutManifest(origin: GameVersion): GameVersion {
  //   return origin;
  // }

  protected static get defaultManifest(): unknown {
    return {
      version: '1.0',
      isolate: true,
      spec: {
        twig: {
          icon: GameIcon.grassBlock,
          token: uuid4()
        }
      }
    };
  }

  /**
   * Scan a `.minecraft` directory to get versions from it.
   * @param paths The `.minecraft` directory
   * @return A promise with a list of versions.
   */
  public static async fromPaths(paths: string[]): Promise<GameVersion[]> {
    return (
      paths
        .flatMap((rootPath) => {
          // Get the versions directory
          const versionsPath = path.resolve(rootPath, './versions');
          return fs.readdirSync(versionsPath).map((directoryName) => {
            try {
              const directory = path.resolve(versionsPath, directoryName);
              // Get the client.json and its data
              // Client.json had renamed into <version name>.json.
              const jsonPath = path.resolve(directory, `${directoryName}.json`);
              const verInfoPath = path.resolve(directory, 'VERSION_INFO');
              const manifest = fs.readJSONSync(jsonPath);
              // fs.removeSync(verInfoPath);
              // Try to read version info path for visual data and else.
              // Init a version info file if it doesn't exist
              if (!fs.existsSync(verInfoPath)) {
                fs.writeJsonSync(verInfoPath, this.defaultManifest);
              }
              const verInfo =
                fs.readJsonSync(verInfoPath, 'utf-8').specific.twig;
              // console.log(manifest)
              return new GameVersion({
                displayName: manifest.id,
                path: directory,
                rootPath: rootPath,
                icon: verInfo.icon,
                jar: manifest.jar,
                manifest: manifest,
                token: verInfo.token,
              });
            } catch (e) {
              // When catching unexpected errors, return nothing
              return null;
            }
          });
        })
        // Only keep true values, which removes `null`.
        .filter((version) => version)
    );
  }
}

export const versionState = atom({
  key: 'version',
  default: GameVersion.convert(JSON.parse(localStorage.version ?? '{}') as IGameVersion),
});
