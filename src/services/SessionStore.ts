import AsyncStorage from '@react-native-async-storage/async-storage';
import { Credentials } from '../api/RpcClient';

export interface Session extends Credentials {
  clientId: string;
  clientToken: string;
  nome?: string;
  email?: string;
}

/** Abstração de persistência de sessão (SRP + testável sem AsyncStorage). */
export interface ISessionStore {
  save(s: Session): Promise<void>;
  load(): Promise<Session | null>;
  clear(): Promise<void>;
}

const KEY = '@nexa:session';

export class AsyncStorageSessionStore implements ISessionStore {
  async save(s: Session): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(s));
  }
  async load(): Promise<Session | null> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  }
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  }
}
