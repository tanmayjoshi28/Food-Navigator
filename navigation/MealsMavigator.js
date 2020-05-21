import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createDrawerNavigation, createDrawerNavigator} from 'react-navigation-drawer';

import React from  'react';
import {Platform} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors.js';
import CategoriesScreen from '../screens/CategoriesScreen.js';
import CategoriesMealsScreen from '../screens/CategoryMealsScreen.js';
import MealsDetailScreen from '../screens/MealsDetailScreen.js';
import FavouritesScreen from '../screens/FavoritesScreen.js';
import FiltersScreen from '../screens/FiltersScreen.js';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import FilterScreen from '../screens/FiltersScreen.js';

const MealsNavigator = createStackNavigator({
    Categories:{
        screen : CategoriesScreen,
        navigationOptions:{
            headerTitle:'Meals Category'
        }
    },
    CategoryMeals:{
        screen:CategoriesMealsScreen,
        navigationOptions:{
            headerStyle :{
                backgroundColor:"grey",
            },
        }
        },
    MealsDetail:MealsDetailScreen
},
    {
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:'grey'
            },
            headerTintColor:'white',
            headerTitleStyle:{
                fontFamily:'open-sans-bold'
            }
        }
        }
);

const FavNavigator=createStackNavigator({
    Favorties:{
        screen:FavouritesScreen,
        navigationOptions:{
            headerTitle:'Your Favorites !'
        }
    },

    MealsDetail: MealsDetailScreen
},
    {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'grey'
        },
        headerTintColor:'white',
    }
    }
)

const tabScreenConfig ={
    Meals:{
        screen:MealsNavigator,
        navigationOptions:{
            tabBarIcon: (tabinfo)=>{
                return <Ionicons name='ios-restaurant' size={25} color={tabinfo.tintColor} />
            }
        }
    },
    Favorties:{
        screen:FavNavigator,
        navigationOptions:{
            tabBarLabel:'Favourites !',
            tabBarIcon: (tabinfo)=>{
                return <Ionicons name='ios-star' size={25} color={tabinfo.tintColor} />
            },
            tabBarColor:Colors.accentColor
        }
    }
};

const MealsFavTabNavigator = 
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(tabScreenConfig,{
        activeColor:'white',
        shifting:true,
        
    })
    : createBottomTabNavigator(tabScreenConfig,{
        tabBarOptions:{
            activeTintColor:Colors.accentColor
        }
    });
const FilterNavigator = createStackNavigator({
    Filters:{
        screen:FilterScreen,
        navigationOptions:{
            headerTitle:'Your Filters',
            headerStyle:{
                backgroundColor:'grey'
            },
            headerTintColor:'white',
        }
    }
},
);

const MainNavigator = createDrawerNavigator({
    MealsFavs:{
        screen:MealsFavTabNavigator,
        navigationOptions:{
            drawerLabel:'Meals'
        }
    },
    Filters:FilterNavigator
},
    {
        contentOptions:{
            activeTintColor:Colors.accentColor,
            labelStyle:{
                fontFamily:'open-sans-bold'
            }
        }
    }
);

export default createAppContainer(MainNavigator);