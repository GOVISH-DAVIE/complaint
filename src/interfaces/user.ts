export type AllUsers = UserInterface[];
export interface UserInterface {
  id: string
  username: string
  email: string
}

export interface Authentication {
  auth: Auth
  id: string
  userName: string
}

export interface Auth {
  username: string
  password: string
}
