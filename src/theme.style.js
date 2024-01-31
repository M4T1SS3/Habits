import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');


export default {
    FONT_SIZE_ULTRA_SMALL: 11,
    FONT_SIZE_SMALL: 13,
    FONT_SIZE_MEDIUM: 15,
    FONT_SIZE_LEDIUM: 19,
    FONT_SIZE_LARGE: 30,

    LABEL_MARGIN: 20,
    HEADLINE_MARGIN: 35,
    TOP_MARGIN: 50,
    NAV_HEIGHT: 40,

    PRIMARY_COLOR: '#ffffff',
    ANTI_COLOR: '#000',
    SECONDARY_COLOR: 'rgba(255, 255, 255, 0.6)',
    OFF_BLACK: "#2d2d2d",
    BACKGROUND_COLOR: "#121212",

    SECTION_MARGIN: 60,
    APP_WIDTH: 400,
    APP_WIDTH: width - 30,
    WINDOW_WIDTH: width,
    APP_HEIGHT: 830,
    APP_HEIGHT: height,
    APP_MARGIN: 15,
    
    BORDER_RADIUS: 15,
    BORDER_RADIUS_SMALL: 10,
    ITEM_WIDTH: 190,
    ITEM_WIDTH: ((width - 15)/ 2) - 15,
    ITEM_GAP: 0,
    ITEM_HEIGHT: 120,
};