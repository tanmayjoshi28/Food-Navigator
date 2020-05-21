import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View,Switch } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';

import {setFilters} from '../store/actions/meals';
import {useDispatch} from 'react-redux';
import Colors from '../constants/Colors';

const FilterSwitch =props =>{
    return(
        <View style={styles.filtercontainer}>
            <Text>{props.label}</Text>
            <Switch value={props.state} 
                onValueChange={props.onChange}
                trackColor={{true:Colors.accentColor}}
                thumbColor='white'
            />
        </View>
    );
};
const FilterScreen = props =>{
    const {navigation} = props;
    const [glutenFree,setGlutenFree]=useState(false);
    const [lactoseFree,setLactoseFree]=useState(false);
    const [vegan,setVegan]=useState(false);
    const [vegetarian,setVegetarian]=useState(false);

    const dispatch = useDispatch();

    const saveFilter = useCallback(() =>{
        const appliedFiters = {
        glutenFree: glutenFree,
        lactoseFree: lactoseFree,
        vegan: vegan,
        vegetarian: vegetarian,
        };
        dispatch(setFilters(appliedFiters))
    },[glutenFree,lactoseFree,vegetarian,vegan,dispatch]);

    useEffect(()=>{
        props.navigation.setParams({save: saveFilter});
    },[saveFilter]);   

    return(
    <View style={styles.screen}>
        <Text style={styles.title}>Availble Filter / Restriction </Text>
        <FilterSwitch label = "Gluten-Free" state={glutenFree} onChange={newvalue =>setGlutenFree(newvalue)} />
        <FilterSwitch label = "Lactose-Free" state={lactoseFree} onChange={newvalue =>setLactoseFree(newvalue)} />
        <FilterSwitch label = "Vegan" state={vegan} onChange={newvalue =>setVegan(newvalue)} />
        <FilterSwitch label = "Vegetarian" state={vegetarian} onChange={newvalue =>setVegetarian(newvalue)} />
    </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    },
    filtercontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'80%',
        marginVertical:20
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        margin:20,
        textAlign:'center'
    }
});

FilterScreen.navigationOptions = (navigationData)=>{
    return{
    headerLeft:()=>(
        <TouchableNativeFeedback>
            <Icon name='navicon'  size={30} onPress={()=>{navigationData.navigation.toggleDrawer();} }/>
        </TouchableNativeFeedback>
    ),
    headerRight:()=>(
        <TouchableNativeFeedback>
            <Icon name='check' size={30} onPress={navigationData.navigation.getParam('save')}/>
        </TouchableNativeFeedback>
    )
    };
};

export default FilterScreen;