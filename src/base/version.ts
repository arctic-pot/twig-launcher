import { atom } from "recoil";

export const versionState = atom({
  key: 'version',
  default: JSON.parse(localStorage.version ?? '{}') as IGameVersion
})

export interface IGameComponents {
  id: string;
  version: string;
}

export enum GameIcon {
  grassBlock
}

export interface IGameVersion {
  displayName: string;
  path: string;
  rootPath: string;
  components?: IGameComponents[];
  icon: GameIcon;
}
