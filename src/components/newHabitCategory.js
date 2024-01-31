import {  useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Dimensions, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import theme from '../theme.style.js'
import Svg, { Rect } from 'react-native-svg';
import { GestureHandlerRootView, LongPressGestureHandler, State } from "react-native-gesture-handler";


const NewHabitCategory = (props) => {
    const {width} = Dimensions.get("window")
    const appWidth = width - 30

    return (
        <View>
            <Text style={styles.formLabel}>Category: {props.newHabit.category.name}</Text>
            <View style={styles.selectOrCreateCategory} >
            <SafeAreaView>
                <ScrollView horizontal={true} nestedScrollEnabled={true}>
                    <TouchableWithoutFeedback onPress={() => props.setOpenCreateCategory(true)}>
                        <View style={styles.createCategoryBtn}>
                            <Svg height="60%" width="60%" viewBox="0 0 100 100" >
                                <Rect x="45" y="0" width="10" height=" 100" rx="4.7" fill="#000" transform="translate(0 100) rotate(-90)"/>
                                <Rect x="45" y="0" width="10" height=" 100" rx="4.7" fill="#000" transform="translate(100 100) rotate(180)"/>
                            </Svg>
                        </View>
                    </TouchableWithoutFeedback>
                    <FlatList 
                        scrollEnabled={true}
                        style={styles.categoryItems}
                        keyExtractor={(item, index) => index.toString()}
                        key={props.categories.length}
                        numColumns={props.categories.length}
                        data={props.categories} renderItem={({item}) => <Category item={item} deleteCategory={props.deleteCategory} selectCategory={props.selectCategory}/>
                     }/>
                </ScrollView>
                </SafeAreaView>
            </View>
        </View> 
    )
}

const Category = (props) => {
    let [showDeleteBtn, setShowDeleteBtn] = useState(false)
    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          setShowDeleteBtn(showDeleteBtn = !showDeleteBtn)
        } 
      };

    return ( 
        <GestureHandlerRootView>
            <TouchableOpacity  onPress={() => props.selectCategory(props.item.value)}>
                <LongPressGestureHandler 
                onHandlerStateChange={onLongPress}
                minDurationMs={300}
                maxDist={5}
                >
                    <View style={[styles.categoryItem, {backgroundColor: props.item.value.color}]}>
                        <Text style={styles.categoryText}>
                            {props.item.value.name}
                        </Text>
                        {showDeleteBtn === true ? <DeleteButton deleteCategory={props.deleteCategory} id={props.item.id}/>: undefined}
                    </View>
                </LongPressGestureHandler>
            </TouchableOpacity>
        </GestureHandlerRootView>
       
    )
}

const DeleteButton = (props) => {
    return (
        <View style={styles.deleteBtn}>
            <TouchableWithoutFeedback onPress={() => props.deleteCategory(props.id)} hitSlop={{top: 110, bottom: 110, left: 110, right: 110}}>
                <Svg width="20" height="20" viewBox='0 0 500 500' style={{transform: [{ rotate: '45deg' }]}}>
                    <Rect fill="#ffffff" x="0" y="225" width="500" height="50" rx="30" transform="rotate(0)"/>
                    <Rect fill="#ffffff" x="225" y="0" width="50" height="500" rx="30" transform="rotate(0)"/>
                </Svg>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryItems: {
       
    },
    categoryItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: "#eaeaea",
        width: 135,
        height: 115,
        borderTopEndRadius: theme.BORDER_RADIUS,
        borderTopStartRadius: theme.BORDER_RADIUS,
        borderBottomEndRadius: theme.BORDER_RADIUS,
        borderBottomStartRadius: theme.BORDER_RADIUS,
        marginRight: 12,
        padding: 15,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: theme.LABEL_MARGIN,
    },
    categoryText: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: '#000',
        fontFamily: 'Poppins-SemiBold',
        textAlign: "center"
    },
    formLabel: {
        color: theme.SECONDARY_COLOR,
        
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Poppins-Regular',
        marginLeft: theme.APP_MARGIN,
    },
    createCategoryBtn: {
        height: 115,
        width: 60,
        backgroundColor: theme.PRIMARY_COLOR,
        borderTopEndRadius: theme.BORDER_RADIUS,
        borderTopStartRadius: theme.BORDER_RADIUS,
        borderBottomEndRadius: theme.BORDER_RADIUS,
        borderBottomStartRadius: theme.BORDER_RADIUS,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.APP_MARGIN,
        marginRight: 12,
        marginTop: theme.LABEL_MARGIN,
    },
    selectOrCreateCategory: {
        display: 'flex',
        flexDirection: 'row'
    },
    deleteBtn: {
        width: 35,
        height: 35,
        borderTopEndRadius: 17.5,
        borderTopStartRadius: 17.5,
        borderBottomEndRadius: 17.5,
        borderBottomStartRadius: 17.5,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        position: 'absolute',
        top: -12,
        right: -12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    }
  });

export default NewHabitCategory