import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export function deepmerge<T extends Record<string, any>>(target: T, source: DeepPartial<T>): T {
  const output = { ...target }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const k = key as keyof T
      if (isObject(source[k])) {
        if (!(k in target)) {
          Object.assign(output, { [k]: source[k] })
        } else {
          output[k] = deepmerge(target[k], source[k] as DeepPartial<T[keyof T]>)
        }
      } else {
        Object.assign(output, { [k]: source[k] })
      }
    })
  }
  return output
}

function isObject(item: unknown): item is Record<string, any> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item))
}
