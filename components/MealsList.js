import React from 'react';
import { StyleSheet, Text, View,Button,FlatList } from 'react-native';
import {CATEGORIES,MEALS} from '../data/dummy-data.js';

import {useSelector} from 'react-redux';
import MealItem from '../components/MealItem.js';

const MealsList = props =>{
    const favMeals = useSelector(state=>state.meals.favoriteMeals);
    const renderMealItem = itemData =>{
        const isFav = favMeals.find(meals=>meals.id===itemData.item.id)
        return(
            <MealItem 
                title={itemData.item.title} 
                duration={itemData.item.duration}
                affordability = {itemData.item.affordability}
                complexity = {itemData.item.complexity}
                image={itemData.item.imageUrl}
                onSelectMeal={()=>{
                    props.navigation.navigate({routeName:'MealsDetail',params:{
                        mealId:itemData.item.id,
                        mealTitle:itemData.item.title,
                        isFavorite:isFav
                    }
                });
                }} />
        )
    }

    return(
    <View style={styles.list}>
        <FlatList data={props.listData} keyExtractor={(item,index)=>item.id} 
            renderItem={renderMealItem} 
            style={{width:'100%'}} 
        />
    </View>
    )
};

const styles = StyleSheet.create({
    list:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:15
    }
});

export default MealsList;