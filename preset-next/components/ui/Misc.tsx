'use client'

import { ReactNode, useEffect, useRef } from 'react'

import toast from 'react-hot-toast'
import { ExplorerLink } from '../cluster/cluster-ui'

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode
  title: string
  hide: () => void
  show: boolean
  submit?: () => void
  submitDisabled?: boolean
  submitLabel?: string
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (!dialogRef.current) return
    if (show) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [show, dialogRef])

  return (
    <dialog className='modal' ref={dialogRef}>
      <div className='modal-box space-y-5'>
        <h3 className='font-bold text-lg'>{title}</h3>
        {children}
        <div className='modal-action'>
          <div className='join space-x-2'>
            {submit ? (
              <button
                className='btn btn-xs lg:btn-md btn-primary'
                onClick={submit}
                disabled={submitDisabled}
              >
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className='btn'>
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode
  title: ReactNode
  subtitle: ReactNode
}) {
  return (
    <div className='hero py-[64px]'>
      <div className='hero-content text-center'>
        <div className='max-w-2xl'>
          {typeof title === 'string' ? (
            <h1 className='text-5xl font-bold'>{title}</h1>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <p className='py-6'>{subtitle}</p>
          ) : (
            subtitle
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return (
      str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
    )
  }
  return str
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className='text-lg'>Transaction sent</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={'View Transaction'}
          className='btn btn-xs btn-primary'
        />
      </div>,
    )
  }
}
