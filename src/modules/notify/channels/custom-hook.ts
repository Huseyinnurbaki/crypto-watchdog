import { CustomHook } from '../dto/custom-hook.model';
import { NotifyModel } from '../dto/notify.model';

export function customHookMessage(data: [NotifyModel]) {

  const body = [];
  data.map(cur => {
    body.push(new CustomHook(cur));
  });
  return body;
}


