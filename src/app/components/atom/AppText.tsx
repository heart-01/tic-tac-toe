import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode;
}

const AppText = ({ children }: Props) => {
  return (
    <div className="noto-sans-thai">{children}</div>
  )
}

export default AppText