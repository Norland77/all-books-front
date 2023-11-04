import { type FC, type ReactNode } from 'react'
import { useTypedSelector } from 'hooks/useTypedSelector.ts'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const RequireAdmin: FC<Props> = ({ children }) => {
  const { isAdmin } = useTypedSelector(state => state.auth)
  console.log(isAdmin)
  if (!isAdmin) {
    return <Navigate to={'/'} />
  }

  return children
}

export default RequireAdmin
