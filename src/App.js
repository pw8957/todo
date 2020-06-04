import React, { Component, createRef } from 'react';

class App extends Component {
	id = 1;
	state = {
		username: '',
		password: '',
		list: [],
		usernameModify: '',
		passwordModify: '',
		isModify: false,
	};
	usernameInput = createRef();

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleInsert = (e) => {
		e.preventDefault();
		const { list, username, password, usernameModify, passwordModify } = this.state;
		this.setState({
			username: '',
			password: '',
			usernameModify: username,
			passwordModify: password,
			list: list.concat({
				username,
				password,
				id: this.id,
			}),
		});

		this.id++;
		this.usernameInput.current.focus();

		console.log(list);
	};

	handleDelete = (id) => {
		this.setState({
			list: this.state.list.filter((user) => user.id !== id),
		});
	};

	handleModfiy = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({
			[name]: value,
			isModify: this.state.isModify ? false : true,
		});
	};

	render() {
		const { list, username, password, isModify } = this.state;

		return (
			<div>
				<form onSubmit={this.handleInsert}>
					<input placeholder="아이디" name="username" value={username} onChange={this.handleChange} ref={this.usernameInput} />
					<input placeholder="비밀번호" name="password" value={password} onChange={this.handleChange} />
					<button type="submit">추가하기</button>
				</form>

				<ul>
					{list.map((user) => {
						return (
							<li key={user.id}>
								{user.username}의 비밀번호는 {user.password}입니다.
								<br />
								<button
									onClick={() => {
										this.handleDelete(user.id);
									}}
								>
									삭제하기
								</button>
								<button type="button" onClick={this.handleModfiy}>
									수정하기
								</button>
								{isModify && (
									<div>
										<input name="usernameModify" value={user.username} onChange={this.handleChange} />
										<input name="passwordModify" value={user.password} onChange={this.handleChange} />
										<button onClick={this.handleModfiySave}>저장</button>
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default App;
