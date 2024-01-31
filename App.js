import 'react-native-gesture-handler';
import { useState, useEffect, useCallback } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import Svg, {Rect} from 'react-native-svg';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';


import NewHabitForm from './src/components/newHabitForm.js';
import AllHabits from './src/components/allHabits.js';
import HabitItem from './src/components/habitItem.js';
import Navigation from './src/components/navigation.js';
import theme from './src/theme.style.js'
import initialHabits from './src/habits.js'


export default function App() {
  let [habits, setHabits] = useState(initialHabits)
  let [openAllHabits, setOpenAllHabits] = useState(false)
  let [fontsLoaded, setFontsLoaded] = useState()
  let [todaysHabits, setTodaysHabits] = useState(habits)
  let [doneHabits, setDoneHabits] = useState([])
  let [streaks, setStreaks] = useState(0)
  let [streakDays, setStreakDays] = useState([])
  let [progressWidth, setProgressWidth] = useState(0)
  let [currentScreen, setCurrentScreen] = useState("main")
  const todaysDate = {day: new Date().getDay(), date: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear() }
  const [appIsReady, setAppIsReady] = useState(false);
  

  let [categories, setCategories] = useState([
    {value: {
      name: "self development",
      color: "hsl(190, 100%, 62%)"
      },
      id: 0,
    },{value: {
      name: "nutrition",
      color: "hsl(136.8, 100%, 62%)"
    }, id: 1,
    },

    {value: {
      name: "fitness",
      color: "hsl(7, 100%, 62%)"
      },
      id: 2,
    },
  ])


  async function getHabits   () {
   try {
      const jsonValue = await AsyncStorage.getItem('habits')
      if(jsonValue !== null) {
        setHabits(habits = JSON.parse(jsonValue))
        getDailyHabits(habits)
        getDoneHabits()
      }

  } catch (e) {
  	 console.log(e)
  }

  }

  async function saveHabits  () {
    try {
      const jsonValue = JSON.stringify(habits)
      await AsyncStorage.setItem('habits', jsonValue)
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }

  async function getCategories  () {
    try {
       const jsonValue = await AsyncStorage.getItem('categories')
       if(jsonValue !== null) {
         setCategories(categories = JSON.parse(jsonValue))
       }
 
   } catch (e) {
      console.log(e)
   }
   }
 
   async function saveCategories () {
     try {
       const jsonValue = JSON.stringify(categories)
       await AsyncStorage.setItem('categories', jsonValue)
     } catch(e) {
       // error reading value
       console.log(e)
     }
   }

   async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  
  

  useEffect(() => {
        // removeItemValue()
        changeScreenOrientation()
        getHabits();
        getDoneHabits();
        getCategories();
        loadFonts();
        getStreaks();

  }, [])
  

  async function removeItemValue  () {
    try {
        await AsyncStorage.removeItem("habits");
        await AsyncStorage.removeItem("categories");
    }
    catch(exception) {
    }
  }


  async function loadFonts () {
    try {
      await Font.loadAsync({

        'Poppins-SemiBold': {
          uri: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
          display: Font.FontDisplay.FALLBACK,
        },
        'Poppins-Regular': {
          uri: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
          display: Font.FontDisplay.FALLBACK,
        }
      });
      setFontsLoaded(fontsLoaded = true)
    } catch (e) {
      console.log(e)
    }

  }

  const addNewCategory = (value) => {
      let newCategory = {
      value: value,
      id: Math.random()
    }
    setCategories(categories = [...categories, newCategory])
    saveCategories()
  }




  const addNewHabit = (value) => {
    let newHabit = {
      id: Math.random(),
      value: value
    }

    setHabits(habits = [...habits, newHabit])
    saveHabits(habits)
    getHabits()
  }

  const deleteHabit = (id) => {
    let newHabits = habits.filter(item => item.id !== id)
    setHabits(habits = newHabits)
    // saveHabits(habits)
    getDailyHabits(habits)

  }

  const deleteCategory = (id) => {
    let newCategories = categories.filter(item => item.id !== id)
    setCategories(categories = newCategories)
    saveCategories()
    getCategories();

  }


  function areEqual(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }
        return false;
      });
    }
  }


  function getDailyHabits (habits){
    let todaysHabitsArray = []
    for (let i = 0; i < habits.length; i++) {
      
      const days = habits[i].value.repetition.days
      const done = habits[i].value.done
      const lastDone = done[done.length -1]
      const daysValues = Object.values(days)
      const unit = habits[i].value.repetition.repeatEvery.unit
      const value = habits[i].value.repetition.repeatEvery.value

      let index
      if (todaysDate.day === 0) {
        index = 6
      } else {
        index = todaysDate.day - 1
      }
      //wurde es heute schon mal gemacht?
      if (areEqual(Object.values(done[done.length - 1]), Object.values(todaysDate)) !== true) {
        //repeatEvery = 0
      if (Object.keys(habits[i].value.repetition.repeatEvery).length === 0 && daysValues[index] === true) {
        todaysHabitsArray.push(habits[i]) 
      } else if (unit === undefined && daysValues[index] === true ) {
     
        todaysHabitsArray.push(habits[i])
      } else if (lastDone.day === undefined && daysValues[index] === true) {
        todaysHabitsArray.push(habits[i])
      } else if (unit === "weeks" || unit === "months") {
      
        let past = new Date();
        if (unit === "weeks") {
          past.setDate(past.getDate() - value * 7);

        } else if (unit === "months") {
          past.setMonth(past.getMonth()-value)
        }
        let pastDate = {day: past.getDay(), date: past.getDate(), month: past.getMonth() + 1, year: past.getFullYear()}

        if (areEqual(Object.values(lastDone), Object.values(pastDate))) {
          todaysHabitsArray.push(habits[i])
        }
      } 
      }
    }
    setTodaysHabits(todaysHabits = todaysHabitsArray)
  }

  function getDoneHabits() {
    let doneHabitsArray = []
    for (let i = 0; i < habits.length; i++) {
      const done = habits[i].value.done
      if (areEqual(Object.values(done[done.length - 1]), Object.values(todaysDate)) === true) {
        doneHabitsArray.push(todaysHabits[i])
      }

    }
    setDoneHabits(doneHabits = doneHabitsArray)
    setProgressWidth(progressWidth = theme.APP_WIDTH * (doneHabits.length/ (doneHabits.length + todaysHabits.length)))
  }

  const habitDone = (id) => {
    const habit = habits.find(item => item.id === id)
    const doneDate = {day: todaysDate.day, date: todaysDate.date, month: todaysDate.month, year: todaysDate.year}

    const indexOfItem = habits.indexOf(habit)

    habits[indexOfItem].value.done.push(doneDate)
    saveHabits()
    removeHabitFromToday(habit)
    handleStreaks()
  }

  function removeHabitFromToday(habit) {
    getDoneHabits()
    const newTodaysHabits = todaysHabits.filter(item => item.id !== habit.id)
    setTodaysHabits(todaysHabits = newTodaysHabits)
    setProgressWidth(progressWidth = theme.APP_WIDTH * (doneHabits.length/ (doneHabits.length + todaysHabits.length)))
  }
  

  function getStreaks ()  {
   
    for (let i = 0; i < streakDays.length; i++) {
      let yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - (i+1))
      let yesterdayDate = {
          day: yesterday.getDay(),
          date: yesterday.getDate(),
          month: yesterday.getMonth() + 1,
          year: yesterday.getFullYear()
        }
      
          
      let lastStreak = streakDays[streakDays.length - (i+1)]
      if(areEqual(Object.values(lastStreak), Object.values(yesterdayDate))) {
        setStreaks(streaks = streaks+1)
      }
    }
  }

  const handleStreaks = () => {
    if (todaysHabits.length === 0 && doneHabits.length > 0) {
      setStreakDays(streakDays = [...streakDays, todaysDate])
      setStreaks(streaks = streaks+1)
    }
  }

  return (
     <View style={styles.container}>
      {fontsLoaded === true ? 
        <View>
          {currentScreen === "main" ? 
          <ScrollView>
            <Animated.View style={styles.mainPage}>
              <Navigation streaks={streaks} setOpenAllHabits={setOpenAllHabits} openAllHabits={openAllHabits} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen}/>
              <View style={styles.headlineContainer}>
                <Text style={[styles.headline, {marginBottom: -6}]}>Hey.</Text>
                <Text style={styles.headline}>Let's win the day.</Text>
              </View>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>Your Progress: {doneHabits.length + "/" + (doneHabits.length + todaysHabits.length) + " habits"}</Text>
                <View style={styles.bar}>
                  <View style={[styles.progressBar, styles.staticBar]}></View>
                  <View style={[styles.progressBar, styles.dynamicBar, {width: progressWidth}]}></View>
                </View>
              </View>
              <View >
                <Text style={[styles.headline, {marginBottom: 15, marginTop: 50,}]}>Todays Habits</Text>
                <FlatList numColumns={2} contentContainerStyle={{height: "100%"}} style={styles.habitsContainer} columnWrapperStyle={{justifyContent:"space-between"}} keyExtractor={(item, index) => index.toString()} data={todaysHabits} key={todaysHabits.length} renderItem={({item}) => (
                  <HabitItem item={item} todo={true} deleteHabit={deleteHabit} habitDone={habitDone} todaysHabits={todaysHabits} index={todaysHabits.indexOf(item)}/>
                )}/>
              </View>

            </Animated.View>
            
            </ScrollView>
            : undefined}
          {currentScreen === "allHabits" ? 
          <AllHabits setCurrentScreen={setCurrentScreen} currentScreen={currentScreen} categories={categories} habits={habits} setOpenAllHabits={setOpenAllHabits} openAllHabits={openAllHabits} deleteHabit={deleteHabit}/>: undefined}
          
          {currentScreen=== "main" ?<TouchableWithoutFeedback onPress={() => setCurrentScreen(currentScreen = "newHabitForm")}>
                <View style={styles.createNewHabitBtn}>
                  <Svg height="60%" width="60%" viewBox="0 0 100 100" >
                    <Rect x="45" y="0" width="10" height=" 100" rx="4.7" fill="#000" transform="translate(0 100) rotate(-90)"/>
                    <Rect x="45" y="0" width="10" height=" 100" rx="4.7" fill="#000" transform="translate(100 100) rotate(180)"/>
                  </Svg>
                </View>
              </TouchableWithoutFeedback>: undefined}
              {currentScreen === "newHabitForm" ? <NewHabitForm deleteCategory={deleteCategory} setCurrentScreen={setCurrentScreen} currentScreen={currentScreen} addNewCategory={addNewCategory}  addNewHabit={addNewHabit} categories={categories} habits={habits} setHabits={setHabits}/>: undefined}
        </View> 
        : undefined}
        <StatusBar translucent backgroundColor="transparent" />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.BACKGROUND_COLOR,
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  mainPage: {
    minHeight: theme.APP_HEIGHT,
    width: theme.WINDOW_WIDTH
  },
  headline: {
    color: theme.PRIMARY_COLOR,
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: theme.APP_MARGIN,
  },
  progressContainer: {
    marginTop: 20,
    marginLeft: theme.APP_MARGIN,
  },  
  bar: {
    position: 'relative'
  },
  progressBar: {
    height: 9,
    width: theme.APP_WIDTH,
    backgroundColor: theme.OFF_BLACK,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    top: 0,
  },
  dynamicBar: {
    backgroundColor: theme.PRIMARY_COLOR,
    top: -9,
  },
  progressText: {
    color: theme.SECONDARY_COLOR,
    fontSize: theme.FONT_SIZE_MEDIUM,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular'
  },
  createNewHabitBtn: {
    width: 60,
    height: 60,
    backgroundColor: theme.PRIMARY_COLOR,
    borderTopEndRadius: theme.BORDER_RADIUS,
    borderTopStartRadius: theme.BORDER_RADIUS,
    borderBottomEndRadius: theme.BORDER_RADIUS,
    borderBottomStartRadius: theme.BORDER_RADIUS,
    position: "absolute",
    right: 5,
    bottom: 50,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 12,
    elevation: 2,
  }, 
  streaksCnt: {
    backgroundColor: theme.PRIMARY_COLOR,
    width: 60,
    height: 30,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streaks: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular'
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
    marginTop: theme.TOP_MARGIN,
  },
  menuIcon: {
    // display: 'flex',
    // alignItems: 'flex-start',
  },
  habitsContainer: {
    overflow: "visible",
    marginLeft: theme.APP_MARGIN
  }
});
