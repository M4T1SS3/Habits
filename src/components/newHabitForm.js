import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from 'react-native';
import NewHabitName from './newHabitName.js'
import NewHabitRepetition from './newHabitRepetition.js';
import NewHabitCategory from './newHabitCategory.js';
import NewCategoryForm from './newCategoryForm'
import theme from '../theme.style.js'
import Animated, { SlideInDown, SlideOutDown} from 'react-native-reanimated';
import Svg, {Rect} from 'react-native-svg';

const NewHabitForm = (props) => {
    const newHabitModel = {
        name: '',
        repetition: {
            repeatEvery: {
                value: undefined,
                unit: undefined,
            }, 
            days: {
                Mondays: false,
                Tuesdays: false,
                Wednesdays: false,
                Thursdays: false,
                Fridays: false,
                Saturdays: false,
                Sundays: false
            }
        },
        category: {
            name: ""
        },
        done: [{day: undefined, month: undefined, year: undefined}]
    }

    let [newHabit, setNewHabit] = useState(newHabitModel)
    let [openCreateCategory, setOpenCreateCategory] = useState(false)

    const newHabitNameChange = (value) => {
        setNewHabit({
            ...newHabit, ["name"]: value
        })
    }

    const newHabitRepetition = value => {
        setNewHabit({
            ...newHabit, ["repetition"]: value
        })
    }

    const selectCategory = (item) => {

        setNewHabit({
            ...newHabit, ["category"]: item
        })
    }

    const handleSaveBtn = (value) => {
        if(value.name === undefined || value.name === '') {
        } else if (Object.values(value.repetition.days).every(item => item === false) === true) {
        } else if (value.category.name === "") {
        } else {
            props.addNewHabit(value)
            resetForm() 
        }
    }
    const resetForm = () => {
        setNewHabit(newHabit = newHabitModel)
        props.setCurrentScreen("main")
    }
    

    
    return (
        <Animated.View style={styles.pageContainer} entering={SlideInDown.duration(200).easing()} exiting={SlideOutDown.duration(100).easing()}>
            <ScrollView alwaysBounceVertical={false}>
            {openCreateCategory === false ?
                <View style={styles.main}>
                    <View style={styles.heading}>
                        <TouchableWithoutFeedback onPress={() => props.setCurrentScreen("main")}>
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
                        <TouchableOpacity style={styles.saveBtn} onPress={() => handleSaveBtn(newHabit)}>
                            <Text style={styles.saveBtnText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                        <View style={styles.formContainer}>
                            <Text style={styles.headline}>Create a new Habit:</Text>        
                            <NewHabitName style={styles.namingSection} newHabitNameChange={newHabitNameChange} newHabit={newHabit}></NewHabitName>
                            <NewHabitRepetition newHabit={newHabit} newHabitRepetition={newHabitRepetition}></NewHabitRepetition>
                            <NewHabitCategory deleteCategory={props.deleteCategory} setOpenCreateCategory={setOpenCreateCategory} openCreateCategory={openCreateCategory} addNewCategory={props.addNewCategory} categories={props.categories} newHabit={newHabit} selectCategory={selectCategory}/>
                        </View>
                </View>
                :
                <NewCategoryForm addNewCategory={props.addNewCategory} setOpenCreateCategory={setOpenCreateCategory}></NewCategoryForm>
            }
            </ScrollView>

        </Animated.View>
    )
}

    const styles = StyleSheet.create({
        pageContainer: {
            width: theme.WINDOW_WIDTH,
            height: "auto",
            backgroundColor: theme.BACKGROUND_COLOR,
        },
        main: {
            marginTop: theme.TOP_MARGIN,
        },
        headline: {
            color: theme.PRIMARY_COLOR,
            fontSize: theme.FONT_SIZE_LARGE,
            marginBottom: 15,
            fontFamily: 'Poppins-SemiBold',
            marginLeft: theme.APP_MARGIN,
            marginRight: theme.APP_MARGIN,

        },
        saveBtn: {
            backgroundColor: theme.PRIMARY_COLOR,
            width: 80,
            height: 30,
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        saveBtnText: {
           alignSelf: 'center',
           fontFamily: 'Poppins-Regular'
        },
        namingSection: {
            marginBottom: theme.SECTION_MARGIN,
        },
        formContainer:{
            marginTop: theme.TOP_MARGIN,
        },
        heading: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: theme.APP_MARGIN,
            marginRight: theme.APP_MARGIN,
        }
    })
export default NewHabitForm