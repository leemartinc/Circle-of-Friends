import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import posed from "react-native-pose";

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 5;
const SpotLight = posed.View({
    route0: { x: 0 },
    route1: { x:tabWidth},
    route2: { x:tabWidth * 2},
    route3: { x: tabWidth * 3 },
    route4: { x: tabWidth * 4 },
    route5: { x: tabWidth * 5}
});


const S = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 80,
        elevation: 2,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingBottom: 25,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    spotLight: {
        width: tabWidth,
        height: "80%",
        backgroundColor: "rgba(79,65,100,0.7)",
        borderRadius: 8,
        marginBottom: 20,
    }
});

const TabBar = props => {
    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation,
    } = props;

    const { routes, index: activeRouteIndex } = navigation.state;

    return (

        <View style={S.container}>
             <LinearGradient
                colors={['#3B7883', '#2C4A6A']}
                start={{x: .0, y: 0}} end={{x: 0.3, y: 2.8}}
                locations={[0,0.9]}
                style={S.container}>
                <View style={StyleSheet.absoluteFillObject}>
                    <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}/>
                </View>

                {routes.map((route, routeIndex) => {
                const isRouteActive = routeIndex === activeRouteIndex;
                const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
                const fontColor = isRouteActive ? activeTintColor : inactiveTintColor;

                return (

                    <TouchableOpacity
                        key={routeIndex}
                        style={S.tabButton}
                        onPress={() => {
                            onTabPress({ route });
                        }}
                        onLongPress={() => {
                            onTabLongPress({ route });
                        }}
                        accessibilityLabel={getAccessibilityLabel({ route })}
                    >

                        {renderIcon({ route, focused: isRouteActive, tintColor })}

                        <Text style={{color:fontColor}}>{getLabelText({ route })}</Text>

                    </TouchableOpacity>

                );
            })}
            </LinearGradient>
        </View>

    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default TabBar;