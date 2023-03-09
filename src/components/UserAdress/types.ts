export type enabledOptions = 'userName' | 'userStreet' | 'userCity'

export interface FormUserAdress {
  name: string
  street: string
  city: string
}

export interface UserProps {
  user: {
    name: string
    street: string
    city: string
  }
}
