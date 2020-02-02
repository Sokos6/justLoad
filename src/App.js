import React, { Component } from "react";
import Loader from "./Loader";
import ShowDetail from "./ShowDetail";



class App extends Component {
  state = { loading: true };

  fetchGithub = () => {
    fetch('https://api.github.com/users/sokos6')
      .then((res) => res.json())
      .then((res) => {
        let { login, name, company, blog, location, bio } = res;
        this.setState({
          login: login,
          name: name,
          company: company,
          blog: blog,
          location: location,
          bio: bio,
          loading: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.wait();
      });
  };

  componentDidMount() {
    this.wait(10000);
    this.fetchGithub();
  }

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  };

  wait = async(milliseconds = 2000) => {
    await this.sleep(milliseconds);
    this.setState({
      login: 'Will',
      name: 'William',
      company: 'Motus',
      blog: 'comicbooked.com',
      location: 'Elkhorn, WI',
      bio: 'Software Engineer',
      loading: false
    });
  };



  render() {
    if (this.state.loading) return <Loader />;
    let { name, blog, company, location, bio } = this.state;
    let details = { name, blog, company, location, bio };
    return <ShowDetail details={details} />;
  }
}
export default App;
