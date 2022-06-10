import { atom } from 'recoil';

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
  // The minecraft version
  version?: string;
}
