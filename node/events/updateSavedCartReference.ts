import { APP_NAME } from '../constants'

export async function updateSavedCartReference(ctx: StatusChangeContext) {
  const {
    body: { orderId },
    vtex: { logger },
    clients: { orders, vbase },
  } = ctx

  try {
    const customerOrder = await orders.getOrder(orderId)

    const {
      orderFormId,
      clientProfileData: { userProfileId },
    } = customerOrder

    const crossCartReference = await vbase.getJSON<{
      orderFormId: string | null
    }>(APP_NAME, userProfileId, true)

    if (crossCartReference === orderFormId) {
      await vbase.saveJSON(APP_NAME, userProfileId, '')

      logger.info({
        message: `User ${userProfileId} got it's XCart reference removed`,
      })
    }
  } catch (error) {
    if (error instanceof Error) throw error
    throw new Error(error)
  }
}
