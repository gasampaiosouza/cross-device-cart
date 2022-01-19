import React, { FC, useState } from 'react'
import { useDevice } from 'vtex.device-detector'
import { FormattedMessage } from 'react-intl'
import { Button, ButtonWithIcon, IconClose, Modal } from 'vtex.styleguide'

const close = <IconClose />

interface Props {
  type: ChallengeType
  handleAccept: (showToast: (toast: ToastParam) => void) => Promise<void>
  handleDecline: () => void
  mutationLoading: boolean
  toastHandler: (toast: ToastParam) => void
}

const ChallengeBlock: FC<Props> = ({
  type,
  handleAccept,
  handleDecline,
  mutationLoading,
  toastHandler,
}) => {
  const { device } = useDevice()
  const [opened, handleModal] = useState(true)

  if (type === 'actionBar' || type === 'floatingBar') {
    const classes =
      type === 'floatingBar'
        ? 'shadow-2 pa5 fixed bottom-0 z-999 left-0'
        : `pa4 tc ${device === 'phone' ? 'flex-column' : ''}`

    return (
      <div
        className={`${classes} w-100 bg-base flex items-center justify-center`}
      >
        <span className={`t-small ${device === 'phone' ? 'pb3' : ''}`}>
          <FormattedMessage id="store/crossCart.challenge.text" />
        </span>
        <div className="flex">
          <span className="mh4">
            <Button
              size="small"
              variation="secondary"
              onClick={() => {
                handleAccept(toastHandler)
              }}
              isLoading={mutationLoading}
            >
              <FormattedMessage id="store/crossCart.challenge.cta" />
            </Button>
          </span>
          <span>
            <ButtonWithIcon
              size="small"
              icon={close}
              variation="tertiary"
              onClick={() => {
                handleDecline()
              }}
              isLoading={mutationLoading}
            />
          </span>
        </div>
      </div>
    )
  }

  if (type === 'modal') {
    return (
      <Modal
        centered
        isOpen={opened}
        onClose={() => {
          handleModal(false)
        }}
        bottomBar={
          <div className="nowrap">
            <Button
              size="small"
              variation="secondary"
              onClick={() => {
                handleAccept(toastHandler)
              }}
              isLoading={mutationLoading}
            >
              <FormattedMessage id="store/crossCart.challenge.cta" />
            </Button>
          </div>
        }
      >
        <div className="dark-gray pv7">
          <span>
            <FormattedMessage id="store/crossCart.challenge.text" />
          </span>
        </div>
      </Modal>
    )
  }

  return null
}

export default ChallengeBlock
