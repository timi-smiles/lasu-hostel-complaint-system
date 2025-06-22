// lib/cache.ts
class CacheManager {
  private cache = new Map()
  
  async get(key: string) {
    return this.cache.get(key)
  }
  
  async set(key: string, value: any, ttl = 300) {
    setTimeout(() => this.cache.delete(key), ttl * 1000)
    this.cache.set(key, value)
  }
}

export const cache = new CacheManager()