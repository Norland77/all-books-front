import { RouterProvider } from 'react-router-dom'
import { type FC } from 'react'
import router from './router.tsx'
import BigLoaderSpinner from './components/Big-loader-spinner/Big-loader-spinner.tsx'

const App: FC = () => {
  return (
    <RouterProvider router={router} fallbackElement={<BigLoaderSpinner />}/>
  )
}

export default App
