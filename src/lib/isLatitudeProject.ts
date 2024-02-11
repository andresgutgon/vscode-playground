import { isFilePresent } from "./filesystem";

export default async function isLatitudeProject(): Promise<boolean> {
  return isFilePresent("latitude.json");
}
