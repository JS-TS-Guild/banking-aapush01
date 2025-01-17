 
type RegistryMap = Record<string, unknown>;

class GlobalRegistry {
  private registry: RegistryMap;

  constructor() {
    this.registry = {};
  }
 
  register(key: string, value: unknown): void {
    if (this.registry[key]) {
      throw new Error(`Key "${key}" is already registered.`);
    }
    this.registry[key] = value;
  }
 
  get<T>(key: string): T {
    if (!this.registry[key]) {
      throw new Error(`Key "${key}" is not registered.`);
    }
    return this.registry[key] as T;
  }

  unregister(key: string): void {
    if (!this.registry[key]) {
      throw new Error(`Key "${key}" is not registered.`);
    }
    delete this.registry[key];
  }

  clear(): void {
    this.registry = {};
  }

  // Checking key is exit or not
  has(key: string): boolean {
    return !!this.registry[key];
  }
}

const globalRegistry = new GlobalRegistry();

export default globalRegistry;
