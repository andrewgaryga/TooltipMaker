import React, { Component } from 'react';
import './App.css';
import LocalStorageSaver from "./components/LocalStorageSaver";
import ImageList from "./components/ImageList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whatToRender: 'ImageList'
    }
  }

  toggleRender = (componentName) => {
    this.setState({
      whatToRender: componentName
    })
  }

  render() {
    switch (this.state.whatToRender) {
      case 'ImageList':
        return (
          <div>
            <nav id="single-line-menu" className="single-nav menu" role="navigation">
              <ul>
                  <li><h3>TooltipMaker</h3></li>
                  <li><button onClick={() => this.toggleRender('LocalStorageSaver')}>Add New Image</button></li>
              </ul>
            </nav>
            <ImageList />
            <button onClick={() => this.toggleRender('LocalStorageSaver')}>Add New Image</button>
          </div>
        )
      case 'LocalStorageSaver':
      return (
        <div>
          <nav id="single-line-menu" className="single-nav menu" role="navigation">
            <ul>
                <li><h3>TooltipMaker</h3></li>
                <li><button onClick={() => this.toggleRender('ImageList')}>Images List</button></li>
            </ul>
          </nav>
          <LocalStorageSaver />
        </div>
      )
      default:
        return (
            <div className="Error">
              <h1>404</h1>
            </div>
          );
    }
  }
}

export default App;
