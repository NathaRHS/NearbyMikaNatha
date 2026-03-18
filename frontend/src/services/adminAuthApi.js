const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const raw = await response.text()
  let data = null

  if (raw) {
    try {
      data = JSON.parse(raw)
    } catch {
      data = { message: raw }
    }
  }

  if (!response.ok) {
    const error = new Error(data?.message || 'Erreur API')
    error.status = response.status
    throw error
  }

  return data
}

export async function loginAdmin(email, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function logoutAdmin() {
  return request('/api/auth/logout', {
    method: 'POST',
  })
}

export async function getCurrentAdmin() {
  return request('/api/auth/me')
}
