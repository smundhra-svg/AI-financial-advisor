import EditedTxns from '@components/components/EditedTxns'
import { DashboardProvider } from '@hooks/DashboardContext'
import { DashboardData } from '@pages/dashboardAnalytics'
import EditPage from '@pages/EditPage'
import FileUpload from '@pages/fileUpload'
import Generate from '@pages/generate'
import React from 'react'
import { BrowserRouter,data,Route, Routes } from 'react-router'

const App = () => {
  
  return (
    <>
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FileUpload/>} />
          {/* <Route path='/transactions' element={<DisplayTxn/>} /> */}
          <Route path="/transactions" element={<EditPage />} />
          <Route path="/generate" element ={<Generate />} />
          <Route path='/dashboard' element={<DashboardData />} />
        </Routes>
      </BrowserRouter>
    </DashboardProvider>
    </>
  )
}

export default App