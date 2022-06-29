import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import { TransactionProvider } from './context/TransactionContext'
import { PaymentProvider } from './context/PaymentContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
    <PaymentProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PaymentProvider>
  </TransactionProvider>
)
