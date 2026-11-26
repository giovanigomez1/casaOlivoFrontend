import { useAuth } from "../hooks/useAuth"
import { Navigate, useNavigate, useLocation, Link } from "react-router"
import styles from './AdminLogin.module.css'
import Logo from "../components/ui/Logo"
import { useState } from "react"
import { CircleExclamationPoint } from 'lucide-react'
import Spinner from "../components/ui/Spinner"
import FullPageSpinner from "../components/ui/FullPageSpinner"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ identifier, password }) {
  const value = identifier.trim()
  const errors = {}
  if (!value) errors.identifier = 'Ingresa correo o usuario'
  if (!password) errors.password = 'Ingresa tu contraseña'
  if (value?.includes('@')) {
    if (!emailRegex.test(value)) errors.identifier = 'Ingresa un correo válido'
  }
  return errors
}

export default function AdminLogin() {
  const { status, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)


  async function loginUser(e) {
    e.preventDefault()
    const errors = validate({ identifier, password })
    setFieldErrors(errors)
    if (Object.keys(errors).length) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      await login(identifier.trim(), password)
      navigate(location.state?.from?.pathname ?? '/admin', { replace: true })
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'authenticated') return <Navigate to='/admin' replace />
  if (status === 'checking') return
  (
    <FullPageSpinner>
      <Spinner label='Verificando sesión…' />
    </FullPageSpinner>
  )

  return (
    <div className={styles.container}>
      <title>Acceso · Casa Olivo</title>
      <form className={styles.form} onSubmit={loginUser} noValidate>
        <Link to='/' className={styles.logo}>
          <Logo />
          <span className={styles.logoText}>Casa Olivo</span>
        </Link>
        <div className={styles.title}>
          <h1>Panel de administración</h1>
          <p>Ingresa tus datos para ver las reservaciones</p>
        </div>
        <div className={styles.identifier}>
          <label htmlFor="identifier">Correo tu o usuario</label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="ana@casaolivo.mx"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value)
              setFieldErrors(prev => ({ ...prev, identifier: undefined }))
              setSubmitError('')
            }}
            aria-invalid={Boolean(fieldErrors.identifier)}
            aria-describedby={fieldErrors.identifier ? 'identifier-error' : undefined}
          />
          {fieldErrors.identifier && <span id="identifier-error" className={styles.error}>{fieldErrors.identifier}</span>}
        </div>
        <div className={styles.password}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setFieldErrors(prev => ({ ...prev, password: undefined }))
              setSubmitError('')
            }}
            aria-invalid={Boolean(fieldErrors.password || submitError)}
            aria-describedby={[fieldErrors.password && 'password-error', submitError && 'login-error'].filter(Boolean).join(' ') || undefined}
          />
          {fieldErrors.password && <span id="login-error" className={styles.error}>{fieldErrors.password}</span>}
          {submitError && <span id="error-login" role="alert" className={styles.error}><CircleExclamationPoint size={16} aria-hidden="true" />{submitError}</span>}
        </div>
        <button disabled={submitting} className={styles.submit} type="submit">{submitting ? 'Validando…' : 'Entrar'}</button>
        <Link to='/' className={styles.backLink}>&larr; Volver al inicio</Link>
      </form>
    </div>
  )
}