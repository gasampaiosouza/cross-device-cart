type Scalars = import('vtex.checkout-graphql').Scalars
type AssemblyOptionType = import('vtex.checkout-graphql').AssemblyOptionType

interface MergeCartsVariables {
  savedCart: Scalars['ID']
  currentCart: Scalars['ID']
  strategy: MergeStrategy
  userId: Scalars['ID']
}

type MergeStrategy = 'ADD' | 'COMBINE' | 'REPLACE'

interface PartialOrderFormItems {
  orderForm: { items: PartialItem[] }
}

interface PartialNewOrderForm {
  value: number
  totalizers: {
    id: string
    name: string
    value: number
  }
  items: PartialItem[]
}

interface PartialItem {
  id: number
  index?: number
  quantity: number
  seller: string
  uniqueId: string
  options?: AssemblyOptionInput[]
}

interface Order {
  origin: 'Marketplace' | 'Fulfillment'
  paymentData: any
  orderId: string
  affiliateId: string
  totals: any
  coupon: string
  items: any
  marketingData?: any
  storePreferencesData?: any
  clientProfileData: ClientProfileData
  orderFormId: string
}

interface ClientProfileData {
  userProfileId: string
}

interface CurrentCartProps {
  userId: string
  crossCartData: CrossCartData
}

interface CrossCartData {
  orderFormId: string | null
  isMerged: boolean
}

interface SaveCurrentCartData extends CrossCartData {
  userId: string
}
