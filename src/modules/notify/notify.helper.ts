import { CryptoProviders } from 'src/utils/providers';
import { NotifyModel } from './dto/notify.model';

export function compareVersion(publishedVersions, curentVersion) {
  if (publishedVersions?.[0].tag_name !== curentVersion) {
    const newVersion = new NotifyModel(CryptoProviders.CryptoWatchdog);
    newVersion.warnMessage = `Newer version availale ! ${publishedVersions?.[0]?.tag_name}`;
    return newVersion;
  }
  return null;
}
