import React, { useState, Fragment } from 'react';
import ButtonAppBar from '../Nav/AppBar'
import BasicTextFields from '../Nav/inputfield'
import GetRecipies from '../GetRecipies'



function UserPage() {
  const [ recipeList, setRecipeList ] = useState([]);
  const [ ingredientList, setIngredientList ] = useState([]);
  const [ recipeCount, setCount]= useState(0);
  const [recipeData, setData] = useState([]);

    return (<Fragment>
      <ButtonAppBar/>
     <BasicTextFields  recipeCount={recipeCount} setCount={setCount}setIngredientList={setIngredientList}/>
     <GetRecipies setRecipeList={setRecipeList} recipeList={recipeList} ingredientList={ingredientList} recipeCount={recipeCount} 
     recipeData={recipeData} setData={setData}
     />
     </Fragment>
    );
  }
  
  export default UserPage;
  