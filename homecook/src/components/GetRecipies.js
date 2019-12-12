import React, {useState, useEffect} from 'react'
import RecipeCard from './ImgMediaCard';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import ImgMediaCard from './ImgMediaCard';
import Typography from '@material-ui/core/Typography';


function GetRecipies (props){
    const apiKey = 'ebcb5d1be5msh24cd75f911073eap1e1b94jsn721701dfbafc'
    


    useEffect(() =>{
        ( async ()=>{
            const data = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=${props.recipeCount}&ranking=1&ignorePantry=false&ingredients=${escape(props.ingredientList.join(','))}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                        "x-rapidapi-key": apiKey } } )
                        .then( res => res.json());
            props.setRecipeList( data );
            console.log(`api result:`, data)

            

           

       
            

        })();

        
    }
    ,[props.ingredientList])



    
        return (
            <div>
                <Typography variant="h1" component="h2">
                    Recipes
            </Typography>
                <Grid
                container
                spacing={10}
                style={{padding:'12px' }}
                >
                {props.recipeList ? props.recipeList.map( (recipe , i)=> 
                <Grid 
                item 
                xs={12} sm={6} md={4} lg={4} xl ={3}
                >
                <div key={i}>   
                <ImgMediaCard recipe={recipe}/>
                </div> 
                </Grid>
                
                ) : "none" }

                </Grid>
            </div>
        )
    }

export default GetRecipies;