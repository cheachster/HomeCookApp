import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));




export default function BasicTextFields( props ) {
  const classes = useStyles();
  const ingredientRef = useRef();
  const recipeCountRef = useRef(); 

  function handleSubmit(event) {
      console.log( `onSubmit called...`)
    event.preventDefault();
    const ingredients = ingredientRef.current.value;
    const ingredientList = ingredients.replace(', ',',').split(',');
    const newCnt = recipeCountRef.current.value;
    console.log( 'ingredients=', ingredientList ); 
    props.setIngredientList( ingredientList );    
    props.setCount(newCnt);
       
}

useEffect(() => {
// recipeCntRef.current.value ;

    console.log(props.recipeCount)
}, [props.recipeCount]);

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField inputRef={ingredientRef} id="outlined-basic" label="Ingredients" variant="outlined" />

     {/* <InputLabel id="demo-simple-select-helper-label">Count</InputLabel> */}
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      inputRef={recipeCountRef}
      
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={25}>25</MenuItem>
      <MenuItem value={50}>50</MenuItem>
    </Select>
    <FormHelperText>Set amount of recipes</FormHelperText>
    <Button type="submit"
      variant="contained"
      color="primary"
      endIcon={<SendIcon>send</SendIcon>}
      >send</Button>
    </form>
  );
}