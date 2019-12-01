import React, { useState, useEffect } from 'react';
import { post, endpoints } from '../../libs/Client'
import { paramExtractor } from '../../libs/StringUtils'
import { Typography, Paper, Button, Input, InputAdornment} from '@material-ui/core';
import ScrollContainer from 'react-indiana-drag-scroll'
import { poolMenu } from '../../engine/Pooler';
import _ from 'lodash';

const Component = () => {
  const [restaurant, setRestaurant] = useState();
  const [menu, setMenu] = useState();
  const [pool, setPool] = useState();

  useEffect(()=>{
    post(endpoints.restaurantsDetail, {restaurantId: paramExtractor()}).then(({restaurant, restaurantMenuInfos}) => {
      setRestaurant(restaurant);
      post(endpoints.restaurantsMenu, {
        restaurantId: paramExtractor(),
        restaurantMenuId: _.find(restaurantMenuInfos, {name: "A LA CARTE"}).id,
      }).then(({restaurantMenu}) => {
        setMenu(restaurantMenu.itemCategories);
      })
    });
  }, [])

  useEffect(()=>{
    console.log(poolMenu(menu));
  }, [menu])

  return (
    <div style={{position: 'relative'}}>
      <a className="button-back" href="/">
        <a className="button-back-arrow">←</a>
      </a>
      {restaurant &&
        <div>
          <section className="restaurants-header">
            <div className="restaurant-bg" style={{backgroundImage: `url("${restaurant.originalPhotoUrl}")`}}/>
            <img src="assets/logos/transparent.svg" alt="triangle with all three sides equal" className="logo" />
            <Typography variant="h4">Yemekse derdin, Adisyon önersin!</Typography>
            <Typography variant="h2" className="restaurants-container-width title-restaurants">{restaurant.name}</Typography>
          </section>
          <section className="restaurants-container-width m-32-t">
            <div className="grid row3x2">
              <div>
                <Typography variant="h4" className="no-margin center-mobile">Adres</Typography>        
                <Typography variant="body1" className="title-restaurants">{restaurant.addressInfo}</Typography> 
                <Typography variant="h4" className="title-restaurants">Telefon</Typography>        
                <Typography variant="body1" className="title-restaurants">{restaurant.hotlinePhone}</Typography>        
              </div>
              <Paper className="menu-paper">
                <Typography variant="h4" className="no-margin">Menü Oluştur</Typography>
                <Input
                  placeholder="Bütçenizi Girin."
                  id="standard-adornment-amount"
                  startAdornment={<InputAdornment position="start">₺</InputAdornment>}
                />
                <Input
                  placeholder="Kişi Sayısını Girin."
                  id="standard-adornment-amount"
                  startAdornment={<InputAdornment position="start"><span role="img" aria-label="person">👨</span></InputAdornment>}
                />
                <Button variant="contained" color="primary">Menü Oluştur</Button>
              </Paper>
            </div>
            <Typography variant="h4" className="title-restaurants">Menü</Typography>        
          </section>
        </div>
      }
      <ScrollContainer horizontal className="scroll-container restaurants-container-width">
        <section className="menu-section">
          { menu &&
            menu.map((segment, index) => 
              <ul className="menu-segment" key={segment.name+index}>
                <Typography variant="h5">
                  {segment.name}
                </Typography>
                {segment.menuItems.map((item, index) => 
                  <li className="flex" key={item.name+index} >
                    <Typography className="fl-1" variant="body1">
                      {item.name}
                    </Typography>
                    <Typography variant="body1">
                      {item.price}
                    </Typography>
                  </li>
                )}
              </ul>
            )}
        </section>
      </ScrollContainer>
    </div>
  );
}

export default Component;
