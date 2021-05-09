import { CRYPTO_WATCHDOG_VERSION } from 'src/utils/constants';
import { CryptoProviders } from 'src/utils/providers';
import { NotifyModel } from './dto/notify.model';

export function isOutdated(publishedVersions) {
  
  if (publishedVersions?.[0].tag_name !== CRYPTO_WATCHDOG_VERSION) {
    const newVersion = new NotifyModel(CryptoProviders.CryptoWatchdog);
    newVersion.warnMessage = `Newer version availale ! ${publishedVersions?.[0]?.tag_name}`;
    return newVersion;
  }
  return null;
}
