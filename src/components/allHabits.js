import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, ScrollView,  } from "react-native"
import theme from '../theme.style.js'
import HabitItem from "./habitItem.js"
import Animated, {SlideInDown, SlideOutDown, Layout } from "react-native-reanimated"
import Svg, {Rect} from "react-native-svg"

const AllHabits = (props) => {
    return (
        <Animated.View style={styles.page} entering={SlideInDown.duration(200).easing()} exiting={SlideOutDown.duration(100).easing()} layout={Layout}>
            <ScrollView>
                <View>
                    <View style={styles.navigation}>
                        <TouchableWithoutFeedback onPress={() => props.setCurrentScreen("main")}>
                            <Svg width="30" height="30" viewBox='0 0 500 500' style={{transform: [{ rotate: '45deg' }]}}>
                                <Rect fill="#ffffff" x="0" y="225" width="500" height="50" rx="30" transform="rotate(0)"/>
                                <Rect fill="#ffffff" x="225" y="0" width="50" height="500" rx="30" transform="rotate(0)"/>
                            </Svg>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={styles.headline}>All your habits.</Text>
                    <FlatList data={props.categories}
                    key={props.categories.length} 
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (<CategoryHabits  index={props.categories.indexOf(item)} length={Object.keys(props.categories).length} categoryItem={item} habits={props.habits} deleteHabit={props.deleteHabit}></CategoryHabits>)}>
                    </FlatList>
              </View>
            </ScrollView>
        </Animated.View>
    )
}
const CategoryHabits = (props) => {
    let allHabitsFromCategory = props.habits.filter(item => item.value.category.name === props.categoryItem.value.name)
    // entering={SlideInLeft.delay((200 * props.index)).duration(600).easing()}
    return (
        <Animated.View style={styles.categoryRow} layout={Layout}>
            <Text style={styles.categoryName}>{props.categoryItem.value.name}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Animated.FlatList 
                data={allHabitsFromCategory} 
                key={allHabitsFromCategory.length} 
                numColumns={allHabitsFromCategory.length} 
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (<HabitItem item={item} deleteHabit={props.deleteHabit} todo={false} index={allHabitsFromCategory.indexOf(item)}/>)}></Animated.FlatList>
            </ScrollView>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    page: {
        width: theme.WINDOW_WIDTH,
        backgroundColor: theme.BACKGROUND_COLOR,
    },
    headline: {
        color: theme.PRIMARY_COLOR,
        fontSize: theme.FONT_SIZE_LARGE,
        marginBottom: theme.HEADLINE_MARGIN,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: theme.APP_MARGIN,
        marginTop: theme.TOP_MARGIN,
    },
    categoryRow: {
        marginBottom: theme.LABEL_MARGIN,
    },
    categoryName: {
        color: theme.PRIMARY_COLOR,
        fontSize: theme.FONT_SIZE_LEDIUM,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 8,
        marginLeft: theme.APP_MARGIN,
    },
    navigation: {
        marginTop: theme.TOP_MARGIN,
        marginLeft: theme.APP_MARGIN,
    }
})
export default AllHabits