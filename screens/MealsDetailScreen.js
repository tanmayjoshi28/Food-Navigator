import React, { useState,useEffect,useCallback } from 'react';
import { StyleSheet, Text, View,Button,ScrollView,Image } from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import {toogleFavorite} from '../store/actions/meals';
import {useSelector,useDispatch} from 'react-redux';

import HeaderButton from '../components/HeaderButton.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const ListItem = props =>{
    return(
        <View style={styles.listitem}>
           <Text>{props.children}</Text> 
        </View>
    )
}

const MealsDetailScreen = props =>{
    const availableMeals = useSelector(state=>state.meals.meals);
    const mealId = props.navigation.getParam('mealId'); 
    const mealIsFavorite = useSelector(state=>state.meals.favoriteMeals.some(meal=>meal.id===mealId));
    const selectedMeal = availableMeals.find(meal =>meal.id===mealId);
    
    const dispatch = useDispatch();

    const toggleFavHandler = useCallback(()=>{
        dispatch(toogleFavorite(mealId));
    },[dispatch,mealId]);

    useEffect(()=>{
        //props.navigation.setParams({'mealTitle':selectedMeal.title});
        props.navigation.setParams({togglefav:toggleFavHandler})
    },[toggleFavHandler]);

    useEffect(()=>{
        props.navigation.setParams({isFav:mealIsFavorite});
    },[mealIsFavorite]);

    return(
    <ScrollView>
        <Image source={{uri:selectedMeal.imageUrl}} style={styles.image}/>
        <View style={styles.detail} >
            <Text>{selectedMeal.duration}-m</Text>
            <Text>{selectedMeal.complexity.toUpperCase()}</Text>
            <Text>{selectedMeal.affordability.toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(ingredient =>(<ListItem key={ingredient}>{ingredient}</ListItem> ))}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map(step =>(<ListItem key={step}>{step}</ListItem> ))}
    </ScrollView>
    
    );
};
MealsDetailScreen.navigationOptions = (navigationData) =>{
    //const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFav = navigationData.navigation.getParam('togglefav');
    //const selectedMeal = MEALS.find(meal =>meal.id===mealId);
    const isFav = navigationData.navigation.getParam('isFav');


    return{
        headerTitle: mealTitle,
        headerRight:()=>(
            <TouchableNativeFeedback>
                <Icon name={isFav ?'ios-star' : 'ios-star-outline'} color="green" size={30} onPress={toggleFav}/>
            </TouchableNativeFeedback>
            )
    };
};

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:200
    },
    detail:{
        flexDirection:'row',
        padding:15,
        justifyContent:'space-around'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        textAlign:'center'
    },
    listitem:{
        marginVertical:10,
        marginHorizontal:20,
        borderColor:'green',
        borderWidth:1,
        padding:4

    }
});

export default MealsDetailScreen;