export interface AuthComponentType {
  type: 'login' | 'register'
}

export interface AuthForm {
  email: string
  password: string
  repeatPassword?: string
}
