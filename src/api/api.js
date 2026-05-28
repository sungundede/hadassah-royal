export const API_BASE = "http://localhost:8000";

export async function handleResponse(response) {
  const text = await response.text();
  if (!response.ok) {
    let message = response.statusText;
    try {
      const json = JSON.parse(text);
      message = json.detail || json.message || text;
    } catch {
      message = text || response.statusText;
    }
    throw new Error(message);
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
