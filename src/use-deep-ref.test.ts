import { renderHook } from '@testing-library/react-hooks'
import { useDeepRef } from './use-deep-ref'

describe('useDeepRef', () => {
  it('return the same ref instance', () => {
    expect.assertions(1)
    const original = {
      id: 123
    }

    const { result } = renderHook(() => useDeepRef(original))

    expect(result.current).toBe(original)
  })

  it('return new object when is not the same', () => {
    expect.assertions(2)

    const v1 = {
      id: 123
    }
    const v2 = {
      id: 456
    }

    const values = [v1, v2]

    const { result, rerender } = renderHook(() => useDeepRef(values.shift()))
    while (values.length > 0) {
      rerender()
    }

    expect(result.current).toBe(v2)
    expect(result.all).toStrictEqual([v1, v2])
  })

  it('return the same ref instance if the object is always deep equal', () => {
    expect.assertions(4)

    const original = {
      id: 123
    }
    const values = [original, { ...original }, { ...original }]
    const size = values.length

    const { result, rerender } = renderHook(() => useDeepRef(values.shift()))

    while (values.length > 0) {
      rerender()
    }

    expect(result.all).toHaveLength(size)
    result.all.forEach(res => expect(res).toBe(original))
  })

  it('return the same ref instance using custom comparer', () => {
    expect.assertions(1)
    const original = {
      id: 123,
      name: 'original'
    }
    const values = [original, { ...original, name: 'copy1' }, { ...original, name: 'copy2' }]

    const { result, rerender } = renderHook(() => useDeepRef(values.shift(), (a, b) => a?.id === b?.id))
    while (values.length > 0) {
      rerender()
    }

    expect(result.current).toBe(original)
  })
})
