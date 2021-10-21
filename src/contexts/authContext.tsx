import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/api"

interface GithubUser {
  id: string
  avatar_url: string
  name: string
  login: string
}

interface AuthResponse {
  token: string
  user: GithubUser
}

interface AuthProvider {
  children: ReactNode
}

interface User {
  id: string
  name: string
  login: string
  avatar_url: string
}

interface AuthContextData {
  user: User | null
  signInUrl: string
  logOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = import.meta.env.VITE_SIGNIN_URL as string

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('/authenticate', {
      code: githubCode
    })

    const { token, user } = response.data

    localStorage.setItem('@doWhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  async function logOut() {
    setUser(null)
    localStorage.removeItem('@doWhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@doWhile:token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`
      api.get<User>('/userProfile').then(user => {
        setUser(user.data)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [clearUrl, githubCode] = url.split('?code=')

      window.history.pushState({}, '', clearUrl)

      signIn(githubCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, logOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}