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
  const [offer, setOffer] = useState([]);

  const [budget, setBudget] = useState();
  const [people, setPeople] = useState();


  useEffect(()=>{
    post(endpoints.restaurantsDetail, {restaurantId: paramExtractor()}).then(({restaurant, restaurantMenuInfos}) => {
      setRestaurant(restaurant);
      post(endpoints.restaurantsMenu, {
        restaurantId: paramExtractor(),
        restaurantMenuId: (_.find(restaurantMenuInfos, {name: "A LA CARTE"}))?_.find(restaurantMenuInfos, {name: "A LA CARTE"}).id:null,
      }).then(({restaurantMenu}) => {
        restaurantMenu && setMenu(restaurantMenu.itemCategories);
      })
    });
  }, [])

  useEffect(()=>{
    setPool(poolMenu(menu));
  }, [menu])

  const buildMenu = () => {
    let menu = [];
    let mainCourse = _.groupBy(pool.mainCourse, ({price}) => price < budget / people + 1).true;
    _.times(people, () => {
      menu.push(_.sample(mainCourse))
    });
    setOffer(menu)
  }

  const continueMenu = () => {
    const joint = pool.appetizers.concat(pool.midhot, pool.dessert, pool.salads, pool.starts);
    console.log(joint);
    let selectables = _.groupBy(
      joint,
      (item) => 
        item && item.price < (budget - _.sumBy(offer, 
          (item)=> item && item.price))).true;
    if(selectables) {
      let selected = _.sample(selectables)
      setOffer([...offer, ...[selected]])
    }
  }
  
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
                  onChange={e=>setBudget(Number(e.target.value))}
                  startAdornment={<InputAdornment position="start">₺</InputAdornment>}
                />
                <Input
                  placeholder="Kişi Sayısını Girin."
                  id="standard-adornment-amount"
                  onChange={e=>setPeople(Number(e.target.value))}
                  startAdornment={<InputAdornment position="start"><span role="img" aria-label="person">👨</span></InputAdornment>}
                />
                <div>
                  {offer.map(({name, price}) => 
                    <div className="flex">
                      <p className="fl-1">{name}</p>
                      <p>{price} TL</p>
                    </div>
                  )}
                  {(offer.length > 0) && <p>Kalan Bütçe: {budget - _.sumBy(offer, ({price})=> price)} TL</p>}
                </div>
                <div className="grid grid-2x1">
                  <Button variant="contained" color="primary" onClick={()=>buildMenu()}>{(offer.length < 1)?`Menü Oluştur`:`Yeniden Başla`}</Button>
                  <Button variant="contained" disabled={offer.length < 1 || (budget - _.sumBy(offer, ({price})=> price) < 1)} color="primary" onClick={()=>continueMenu()}>Doldur</Button>
                </div>
              </Paper>
            </div>
            <Typography variant="h4" className="title-restaurants">Menü</Typography>        
          </section>
        </div>
      }
      <ScrollContainer horizontal className="scroll-container restaurants-container-width">
        <section className="menu-section">
          { menu ?
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
            ) : <Typography variant="h5" className="title-restaurants">Yok ki.</Typography> }
        </section>
      </ScrollContainer>
    </div>
  );
}

export default Component;
