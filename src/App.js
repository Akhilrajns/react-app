import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

class App extends Component {

constructor(props) {
    super(props);
    this.state = {website: 'http://', depth: 0};
    this.commonChange = this.commonChange.bind(this);
    this.ajaxHandler = this.ajaxHandler.bind(this);
  }

commonChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
}

  ajaxHandler(event) {

  document.getElementById('result_link').innerHTML = '';
  document.getElementById('result_image').innerHTML = '';
  document.getElementById('loader').innerHTML = '<img src="/loader.gif" />';

  // Update base url 
  fetch('http://127.0.0.1:8000/api/v1/scrap/web?url='+this.state.website+'&depth='+this.state.depth)
    .then((response) => response.json())
    .then((responseJson) => {
            let result_link = ``;
            let result_image = ``;
            responseJson.links.forEach((link) => {
                  result_link +=`<li><a href="${link}" target="_blank">${link}</a></li>`;
                })
            responseJson.images.forEach((image) => {
                  result_image +=`<li><a href="${image}" target="_blank"><img width="200" src="${image}" /></a></li>`;
            })
            document.getElementById('result_link').innerHTML = result_link;
            document.getElementById('result_image').innerHTML = result_image;
            document.getElementById('loader').innerHTML = '';

      return responseJson;
    }).catch((error) => {
      alert('Invalid data or Failed to load the content.');
      document.getElementById('loader').innerHTML = '';
      console.error(error);
    });
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Django Web Scrapper</h1>
        </header>
        <div className="Search-box">
<form >
          <input type="text" placeholder="Website URL" className="textBox" name="website" onChange={this.commonChange} />
            Depth
        <select name="depth" onChange={this.commonChange}>
            { _.range(0, 10 + 1).map(value => <option key={value} value={value}>{value}</option>) }
          </select>
        <input type="button" value="Submit"  onClick={this.ajaxHandler}/>
      </form>
      </div>
      <div id="loader"></div>
      <div className="result-box">
      
<ul id="result_link"></ul>
<ul id="result_image"></ul>
        </div>
        <footer className="App-footer">
          <p>Copyright &copy; 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
