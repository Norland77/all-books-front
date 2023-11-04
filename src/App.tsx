import { RouterProvider } from 'react-router-dom'
import { type FC } from 'react'
import router from './router.tsx'

const App: FC = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
