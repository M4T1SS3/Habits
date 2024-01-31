import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Svg, {Rect, Path} from 'react-native-svg';
import theme from '../theme.style.js'
import { LinearGradient } from 'expo-linear-gradient';


const Navigation = (props) => {

    return (
        <View style={styles.heading}>
            <TouchableWithoutFeedback onPress={() => props.setCurrentScreen("allHabits")}>
              <View style={styles.menuIcon}>
                  <Svg  height="30" width="30" viewBox='0 0 500 500'>
                    <Rect fill="#ffffff" x="290" y="0" width="210" height="210" rx="60"/>
                    <Rect fill="#ffffff" x="0" y="0" width="210" height="210" rx="60"/>
                    <Rect fill="#ffffff" x="290" y="290" width="210" height="210" rx="60"/>
                    <Rect fill="#ffffff" y="290" width="210" height="210" rx="60"/>
                  </Svg>
              </View>
            </TouchableWithoutFeedback>
            {props.openAllHabits === false ?
            <View style={styles.streaksCnt}>
              <Text style={styles.streaks}>
                {props.streaks+ "🔥"} 
              </Text>
              {/* <Svg height="15" width="15" viewBox='0 0 500 500'>
                </Svg> */}
              </View>: undefined}
          </View>
    )
}

const styles = StyleSheet.create({
    streaksCnt: {
      backgroundColor: theme.PRIMARY_COLOR,
      width: 60,
      height: 30,
      borderRadius: 20,
      display: 'flex',
      // flexDirection: 'row',
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
      marginRight: 15,
      marginLeft: 15,
      marginTop: theme.TOP_MARGIN,
      marginBottom: 60,
    },
  });

  export default Navigation