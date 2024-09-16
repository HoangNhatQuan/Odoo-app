export interface ILogin {
  email: string
  password: string
}

export interface IRegister extends ILogin {
  name: string
}

export interface ILoginData {
  accessToken: string
  refreshToken: string
}

export interface IRegisterData extends IUser {}

export interface ITokenPayload {
  id: string
}

export interface IUser {
  id: string
  name: string
  email: string
}
