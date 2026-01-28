import { DashboardData } from '@pages/dashboardAnalytics'
import FileUpload from '@pages/fileUpload'
import React from 'react'
import { BrowserRouter,data,Route, Routes } from 'react-router'

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FileUpload/>} />
          <Route path='/dashboard' element={<DashboardData />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App