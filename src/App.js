import  React from 'react';
import Navigation from './Component/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Rank from './Component/Rank/Rank';
import './App.css';
import ParticlesBg from 'particles-bg'
import { Component } from 'react';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'e09e6bd460004a9ba8c9559bd83265a3'
 });


class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl:'',
      box: {}
    }
  } 
 
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
      
  }

  onButtonSubmit = () => {
   
    this.setState({imageUrl: this.state.input})
     app.models
      .predict(Clarifai.FACE_DETECT_MODEL,
        this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
      }
      




      /*.then(response => {
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
  
*/

render(){
  return (
    <div className="App">
      <Navigation/>
      <ParticlesBg color="#ffffff" num={200} type="cobweb" bg={true}/>
      <Logo/>
      <Rank/>
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit} />
      
 <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
  </div>
  );
  }
}

export default App;