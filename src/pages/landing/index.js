import React, { useState, useEffect } from 'react';
import { post, endpoints } from '../../libs/Client'
import { RestaurantCard } from '../../components/cards';
import { Typography} from '@material-ui/core';

const Component = () => {
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(()=>{
    post(endpoints.restaurants, {cityId: endpoints.istanbul}).then(({restaurants}) => setRestaurants(restaurants));
  }, [])

  return (
    <div>
      <section className="restaurants-header">
        <div className="restaurant-bg"/>
            <img src="assets/logos/transparent.svg" alt="triangle with all three sides equal" className="logo" />
            <Typography variant="h4">Yemekse derdin, Adisyon önersin!</Typography>
            <Typography variant="h2" className="restaurants-container-width title-restaurants">Restoranlar</Typography>
      </section>
      <section className="restaurants-container-width">
        <section className="restaurants-list">
          {restaurants.map(restaurant => <RestaurantCard data={restaurant} key={restaurant.id} />)}
        </section>
      </section>
    </div>
  );
}

export default Component;
