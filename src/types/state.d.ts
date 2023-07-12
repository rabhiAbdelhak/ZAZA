type Wilaya = {
  id: number
  name: string
}

type Commune = {
  id: number
  name: string
  wilaya?: Wilaya
}
