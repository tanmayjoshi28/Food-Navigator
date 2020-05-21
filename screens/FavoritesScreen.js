import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import {useSelector} from 'react-redux';
import MealList from '../components/MealsList.js';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
const FavoriteScreen = props =>{
    const favMeals = useSelector(state=> state.meals.favoriteMeals);

    if (favMeals.length===0 || !favMeals)
    {
        return(
        <View style={styles.content}>
            <Text>No Favorite meals fount</Text>
            <Text>Start Adding some !</Text>
        </View>
        )
    }
    return(
        <MealList listData={favMeals} navigation={props.navigation}/>
    );
};

FavoriteScreen.navigationOptions = (navigationData)=>{
    return{
    headerLeft:()=>(
        <TouchableNativeFeedback>
            <Icon name='navicon'  size={30} onPress={()=>{navigationData.navigation.toggleDrawer();} }/>
        </TouchableNativeFeedback>
    )
    };
};
const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default FavoriteScreen;