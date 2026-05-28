export const API_BASE = "http://localhost:8000";

export async function handleResponse(response) {
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || response.statusText);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
