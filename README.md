# use-deep-ref
React hook to keep the same ref doing deep equal or custom comparison

## Example

```ts
import { useEffect, useState } from 'react'
import { useDeepRef } from 'use-deep-ref'

interface AsyncResult {
  value?: Response;
  error?: any;
  loading: boolean
}

export function useRequest (url: string, init?: RequestInit): AsyncResult {
  const [result, setResult] = useState<AsyncResult>({ loading: true })

  const options = useDeepRef(init)

  useEffect(() => {
    setResult({ loading: true })
    fetch(url, options)
      .then(value => setResult({ value, loading: false }))
      .catch(error => setResult({ error, loading: false }))
  }, [url, options])

  return result
}
```
