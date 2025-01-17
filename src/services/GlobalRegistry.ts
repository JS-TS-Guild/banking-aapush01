// services/GlobalRegistry.ts

type RegistryMap = Record<string, unknown>;

class GlobalRegistry {
  private registry: RegistryMap;

  constructor() {
    this.registry = {};
  }

  // Adds a key-value pair to the registry
  register(key: string, value: unknown): void {
    if (this.registry[key]) {
      throw new Error(`Key "${key}" is already registered.`);
    }
    this.registry[key] = value;
  }

  // Retrieves a value by key
  get<T>(key: string): T {
    if (!this.registry[key]) {
      throw new Error(`Key "${key}" is not registered.`);
    }
    return this.registry[key] as T;
  }

  // Removes a key from the registry
  unregister(key: string): void {
    if (!this.registry[key]) {
      throw new Error(`Key "${key}" is not registered.`);
    }
    delete this.registry[key];
  }

  // Clears the entire registry
  clear(): void {
    this.registry = {};
  }

  // Checks if a key exists in the registry
  has(key: string): boolean {
    return !!this.registry[key];
  }
}

// Singleton instance of GlobalRegistry
const globalRegistry = new GlobalRegistry();

export default globalRegistry;
