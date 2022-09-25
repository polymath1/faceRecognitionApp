import  React from 'react';
import Navigation from './Component/Navigation/Navigation';
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Rank from './Component/Rank/Rank';
import './App.css';
import ParticlesBg from 'particles-bg'
import { Component } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
    }
  } 

  onInputChange = (event) => {
    this.setState({input: event.target.value});
      
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input});
    app.models
      .predict('e09e6bd460004a9ba8c9559bd83265a3', this.state.input)
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    .then(response => {
      console.log('hi', response)
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}
  

render(){
  return (
    <div className="App">
      <Navigation/>
      <ParticlesBg color="#ffffff" num={200} type="cobweb" bg={true}/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      
 {/* <FaceRecognition/>*/}
  </div>
  );
  }
}
export default App;