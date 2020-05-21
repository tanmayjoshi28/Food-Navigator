import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';

import {CATEGORIES} from '../data/dummy-data.js';
import Colors from '../constants/Colors.js';
import CategoryGridTile from '../components/CategoryGridTile'
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = props =>{

    const renderGridItem = (itemData) =>{
        return(
            <CategoryGridTile 
                color={itemData.item.color}
                title = {itemData.item.title} onSelect={()=>  {
                props.navigation.navigate({routeName:'CategoryMeals',params:{categoryId:itemData.item.id}});
            }} />
        )};
    return(
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
    );
};

CategoriesScreen.navigationOptions = (navigationData)=>{
    return{
    headerLeft:()=>(
        <TouchableNativeFeedback>
            <Icon name='navicon'  size={30} onPress={()=>{navigationData.navigation.toggleDrawer();} }/>
        </TouchableNativeFeedback>
    )
    };
};


const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    
});

export default CategoriesScreen;