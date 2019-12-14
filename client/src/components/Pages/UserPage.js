import React, { useState, Fragment } from 'react';
import ButtonAppBar from '../Nav/AppBar'
import BasicTextFields from '../Nav/inputfield'
import GetRecipies from '../GetRecipies'

function UserPage() {
  const [recipeList, setRecipeList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [recipeCount, setCount]= useState(0);
  const [recipeData, setData] = useState([]);

  // check valid user
  if( Number(localStorage.userID)>0 ){
    console.log( `great valid user: ${localStorage.userID}` );
  } else {
    window.location.href = '/';
    return <Fragment>Invalid login</Fragment>;
  }

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
  