import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import '../styles/main.less'

class App extends React.Component {
	render() {
		return <h1>aaaaaaaaaaa</h1>
	}
}

const store = configureStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)