import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor() {
      super();

      this.state = {
          users: []
      }
  }

  async componentDidMount() {
    await fetch('https://api-placeholder.herokuapp.com/api/v1/blogs')
        .then(res => res.json())
        .then((data) => {
            this.setState({ users: data.data })
            console.log(data.data);
        })
        .catch(console.log)
        
  }
  

  renderUsers = () => {
      let users = this.state.users.map((data, index) =>
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.title}</td>
            <td>{data.content}</td>
            {/* <td>{data.image}</td> */}
          </tr>
      );

      return users;
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="text-center">Users List</h1>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>CONTENT</th>
                {/* <th>URL</th> */}
              </tr>
            </thead>
            <tbody>
              {this.renderUsers()}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

export default App;