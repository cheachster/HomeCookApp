import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const apiKey = 'ebcb5d1be5msh24cd75f911073eap1e1b94jsn721701dfbafc'
  console.log(props)



 
  const recipeOpen = async () => {
    console.log('recipeOpen called ')
     const recipeData = await fetch (`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.recipe.id}/information`, {
    "method": "GET",
    "headers" : {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": apiKey
    }}).then( res => res.json());
    

  window.open(recipeData.sourceUrl);
    

  }



  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.recipe.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {props.recipe.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button  type='button' size="small" color="primary" onClick={recipeOpen} >
          Share
        </button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}