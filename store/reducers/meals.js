import {MEALS} from '../../data/dummy-data';
import {TOOGLE_FAVORITE, SET_FILTERS} from '../actions/meals';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';

const initiatState = {
    meals:MEALS,
    filteredMeals:MEALS,
    favoriteMeals:[],

};

const mealsReducer = (state = initiatState,action) => {
    switch (action.type){
        case TOOGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal =>meal.id===action.mealId);
            if (existingIndex>=0){
                const updatedFav = [...state.favoriteMeals];
                updatedFav.splice(existingIndex,1);
                return { ...state, favoriteMeals:updatedFav};
            }
            else{
                const meal = state.meals.find(meal =>meal.id===action.mealId)
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)};
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedfilteredMeals = state.meals.filter(meal =>{
                if(appliedFilters.glutenFree && !meal.isGlutenFree)
                {
                    return false;
                }
                if(appliedFilters.lactoseFree && !meal.islactoseFree)
                {
                    return false;
                }
                if(appliedFilters.vegetarian && !meal.isVegetarian)
                {
                    return false;
                }
                if(appliedFilters.vegan && !meal.isVegan)
                {
                    return false;
                }
                return true;
            });
            return{...state,filteredMeals:updatedfilteredMeals}
        default:
            return state;
        }
}
export default mealsReducer;
