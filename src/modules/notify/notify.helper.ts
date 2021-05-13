import { CRYPTO_WATCHDOG_VERSION, NotificationTypes } from 'src/utils/constants';
import { CryptoProviders } from 'src/utils/providers';
import { NotifyModel } from './dto/notify.model';

export function isOutdated(publishedVersions) {
  if (publishedVersions?.[0].tag_name !== CRYPTO_WATCHDOG_VERSION) {
    const newVersion = new NotifyModel(CryptoProviders.CryptoWatchdog);
    newVersion.message = `Newer version availale ! ${publishedVersions?.[0]?.tag_name}`;
    newVersion.notificationType = NotificationTypes.WARN;
    return newVersion;
  }
  return null;
}
