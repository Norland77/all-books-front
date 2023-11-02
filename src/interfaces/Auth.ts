export interface ILogin {
  email: string
  password: string
}

export interface ILoginResponse {
  id: string
  username: string
  avatar: string
}

export interface IRegister {
  email: string
  password: string
  nickname: string
  passwordRepeat: string
  first_name: string
  second_name: string
  gender: string
  country: string
}
