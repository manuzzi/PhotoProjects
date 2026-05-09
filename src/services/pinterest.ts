/**
 * Pinterest API v5 integration
 * Docs: https://developers.pinterest.com/docs/api/v5/
 *
 * OAuth flow: redirect user to Pinterest auth, receive code, exchange for token.
 * Tokens are stored in Supabase (user record) and refreshed automatically.
 */

const PINTEREST_CLIENT_ID = import.meta.env.VITE_PINTEREST_CLIENT_ID as string
const REDIRECT_URI = import.meta.env.VITE_PINTEREST_REDIRECT_URI as string
const PINTEREST_API = 'https://api.pinterest.com/v5'

export function getPinterestAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: PINTEREST_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'boards:read,pins:read',
    state: crypto.randomUUID(),
  })
  return `https://www.pinterest.com/oauth/?${params.toString()}`
}

export async function fetchUserBoards(accessToken: string) {
  const res = await fetch(`${PINTEREST_API}/boards`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Failed to fetch Pinterest boards')
  return res.json()
}

export async function fetchBoardPins(accessToken: string, boardId: string) {
  const res = await fetch(`${PINTEREST_API}/boards/${boardId}/pins?page_size=50`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Failed to fetch Pinterest pins')
  return res.json()
}
