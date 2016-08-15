import React, { Component } from 'react'
import { render } from 'react-dom'
import { hashHistory, browserHistory, Router, Route, Link, IndexRoute} from 'react-router'
import App from '../contains/app'

export default class Root extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App} />
			</Router>
		)
	}
}