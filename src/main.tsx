import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { config } from '../awsconfig'
import '@aws-amplify/ui-react/styles.css'
import './index.css'
import { Amplify } from 'aws-amplify'

Amplify.configure(config)
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
