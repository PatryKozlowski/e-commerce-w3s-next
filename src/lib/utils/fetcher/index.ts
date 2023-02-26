import type { FetcherConfig } from './types'

export const fetcher = async <returnType>(endpoint: string, { method, body, config }: FetcherConfig): Promise<returnType> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL as string + endpoint, {
    ...config,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method,
    ...(body && { body: JSON.stringify(body) })
  })

  const data = await response.json()

  return data ?? []
}
