import { useEffect, useState } from 'react'
import { RouterLink, navigateTo } from '../../router'
import { getCurrentAdmin, loginAdmin } from '../../services/adminAuthApi'
import './admin.css'

function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function checkSession() {
      try {
        const response = await getCurrentAdmin()

        if (isMounted && response?.adminUser) {
          navigateTo('/admin')
          return
        }
      } catch {
      } finally {
        if (isMounted) {
          setIsCheckingSession(false)
        }
      }
    }

    void checkSession()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await loginAdmin(email.trim(), password)
      navigateTo('/admin')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="adminShell adminLoginShell">
      <section className="adminLoginCard">
        <div className="adminPanelHeader">
          <div>
            <p className="adminEyebrow">Administration</p>
            <h1>Connexion admin</h1>
            <p className="adminLead">
              Acces reserve a l'administration Nearby.
            </p>
          </div>
          <RouterLink className="adminBackLink" to="/">
            Retour au site
          </RouterLink>
        </div>

        {isCheckingSession ? (
          <p className="adminEmpty">Verification session admin...</p>
        ) : (
          <form className="adminForm adminLoginForm" onSubmit={handleSubmit}>
            <label htmlFor="admin-email">
              <span>Email</span>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label htmlFor="admin-password">
              <span>Mot de passe</span>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <div className="adminActions">
              <button className="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>
        )}

        {errorMessage ? <p className="adminStatus error">{errorMessage}</p> : null}
      </section>
    </main>
  )
}

export default AdminLoginPage
