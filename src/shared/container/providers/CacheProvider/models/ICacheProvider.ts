export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recorver<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrex(prefix: string): Promise<void>;
}
