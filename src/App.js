import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: 'chinese',
    }
  }

restaurantList() {
  Axios ({
    method: 'get',
    url: `https://developers.zomato.com/api/v2.1/search?`,
    responseType: 'json',
    headers: {
      'user-key': '2b0993e0c699ef3fdaa848e535d9df9f',
      'Accept': 'application / json'
    },
    params: {
      entity_id: 89,
      entity_type: 'city',
      start: searchStart,
      sort: 'rating',
      order: 'desc',
      q: this.state.userInput
      //API Call directed @ User Input
    }
  }).then((res) => {
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
  })
})}

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
