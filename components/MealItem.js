import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ImageBackground } from 'react-native';

const MealItem = props =>{
    return(
        <View style={styles.mealitem}>
        <TouchableOpacity activeOpacity={0.8} onPress={props.onSelectMeal}>
            <View>
                <View style={{...styles.mealrow,...styles.mealheader}}>
                    <ImageBackground source={{uri:props.image}} style={styles.bgImage}>
                        <View style={styles.titlecontainer} >
                            <Text style={styles.title} >{props.title}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{...styles.mealrow,...styles.mealdetail}}>
                    <Text>{props.duration}-m</Text>
                    <Text>{props.complexity.toUpperCase()}</Text>
                    <Text>{props.affordability.toUpperCase()}</Text>
                </View>
            </View>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mealrow:{
        flexDirection:'row',
    },
    mealitem:{
        alignSelf:'center',
        height:200,
        width:'95%',
        backgroundColor:'#ccc',
        borderBottomColor:'black',
        borderRadius:10,
        overflow:'hidden'
    },
    mealheader:{
        height:'85%'
    },
    mealdetail:{
        alignItems:'center',
        paddingHorizontal:'2%',
        justifyContent:'space-between',
        height:'15%'

    },
    bgImage:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20,
        color:'white',
        textAlign:'center'
    },
    titlecontainer:{
        backgroundColor:'rgba(0,0,0,0.6)',
        paddingVertical:5,
        paddingHorizontal:12,
    }
});

export default MealItem;
