import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import TabsplitMain from './components/Tabsplit.jsx'
import UserViewMain from './components/userview/UserViewMain.jsx'
import TransactionViewMain from './components/transactionview/TransactionViewMain.jsx'
import SettingsViewMain from './components/settings/SettingsViewMain.jsx'

import { PromptProvider } from './components/prompt/PromptProvider'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <PromptProvider>
            <Routes>
                <Route path="/" element={<TabsplitMain />} />
                <Route path="/user/:id" element={<UserViewMain />} />
                <Route path="/user/:id/settings" element={<SettingsViewMain />} />
                <Route path="/transaction/:id" element={<TransactionViewMain />} />
            </Routes>
        </PromptProvider>
    )
}

export default App
