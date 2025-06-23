import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Tabsplit from './components/Tabsplit.jsx'

import { PromptProvider } from './components/prompt/PromptProvider'

function App() {
    return (
        <PromptProvider>
            <Tabsplit />
        </PromptProvider>
    )
}

export default App
