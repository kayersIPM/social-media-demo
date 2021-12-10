import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports'

Amplify.configure({
  ...awsconfig,
  API: {
    enpoints: [
      {
          "name": "testAuthChargeAPI",
          "endpoint": "https://hf366hdzs7.execute-api.us-west-2.amazonaws.com/test"
      }
    ]
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
