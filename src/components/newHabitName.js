import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import theme from '../theme.style.js'


const NewHabitName = (props) => {
    return (
        <View style={styles.namingSection}>
            <TextInput style={styles.nameInput} placeholderTextColor={theme.SECONDARY_COLOR} placeholder='Add a habit name' value={props.newHabit.name} onChange={(event) => props.newHabitNameChange( event.nativeEvent.text)}/>
            <View style={styles.bottomBorder}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    namingSection: {
        marginBottom: theme.SECTION_MARGIN,
        marginLeft: theme.APP_MARGIN,
    },
    nameInput: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.SECONDARY_COLOR,
        fontFamily: 'Poppins-Regular'
    },
    bottomBorder: {
        backgroundColor: theme.SECONDARY_COLOR,
        height: 2,
        width: theme.APP_WIDTH,
        borderRadius: 20,
    }
})
export default NewHabitName