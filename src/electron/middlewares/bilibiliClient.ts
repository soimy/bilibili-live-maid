import { ICtx } from '@/electron/types';
import config from 'config';
import {
  DANMU_CONNECT, DANMU_DATA, DANMU_DISCONNECT, DANMU_ERROR,
} from '@/electron/constants';
import { createClient } from '../services/danmakuService';

export function createBilibiliClient(ctx: ICtx): void {
  const danmakuClient = createClient(config.get('RoomId'));
  danmakuClient.connect();
  danmakuClient
    .on('open', () => {
      ctx.customEventEmitter.emit(DANMU_CONNECT);
    })
    .on('data', (msg: any) => {
      console.log('msg', msg);
      ctx.customEventEmitter.emit(DANMU_DATA, msg);
    })
    .on('close', () => {
      ctx.customEventEmitter.emit(DANMU_DISCONNECT);
    })
    .on('error', () => {
      ctx.customEventEmitter.emit(DANMU_ERROR);
    });
}

export default {
  createBilibiliClient,
};
