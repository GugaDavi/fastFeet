export interface SessionSchema {
  email: string
  password: string
}

export interface RecipientSchema {
  name: string
}

export interface AddressSchema {
  street: string
  house_number: string
  complement?: string
  state: string
  city: string
  zip_code: string
}

export interface DeliverymanSchema {
  name: string
  email: string
  avatar_id?: number
}
