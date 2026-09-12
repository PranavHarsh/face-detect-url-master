import React, { Component } from "react";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation.js";
import Signin from "./components/Signin/Signin.js";
import Signup from "./components/Signup/Signup";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 300,
      density: { enable: true, value_area: 1000 },
    },
  },
};
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
  isLoading: false,
  error: "",
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = (event) => {
    if (event) event.preventDefault();
    this.setState({
      imageUrl: this.state.input,
      box: {},
      isLoading: true,
      error: "",
    });
    fetch(`${API_URL}/imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Face detection is unavailable. Check the API configuration.",
          );
        return response.json();
      })
      .then((response) => {
        const regions =
          response && response.outputs && response.outputs[0].data.regions;
        if (regions && regions.length) {
          fetch(`${API_URL}/image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((result) => {
              if (!result.ok)
                throw new Error("Unable to update your entry count");
              return result.json();
            })
            .then((count) =>
              this.setState({
                user: Object.assign({}, this.state.user, { entries: count }),
              }),
            )
            .catch((error) => this.setState({ error: error.message }));
          this.displayFaceBox(this.calculateFaceLocation(response));
        }
        if (!regions || !regions.length) {
          this.setState({ error: "No face was found in that image." });
        }
      })
      .catch((error) => this.setState({ error: error.message }))
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              isLoading={this.state.isLoading}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
            {this.state.error && <p className="red">{this.state.error}</p>}
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
