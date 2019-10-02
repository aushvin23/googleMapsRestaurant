import React, {Component} from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
    }
  }

  


  render() {
    return (
      <div className="App">
        <h1>Restaurants Maps</h1>
        <form>
          <input type="text" placeholder="Search For Restaurant Here"/>
        </form>
      </div>
    );
  }
}

export default App;
