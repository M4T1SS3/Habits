import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import theme from '../theme.style.js'

const NewHabitRepetition = (props) => {
    let [everyDays, setEveryDays] = useState(false)
    let [repetitionType, setRepetitionType] = useState(0)
    let [colorArrayDays,setColorArrayDays] = useState([false, false, false, false, false, false, false])
    
    useEffect(() => {
        handleDaysColor(colorArrayDays, false)
        handleRepetitionType(0)
    },[])

    useEffect(() => {
        
        const allDays = props.newHabit.repetition.days
        const allDaysValues = Object.values(allDays)
        
        if (allDaysValues.every(item => item === false) === true) {
            handleDaysColor(allDaysValues, false)
            handleEveryDaysSwitch(false)
        }
    }, [props.newHabit.repetition.days])

    
    function handleDaysColor(valueArray, everyDays) {
        let array = []
        if (everyDays === true) {
            valueArray = [true, true, true, true, true, true, true]
        }

        for (let i = 0; i < valueArray.length; i++) {
            if (valueArray[i] === true) {
                array.push(["#ffffff","#000000"])
            } else {
                array.push([theme.OFF_BLACK, "#ffffff"])
            }
        }
        setColorArrayDays(array)
    }
    
    const newHabitDaysChange = (index, everyDays) => {
       const days = props.newHabit.repetition.days
        const daysValues = Object.values(days)
        let allEqual = daysValues.every(item => item === daysValues[0])
       
        if (everyDays === true) {
            for (let i = 0; i < 7; i++) {
                days[Object.keys(days)[i]] = true
            }

        } else if(everyDays === false && allEqual === true) {
            for (let i = 0; i < 7; i++) {
                days[Object.keys(days)[i]] = false
            }
        } 
        
        else if (index !== undefined){
    
            days[Object.keys(days)[index]] = !days[Object.keys(days)[index]]
        }

        allEqual = Object.values(days).every(item => item === Object.values(days)[0])
        const allActive = Object.values(days).every(item => item === true)
        if (allEqual === false && everyDays === undefined) {
             handleEveryDaysSwitch(false)
        }
        else if (allActive === true && everyDays === undefined) {
            handleEveryDaysSwitch(true)
        }
        
        handleDaysColor(Object.values(days), everyDays)
    }



    function handleEveryDaysSwitch(value) {

        setEveryDays(everyDays = value)
    
        newHabitDaysChange(undefined, everyDays)
    }

    function newHabitRepeatEveryChange(value) {
        props.newHabit.repetition.repeatEvery = value
    }


    let [repetitionTypeColor, setRepetitionTypeColor] = useState([])
    function handleRepetitionTypeColor(index) {
        if (index === 0) {
            setRepetitionTypeColor(repetitionTypeColor = [theme.PRIMARY_COLOR, theme.SECONDARY_COLOR, theme.SECONDARY_COLOR])
        } else if (index === 1) {
            setRepetitionTypeColor(repetitionTypeColor = [theme.SECONDARY_COLOR,theme.PRIMARY_COLOR,  theme.SECONDARY_COLOR])
        } else if (index = 2) {
            setRepetitionTypeColor(repetitionTypeColor = [theme.SECONDARY_COLOR, theme.SECONDARY_COLOR, theme.PRIMARY_COLOR])
        }


    }

    function handleRepetitionType(index) {
        setRepetitionType(repetitionType = index)
        handleRepetitionTypeColor(index)
    }

    return (
        <View style={styles.repetitionSection}>
            <Text style={styles.formLabel}>Repeat</Text>
            <View style={styles.selectRepetitionType}>
                <RepetitionTypeNav index={0} label="Daily" repetitionTypeColor={repetitionTypeColor} handleRepetitionType={handleRepetitionType}/>
                <RepetitionTypeNav index={1} label="Weekly" repetitionTypeColor={repetitionTypeColor} handleRepetitionType={handleRepetitionType}/>
                <RepetitionTypeNav index={2} label="Monthly" repetitionTypeColor={repetitionTypeColor} handleRepetitionType={handleRepetitionType}/>
            </View>
            <View>
                {repetitionType === 1 ? <RepetitionNotDaily newHabitRepeatEveryChange={newHabitRepeatEveryChange} label="weeks"/>: undefined}
                {repetitionType === 2 ? <RepetitionNotDaily newHabitRepeatEveryChange={newHabitRepeatEveryChange} label="months"/>: undefined}
            </View>
            <View>
                <Text style={styles.formLabel}>{repetitionType === 0 ? "During these days" : "Repeats on:"}</Text>           
                <View style={styles.selectDay}>
                    <Day newHabitDaysChange={newHabitDaysChange} index={0} label="Mo" colorArrayDays={colorArrayDays}></Day>
                    <Day newHabitDaysChange={newHabitDaysChange} index={1} label="Tu" colorArrayDays={colorArrayDays}></Day>
                    <Day newHabitDaysChange={newHabitDaysChange} index={2} label="We" colorArrayDays={colorArrayDays}></Day>
                    <Day newHabitDaysChange={newHabitDaysChange} index={3} label="Th" colorArrayDays={colorArrayDays}></Day>
                    <Day newHabitDaysChange={newHabitDaysChange} index={4} label="Fr" colorArrayDays={colorArrayDays}></Day>
                    <Day newHabitDaysChange={newHabitDaysChange} index={5} label="Sa" colorArrayDays={colorArrayDays}></Day>
                    <Day newHabitDaysChange={newHabitDaysChange} index={6} label="Su" colorArrayDays={colorArrayDays}></Day>
                </View>
            </View>
            <View style={styles.everyDays}>
                <Text style={styles.switchLabel}>Every days</Text>
                <SwitchToggle
                    switchOn={everyDays}
                    onPress={() => handleEveryDaysSwitch(!everyDays)}
                    circleColorOff='#E0E0E0'
                    circleColorOn='#E0E0E0'
                    backgroundColorOn = {theme.OFF_BLACK}
                    backgroundColorOff = {theme.OFF_BLACK}

                    containerStyle={{
                        width: 60,
                        height: 38,
                        borderRadius: 24,
                        padding: 4,
                      }}

                    circleStyle={{
                        width: 30,
                        height: 30,
                        borderRadius: 20,
                      }}
                />
            </View>
            <View>
            </View>
        </View>
    )
}

const RepetitionTypeNav  = (props) => {
    const color  =  props.repetitionTypeColor[props.index]
    return (
        <TouchableOpacity onPress={() => props.handleRepetitionType(props.index)} style={[styles.repetitionTypeNavItem, {borderBottomColor: color}]}>
              <Text style={[styles.repetitionTypeNavLabel, {color: color}]}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const Day = (props) => {

    return (
        <TouchableOpacity style={[{backgroundColor: props.colorArrayDays[props.index][0]}, styles.day]} onPress={() => props.newHabitDaysChange(props.index, undefined)}>
            <Text style={[{color: props.colorArrayDays[props.index][1]}]}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const RepetitionNotDaily = (props) => {
    return (
        <View>
            <Text style={styles.formLabel}>Repeat all:</Text>
            <View style={styles.repeatAllSection}>
                <View style={[styles.day, {backgroundColor: theme.OFF_BLACK}]}>
                    <TextInput placeholderTextColor={theme.SECONDARY_COLOR} style={styles.numberInput} placeholder="1" keyboardType='numeric' max="24" onChange={(event) => props.newHabitRepeatEveryChange({value: event.nativeEvent.text, unit: props.label})}></TextInput>
                </View>
             
                <View style={styles.repetitionTypeLabel}>
                    <Text style={styles.dayLabel}>{props.label}</Text>
                </View>
                
            </View>
        </View>
    )
}


const repetitionTypeNavItemWidth = (theme.APP_WIDTH / 3) - 7.5
const repetitionTypeLabelMargin = (theme.APP_WIDTH / 7) - 50
const styles = StyleSheet.create({
    selectDay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.LABEL_MARGIN,

    },

    everyDays: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    day: {
        padding: 8,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderTopEndRadius: theme.BORDER_RADIUS_SMALL,
        borderTopStartRadius: theme.BORDER_RADIUS_SMALL,
        borderBottomEndRadius: theme.BORDER_RADIUS_SMALL,
        borderBottomStartRadius: theme.BORDER_RADIUS_SMALL,
        color: theme.PRIMARY_COLOR
    },
    dayLabel: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.PRIMARY_COLOR,
        fontFamily: 'Poppins-Regular'
    },
    formLabel: {
        color: theme.SECONDARY_COLOR,
        marginBottom: theme.LABEL_MARGIN,
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Poppins-Regular'
    },
    switchLabel: {
        color: theme.SECONDARY_COLOR,
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Poppins-Regular'
    },
    repetitionSection: {
        marginBottom: 60,
        marginLeft: theme.APP_MARGIN,
        marginRight: theme.APP_MARGIN
    },
    selectRepetitionType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    repetitionTypeNavItem: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: theme.SECONDARY_COLOR,
        borderBottomWidth: 2,
        width: repetitionTypeNavItemWidth,
        height: 26,
    },
    repetitionTypeNavLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: theme.FONT_SIZE_SMALL
    },
    repeatAllSection: {
        flexDirection: 'row',
        marginBottom: theme.LABEL_MARGIN,
    },
    repetitionTypeLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 50,
        borderTopEndRadius: theme.BORDER_RADIUS_SMALL,
        borderTopStartRadius: theme.BORDER_RADIUS_SMALL,
        borderBottomEndRadius: theme.BORDER_RADIUS_SMALL,
        borderBottomStartRadius: theme.BORDER_RADIUS_SMALL,
        marginLeft: repetitionTypeLabelMargin,
        overflow: "hidden"
    },
    numberInput: {
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        color: theme.SECONDARY_COLOR,
    }
})


export default NewHabitRepetition