import React, { Component } from 'react'

export default class Header extends Component {
	constructor (props) {
		super(props)
		this.clickHandle = this.clickHandle.bind(this)
	}

	clickHandle() {
		let input = this.refs.todoInput;
		let text = input.value;
		this.props.addTodo(text)
		input.value = '';
		return false;
	}

	render() {
		return (
			<div className="header">
				<input type="text" ref="todoInput" />
				<button type="button" onClick={this.clickHandle}>add</button>
			</div>
		)
	}
}