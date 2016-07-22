import React, { Component } from 'react'

export default class MainSection extends Component {
	constructor(props) {
		super(props)
		this.changeHandle = this.changeHandle.bind(this)
	}

	changeHandle(e) {
		let id = parseInt(e.target.parentNode.getAttribute('data-id'));
		this.props.completeTodo(id);
		return false;
	}

	render() {
		const { todos, actions } = this.props;

		let items = todos.map((todo, index) => {
			return (
				<li className="item-todo" key={index} data-id={todo.id}>
					<input type="checkbox" checked={todo.completed} onChange={this.changeHandle} />
					<span>{todo.text}</span>
					<button onClick={() => this.props.deleteTodo(todo.id)}>删除</button>
				</li>
			)
		})

		return (
			<div>
				<ul className="wrap-todo">
					{items}
				</ul>
			</div>
		)
	}
}