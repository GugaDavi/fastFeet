export interface SessionSchema {
  email: string
  password: string
}

export interface RecipientSchema {
  name: string
  address?: AddressSchema
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

export interface PackageSchema {
  recipient_id: number
  deliveryman_id: number
  signature_id?: number
  product: string
}

export interface DeliveryProblemSchema {
  description: string
}
