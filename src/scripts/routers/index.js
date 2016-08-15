import React, { Component } from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute} from 'react-router'
import App from '../contains/app'

export default class Root extends Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={App} />
			</Router>
		)
	}
}