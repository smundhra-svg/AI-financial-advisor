import { DashboardProvider } from '@components/components/DashboardContext'
import { DashboardData } from '@pages/dashboardAnalytics'
import DisplayTxn from '@pages/displayTxn'
import FileUpload from '@pages/fileUpload'
import React from 'react'
import { BrowserRouter,data,Route, Routes } from 'react-router'

const App = () => {
  
  return (
    <>
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FileUpload/>} />
          <Route path='/dashboard' element={<DashboardData />} />
          <Route path='/transactions' element={<DisplayTxn/>} />
        </Routes>
      </BrowserRouter>
    </DashboardProvider>
    </>
  )
}

export default App