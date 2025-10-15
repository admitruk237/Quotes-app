import React from 'react'

type Props = {
  text: string
}

export const Title = ({ text }: Props) => {
  return (
    <div>
      <h1 className="text-center text-3xl mb-6 sm:mb-10">{text}</h1>
    </div>
  )
}
