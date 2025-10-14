'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { PageLoadingSpinner } from '@/components/PageLoadingSpinner'

type Props = {
  message: string
}

export const ClientValidationHandler = ({ message }: Props) => {
  const router = useRouter()

  useEffect(() => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: 'validation-error',
    })

    const redirectTimeout = setTimeout(() => {
      router.replace('/404')
    }, 2000)

    return () => clearTimeout(redirectTimeout)
  }, [message, router])

  return <PageLoadingSpinner />
}
