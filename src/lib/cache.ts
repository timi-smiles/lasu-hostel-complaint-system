// lib/cache.ts
class CacheManager {
  private cache = new Map<string, unknown>()
  
  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get(key) as T | undefined
  }
  
  async set(key: string, value: unknown, ttl = 300): Promise<void> {
    setTimeout(() => this.cache.delete(key), ttl * 1000)
    this.cache.set(key, value)
  }
  
  async delete(key: string): Promise<boolean> {
    return this.cache.delete(key)
  }
  
  async clear(): Promise<void> {
    this.cache.clear()
  }
  
  async has(key: string): Promise<boolean> {
    return this.cache.has(key)
  }
}

export const cache = new CacheManager()