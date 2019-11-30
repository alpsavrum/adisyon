import React from 'react';
import {Card, CardActionArea, CardActions, CardMedia, CardContent, Typography, Button} from '@material-ui/core';

//{originalPhotoUrl, name, addressInfo, id}

const Component = ({data}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={data.originalPhotoUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <section className="restaurant-info-grid">
            <Typography variant="body1" color="textSecondary" component="p">
              {data.avgPrice}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p" align="right">
              {data.hotlinePhone}
            </Typography>
          </section>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.addressInfo}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Component;
