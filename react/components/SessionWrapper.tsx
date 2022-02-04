import React, { FC } from 'react'
import { SessionSuccess, useRenderSession } from 'vtex.session-client'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { ToastConsumer } from 'vtex.styleguide'

import { CrossDeviceCart } from './CrossDeviceCart'
import { COMBINE } from '../utils/constants'

interface Props {
  mergeStrategy: MergeStrategy
  isAutomatic: boolean
  advancedOptions: boolean
}

const SessionWrapper: FC<Props> = ({
  mergeStrategy = COMBINE,
  isAutomatic = true,
  advancedOptions = false,
}) => {
  const { loading, session, error } = useRenderSession()
  const { loading: orderLoading } = useOrderForm()

  if (error || loading || !session || orderLoading) {
    return null
  }

  const {
    namespaces: { profile },
  } = session as SessionSuccess

  const isAuthenticated = profile?.isAuthenticated.value === 'true'

  if (!isAuthenticated) {
    return null
  }

  const userId = profile?.id.value

  const crossDeviceCart = (toastHandler: (toast: ToastParam) => void) => (
    <CrossDeviceCart
      isAutomatic={isAutomatic}
      mergeStrategy={mergeStrategy}
      userId={userId}
      toastHandler={toastHandler}
      advancedOptions={advancedOptions}
    />
  )

  return (
    <ToastConsumer>
      {({ showToast }: { showToast: (toast: ToastParam) => void }) =>
        crossDeviceCart(showToast)
      }
    </ToastConsumer>
  )
}

export { SessionWrapper }
