import { useRef } from 'react'
import equal from 'fast-deep-equal/es6/react'
import type { EqualityComparer } from './types'

export function useDeepRef<T> (value: T, equalComparer: EqualityComparer<T> = equal) {
  const ref = useRef<T>(value)

  if (!equalComparer(ref.current, value)) {
    ref.current = value
  }

  return ref.current
}
