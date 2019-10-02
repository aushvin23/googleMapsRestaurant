import React, {Component} from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: 'Chinese',
      restaurantMatches: []
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function to make axios call to Zomato to get Restaurant information
  getRestaurantsList = () => {
    Axios({
      method: 'Get',
      url: `https://developers.zomato.com/api/v2.1/search?`,
      dataResponse: 'json',
      headers: {
        'user-key': '2b0993e0c699ef3fdaa848e535d9df9f',
        'Accept': 'application / json'
      },
      params: {
        entity_id: 89,
        entity_type: 'city',
        start: 0,
        sort: 'rating',
        order: 'desc',
        q: 'Chinese',
        //API Call directed @ User Input
      }
    }).then((res) => {
      // filtering out any results with no votes
      const originalResults = res.data.restaurants.filter((item) => {
        return item.restaurant.user_rating.votes > 0
      })
      // returning an object that holds information about each restaurant
      const restaurantResults = originalResults.map((item) => {
        return {
          name: item.restaurant.name,
          thumb: item.restaurant.featured_image,
          address: item.restaurant.location.address,
          rating: item.restaurant.user_rating.aggregate_rating,
          votes: item.restaurant.user_rating.votes,
          cost: item.restaurant.price_range,
          phone: item.restaurant.phone_numbers,
        }
      });
      console.log(restaurantResults);
      this.setState({
        restaurantMatches: restaurantResults
      })
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  googleMapsCall = () => {
    const password = ((process.env.REACT_APP_GOOGLE_API_KEY).slice(1,-1)).slice(0,-1);
    const origin = 'HackerYou'
    Axios({
      method: `GET`,
      url: `http://proxy.hackeryou.com`,
      dataResponse: `json`,
      params: {
        reqUrl: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${`38 Wharnsby Drive`}}&key=${password}&mode=driving`,
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }

    }).then((res) => {
      console.log(res.data.rows[0].elements[0].duration.text);
      // time in seconds
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // makeRequest = () => {
  //   this.getRestaurantsList().then( () => {
  //       return this.googleMapsCall()
  //     })
  // }

  makeRequest = async () => {
    const restaurantData = await this.getRestaurantsList();
    const distanceData = await this.googleMapsCall();
    if (restaurantData === true) {
      return distanceData;
    }
    else {
      console.log('broken');
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="App">
        <h1>Restaurants Maps</h1>
        <form>
          <input type="text" placeholder="Search For Restaurant Here" onClick={this.makeRequest} />
        </form>
      </div>
    );
  }
}

export default App;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////