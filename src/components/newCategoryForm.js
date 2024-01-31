import { GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useDerivedValue} from "react-native-reanimated";
import { useEffect,useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme.style.js'
import Svg, { Rect } from "react-native-svg";
const pointerWidth = 20

const NewCategoryForm = (props) => {
    let [gradient, setGradient] = useState([])
    let [newCategory, setNewCategory] = useState({
        name:"",
        color: "",
    })

    useEffect(()=> {
        initiliaseGradient()
    }, [])


    function handleNewCategoryChange  (key, value) {
        setNewCategory(newCategory = {
            ...newCategory, [key]: value
        })
    }


   function initiliaseGradient() {
        let hslValues = []
        const colorsQuantity = 30
        for (let i = 0; i< colorsQuantity; i++) {
            let value =  (360 / colorsQuantity) * i
            let hslValue = "hsl(" + value + ", 100%, 62%)"
            hslValues.push(hslValue)
        }

        
        setGradient(gradient = hslValues)
        
        handleNewCategoryChange("color", gradient[0])
    }
   

    const translateX = useSharedValue(0)
    
    const adjustedTranslateX = useDerivedValue(() => {
        return Math.min(Math.max(translateX.value, 0), theme.APP_WIDTH - pointerWidth)
    })

    const hslValue = useSharedValue(0)
    const calculateColor = useDerivedValue(() => {
        return "hsl(" + hslValue.value + ", 100%, 62%)"
    })
    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.x = adjustedTranslateX.value
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x
            hslValue.value = (360 / theme.APP_WIDTH) * adjustedTranslateX.value
        }
    })


    const colorStyle = useAnimatedStyle(() => {
           
        return {
            backgroundColor: calculateColor.value
        }
    })

    const pointerStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: adjustedTranslateX.value}]
        }
    })
  
    function handleSaveBtn() {
       
        handleNewCategoryChange("color", calculateColor.value)


        props.addNewCategory(newCategory)
        setNewCategory(newCategory = {name:"", color: "",})
        props.setOpenCreateCategory(false)
    }
    return (
        <GestureHandlerRootView>
        <Animated.View style={styles.page}>
            <View style={styles.header}>
                <TouchableWithoutFeedback  onPress={() => props.setOpenCreateCategory(false)}>
                            <View style={{ position: "relative", height: 30, width: 30}}>
                                <Svg width="30" height="30" viewBox="0 0 400 400" style={[{position: "absolute", transform: [{rotate: "-45deg"}], marginLeft: 4}]}>
                                    <Rect x="0" y="0" height="40" width="250" fill="#fff" rx="30"></Rect>
                                    <Rect x="0" y="0" height="250" width="40" fill="#fff" rx="30" ></Rect>
                                </Svg>
                                <Svg width="30" height="30" viewBox="0 0 400 300" style={[{position: "absolute"}]}>
                                    <Rect x="0" y="130" height="40" width="400" fill="#fff" rx="30"></Rect>
                                </Svg>
                            </View>
                        </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.saveBtn} onPress={() => handleSaveBtn()}>
                    <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.headline}>Create a new category</Text>
                <TextInput style={styles.nameInput} placeholder="Add a name for your new category" placeholderTextColor={theme.SECONDARY_COLOR} value={newCategory.name} onChange={(event) => handleNewCategoryChange("name",event.nativeEvent.text)}></TextInput>
                <View style={styles.bottomBorder}></View>
                <View>
                    <Animated.View style={[styles.colorPreview, colorStyle]}>
                        <Text style={styles.colorSelectorLabel}>Select color</Text>
                    </Animated.View>
                    <PanGestureHandler onGestureEvent={panGestureEvent}>
                        <Animated.View>
                            <Animated.View style={styles.linearGradientCnt}>
                                 <LinearGradient style={styles.colorSelector} start={[0, 1]} end={[1, 0]} colors={['hsl(0, 100%, 62%)', 'hsl(12, 100%, 62%)', 'hsl(24, 100%, 62%)', 'hsl(36, 100%, 62%)', 'hsl(48, 100%, 62%)', 'hsl(60, 100%, 62%)', 'hsl(72, 100%, 62%)', 'hsl(84, 100%, 62%)', 'hsl(96, 100%, 62%)', 'hsl(108, 100%, 62%)', 'hsl(120, 100%, 62%)', 'hsl(132, 100%, 62%)', 'hsl(144, 100%, 62%)', 'hsl(156, 100%, 62%)', 'hsl(168, 100%, 62%)', 'hsl(180, 100%, 62%)', 'hsl(192, 100%, 62%)', 'hsl(204, 100%, 62%)', 'hsl(216, 100%, 62%)', 'hsl(228, 100%, 62%)', 'hsl(240, 100%, 62%)', 'hsl(252, 100%, 62%)', 'hsl(264, 100%, 62%)', 'hsl(276, 100%, 62%)', 'hsl(288, 100%, 62%)', 'hsl(300, 100%, 62%)', 'hsl(312, 100%, 62%)', 'hsl(324, 100%, 62%)', 'hsl(336, 100%, 62%)', 'hsl(348, 100%, 62%)']} />
                            </Animated.View>
                            <Animated.View style={[pointerStyle]}><Animated.View style={[styles.pointer, colorStyle]}></Animated.View></Animated.View>
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </View>
        </Animated.View></GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    page: {
        marginLeft: theme.APP_MARGIN,
        marginRight: theme.APP_MARGIN,
        width: theme.APP_WIDTH,
        paddingTop: theme.TOP_MARGIN,
        backgroundColor: theme.BACKGROUND_COLOR,
    },
    headline: {
        color: theme.PRIMARY_COLOR,
        fontSize: theme.FONT_SIZE_LARGE,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 15,
    },
    saveBtn: {
        backgroundColor: '#ffffff',
        width: 80,
        height: 30,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveBtnText: {
       alignSelf: 'center',
    },
    nameInput: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Poppins-Regular',
        color: theme.SECONDARY_COLOR,
    },
    bottomBorder: {
        backgroundColor: theme.SECONDARY_COLOR,
        height: 2,
        width: theme.APP_WIDTH,
        borderRadius: 20,
    },
    form: {
        marginTop: theme.TOP_MARGIN,
    },
    colorPreview: {
        width: theme.APP_WIDTH,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        borderTopEndRadius: theme.BORDER_RADIUS,
        borderTopStartRadius: theme.BORDER_RADIUS,
        borderBottomEndRadius: theme.BORDER_RADIUS,
        borderBottomStartRadius: theme.BORDER_RADIUS,
        marginTop: theme.HEADLINE_MARGIN,
        padding: 15,
    },
    linearGradientCnt: {
        width: theme.APP_WIDTH,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        overflow: "hidden",
        height: 12,
        marginTop: 15,
        backgroundColor: "grey"
    },
    colorSelectorLabel:{
        fontFamily: 'Poppins-Regular',
        fontSize: theme.FONT_SIZE_MEDIUM,
        overflow: "hidden",
        color: '#000'
    },
    colorSelector: {
        width: theme.APP_WIDTH + 30,
        height: 12,
    },
    pointer: {
        backgroundColor: '#fff',
        height: pointerWidth,
        width: pointerWidth,
        borderTopEndRadius: pointerWidth / 2,
        borderTopStartRadius: pointerWidth / 2,
        borderBottomEndRadius: pointerWidth / 2,
        borderBottomStartRadius: pointerWidth / 2,
        top: -16,
        borderColor: theme.PRIMARY_COLOR,
        borderWidth: 4,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
  });

export default NewCategoryForm