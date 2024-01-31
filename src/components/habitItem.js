import { Gesture, GestureDetector, LongPressGestureHandler, State, GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from "react-native"
import { useState} from 'react';
import theme from '../theme.style.js'
import Animated, { FadeIn, FadeOut, Layout, ZoomIn, ZoomInEasyUp, SlideInDown, ZoomInEasyDown, event, useSharedValue, useAnimatedStyle} from "react-native-reanimated"
import { Audio } from 'expo-av';
import doneSound from '../../assets/sounds/done-sound.mp3'
import Svg, {Rect, Path} from "react-native-svg"



const HabitItem = (props) => {
    let [showDeleteBtn, setShowDeleteBtn] = useState(false)
    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          setShowDeleteBtn(showDeleteBtn = !showDeleteBtn)
        } 
      };

    return (
       
        <GestureHandlerRootView>
            <TouchableOpacity>
            {props.todo === true ?
                <Animated.View entering={ZoomIn.delay(200 * props.index).duration(500)} exiting={FadeOut.delay(400)} layout={Layout} >
                    <LongPressGestureHandler
                     onHandlerStateChange={onLongPress}
                     minDurationMs={300}
                     maxDist={5}
                     >
                         <View style={styles.itemCnt}>
                             <Animated.View style={[styles.habitItem, {backgroundColor: props.item.value.category.color, marginRight: theme.ITEM_GAP}]}>
                            <Text style={styles.categoryLabel}>{props.item.value.category.name}</Text>
                            <Text style={styles.habitName}>{props.item.value.name}</Text>
                            <CheckBox habitDone={props.habitDone} done={props.item.value.done} todaysDate={props.todaysDate} id={props.item.id}/>
                           
                        </Animated.View>
                        {showDeleteBtn === true ? <DeleteButton id={props.item.id} deleteHabit={props.deleteHabit}/>: undefined}
                         </View>
                        
                    </LongPressGestureHandler>
                   
                </Animated.View>
                :
                <Animated.View entering={SlideInDown.delay(200 * props.index).duration(800).easing()} >
                    <LongPressGestureHandler
                     onHandlerStateChange={onLongPress}
                     minDurationMs={500}
                     >
                        <View style={[styles.habitItem, props.index === 0 ? {marginLeft: theme.APP_MARGIN, marginRight: theme.APP_MARGIN}: {marginRight: theme.APP_MARGIN}, {backgroundColor: props.item.value.category.color, marginTop: 15}]}>
                            <Text style={styles.habitName}>{props.item.value.name}</Text>
                            {showDeleteBtn === true ? <DeleteButton id={props.item.id} deleteHabit={props.deleteHabit}/>: undefined}
                        </View>
                    </LongPressGestureHandler>
                </Animated.View>
            }</TouchableOpacity>
        </GestureHandlerRootView>
    )
}

const DeleteButton = (props) => {
    return (
        <Animated.View style={styles.deleteBtn}>
            <TouchableWithoutFeedback onPress={() => props.deleteHabit(props.id)}>
                <Svg width="15" height="15" viewBox='0 0 500 500' style={{transform: [{ rotate: '45deg' }]}}>
                    <Rect fill="#ffffff" x="0" y="225" width="500" height="50" rx="30" transform="rotate(0)"/>
                    <Rect fill="#ffffff" x="225" y="0" width="50" height="500" rx="30" transform="rotate(0)"/>
                </Svg>
            </TouchableWithoutFeedback>
        </Animated.View>
    )
}

const CheckBox = (props) => {
    let [isChecked, setIsChecked] = useState(false)
    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(doneSound);
        await sound.playAsync(); 
    }

        

    const handleClick = () => {
        
        setIsChecked(isChecked = !isChecked)
        setTimeout(function() {
            props.habitDone(props.id)
        }, 400)
        
        playSound()
    }
  
    return (
        <TouchableWithoutFeedback onPress={() => handleClick()}>
            <View style={styles.checkbox} >
                <Text>{isChecked === true ? 
                    <Svg viewBox="0 0 533.973 533.973" width="16" height="16" fill="rgba(255, 255, 255, 0.8)">
                        <Path d="M477.931,52.261c-12.821-12.821-33.605-12.821-46.427,0l-266.96,266.954l-62.075-62.069
                            c-12.821-12.821-33.604-12.821-46.426,0L9.616,303.572c-12.821,12.821-12.821,33.604,0,46.426l85.289,85.289l46.426,46.426
                            c12.821,12.821,33.611,12.821,46.426,0l46.426-46.426l290.173-290.174c12.821-12.821,12.821-33.605,0-46.426L477.931,52.261z"/>
                    </Svg>
                : ""}</Text>
            </View>
        </TouchableWithoutFeedback>
    
    )
}
const styles = StyleSheet.create({
    container: {
        height: theme.ITEM_HEIGHT,
        width: theme.ITEM_WIDTH,
        marginBottom: 15,
    },
    itemCnt: {
        // height: theme.ITEM_HEIGHT + 17.5,
        // width: theme.ITEM_WIDTH + 17.5,
        marginRight: theme.APP_MARGIN,
        marginTop: 15,
    },
    habitItem: {
        height: theme.ITEM_HEIGHT,
        width: theme.ITEM_WIDTH,
        backgroundColor: '#fff',
        borderTopEndRadius: theme.BORDER_RADIUS,
        borderTopStartRadius: theme.BORDER_RADIUS,
        borderBottomEndRadius: theme.BORDER_RADIUS,
        borderBottomStartRadius: theme.BORDER_RADIUS,
        paddingLeft: 11,
        paddingRight: 11,
        paddingTop: 15,
        overflow: "visible",
      
    },
    habitItemRepresent: {
        marginRight: 15,
        marginLeft: 15,
    },
    habitName: {
        color: theme.ANTI_COLOR,
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Poppins-SemiBold',
    },
    categoryLabel: {
        color: theme.ANTI_COLOR,
        fontSize: theme.FONT_SIZE_ULTRA_SMALL,
        fontFamily: 'Poppins-Regular',
        marginBottom: -6,
        height: 17,
    },
    checkbox: {
        width: 35,
        height: 35,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        position: 'absolute',
        bottom: 11,
        right: 11,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
        // zIndex: 999,
        marginLeft: 15,
        marginBottom: 15,
    }
})

export default HabitItem