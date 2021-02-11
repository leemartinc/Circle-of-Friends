import React from 'react';
import { Platform, StyleSheet,View,Text, StatusBar} from 'react-native';
import { createSwitchNavigator, createAppContainer,Header } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { LinearGradient } from "expo-linear-gradient";
import {fromLeft, fromRight} from 'react-navigation-transitions';
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';


//import HomeScreen from '../screens/EX_HomeScreen';
//import LinksScreen from '../screens/EX_LinksScreen';
//import SettingsScreen from '../screens/EX_SettingsScreen';

import AuthLoadingScreen from '../screens/authLoader';

import login from '../screens/login'
import phoneVerify from '../screens/phoneVerify';
import TabBar from '../screens/tabBar'

import signUp from '../screens/signup';
import Schedule from '../screens/schedule';
import Events from '../screens/events';
import Friends from '../screens/friends';
import Settings from '../screens/settings';
import Circles from '../screens/circles';
import Account from '../screens/settings/account';

//var header_height=  StatusBar.currentHeight + Header.HEIGHT
//var header_height = {result: calc_header_height}
/*
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import AntDesign from '../node_modules/react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from '../node_modules/react-native-vector-icons/MaterialCommunityIcons';
*/



const settingsStack = createStackNavigator({
  Settings: {
      screen: Settings,

      navigationOptions:() => ({
          headerShown: false,
      })
  },
  Account:{
      screen: Account,


      navigationOptions:(navigation) => ({
        headerShown: false,
      }),

  }
},
  {
      headerMode: 'float',
      transitionConfig: () => fromRight(),
  },
  {
      headerLayoutPreset: 'center'
  }
);


const AuthStack = createStackNavigator({ 
    signIn: {
        screen: login,
  
        navigationOptions:() => ({
            headerShown: false,
        })
    },
    signUp: {
        screen: signUp,
  
        navigationOptions:() => ({
            headerShown: false,
        })
    },
    phoneVerify:{
        screen: phoneVerify,
        navigationOptions:() => ({
            headerShown: false,
        })
    }
    },
    {
        headerMode: 'float',
        transitionConfig: () => fromRight(),
    },
    {
        headerLayoutPreset: 'center'
});

const DashTabNav = createBottomTabNavigator({
      Schedule: {
          screen: Schedule,
          navigationOptions: () => ({
              tabBarIcon: ({tintColor}) => (
                  <TabBarIcon
                      name="ios-calendar"
                      color={tintColor}
                      size={24}
                  />
              )
          })
      },
      Events: {
          screen: Events,
          navigationOptions: () => ({
              tabBarIcon: ({tintColor}) => (
                  <MaterialCommunityIcons
                      name="calendar-multiple"
                      color={tintColor}
                      size={24}
                  />
              )
          })
      },
      Circles: {
          screen: Circles,
          navigationOptions: () => ({
              tabBarIcon: ({tintColor}) => (
                  <TabBarIcon
                      name="ios-people"
                      color={tintColor}
                      size={24}
                  />
              )
          })
      },
      Friends: {
          screen: Friends,
          navigationOptions: () => ({
              tabBarIcon: ({tintColor}) => (
                  <AntDesign
                      name="contacts"
                      color={tintColor}
                      size={24}
                  />
              )
          })
      },
      settingsStack: {
          screen: settingsStack,
          navigationOptions: () => ({
              title: 'Settings',
              tabBarIcon: ({tintColor}) => (
                  <TabBarIcon
                      name="ios-cog"
                      color={tintColor}
                      size={24}
                  />
              )
          })
      }
  },
  {
      headerMode: 'float',
      initialRouteName: 'Circles',
      tabBarComponent: TabBar,
      tabBarOptions: {
          activeTintColor: 'rgba(255,255,255,1)', // active icon color
          inactiveTintColor: 'rgba(255,255,255,.7)',  // inactive icon color
          style: {
              backgroundColor: '#071E36', // TabBar background
              borderTopLeftRadius: 45,
              borderTopRightRadius: 45,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 55,
              color: 'white'
          }
      },
      navigationOptions:({navigation}) => {
          const{routeName} = navigation.state.routes[navigation.state.index];
          if(routeName==='Circles'){
              return {
                  headerTitle: 'Circles of Friends',
                  //header: (props: any) => <GradientHeader {...props} />,
                  headerTintColor: '#fff',
                  headerTransparent: true,
                  headerStyle:{
                      backgroundColor: '#071E36', // Header background
                      borderBottomLeftRadius: 45,
                     borderBottomRightRadius: 45,
                      //borderBottomColor: 'red',
                      borderBottomWidth: 0,
                  },headerBackground: (
                    <View style={styles.linearGradient}>
                    <LinearGradient
                        colors={['#2C4A6A', '#4F4164']}
                        start={{x: .0, y: 0}} end={{x: 0.3, y: 2.8}}
                        locations={[0,0.9]}
                        style={[StyleSheet.absoluteFill, styles.linearGradient]}
                    />
                    </View>
                ),
                  headerTitleStyle: {
                      textAlign: 'center',
                      flexGrow:1,
                      alignSelf:'center',
                      //fontFamily: 'Euphemia UCAS',
                  },
              }
          }else if(routeName==='Friends'){
              return {
                  headerTitle: 'All Friends',
                  headerTintColor: '#fff',
                  headerTransparent: true,
                  headerStyle:{
                      backgroundColor: '#071E36', // Header background
                      borderBottomLeftRadius: 45,
                      borderBottomRightRadius: 45,
                      //borderBottomColor: 'red',
                      borderBottomWidth: 0,
                  },
                  headerBackground: (
                    <View style={styles.linearGradient}>
                    <LinearGradient
                        colors={['#2C4A6A', '#4F4164']}
                        start={{x: .0, y: 0}} end={{x: 0.3, y: 2.8}}
                        locations={[0,0.9]}
                        style={[StyleSheet.absoluteFill, styles.linearGradient]}
                    />
                    </View>
                ),
                  headerTitleStyle: {
                      textAlign: 'center',
                      flexGrow:1,
                      alignSelf:'center',
                      //fontFamily: 'Euphemia UCAS',
                  },
              }
          }else if(routeName==='Events'){
              return {
                  headerTitle: 'Planned Events',
                  headerTintColor: '#fff',
                  headerTransparent: true,
                  headerStyle:{
                      backgroundColor: '#071E36', // Header background
                      borderBottomLeftRadius: 45,
                      borderBottomRightRadius: 45,
                      //borderBottomColor: 'red',
                      borderBottomWidth: 0,
                  },headerBackground: (
                    <View style={styles.linearGradient}>
                    <LinearGradient
                        colors={['#2C4A6A', '#4F4164']}
                        start={{x: .0, y: 0}} end={{x: 0.3, y: 2.8}}
                        locations={[0,0.9]}
                        style={[StyleSheet.absoluteFill, styles.linearGradient]}
                    />
                    </View>
                ),
                  headerTitleStyle: {
                      textAlign: 'center',
                      flexGrow:1,
                      alignSelf:'center',
                      //fontFamily: 'Euphemia UCAS',
                  },
              }
          }else if(routeName==='Schedule'){
              return {
                  headerTitle: 'Your Schedule',
                  headerTintColor: '#fff',
                  headerTransparent: true,
                  headerStyle:{
                      backgroundColor: '#071E36', // Header background
                      borderBottomLeftRadius: 45,
                      borderBottomRightRadius: 45,
                      //borderBottomColor: 'red',
                      borderBottomWidth: 0,
                  },headerBackground: (
                    <View style={styles.linearGradient}>
                    <LinearGradient
                        colors={['#2C4A6A', '#4F4164']}
                        start={{x: .0, y: 0}} end={{x: 0.3, y: 2.8}}
                        locations={[0,0.9]}
                        style={[StyleSheet.absoluteFill, styles.linearGradient]}
                    />
                    </View>
                ),
                  headerTitleStyle: {
                      textAlign: 'center',
                      flexGrow:1,
                      alignSelf:'center',
                      //fontFamily: 'Euphemia UCAS',
                  },
              }
          }else if(routeName === 'settingsStack')
              {
                  return {
                      headerTitle: 'Settings',
                      headerTintColor: '#fff',
                      headerTransparent: true,
                      headerStyle:{
                          backgroundColor: '#071E36', // Header background
                          borderBottomLeftRadius: 45,
                          borderBottomRightRadius: 45,
                          //borderBottomColor: 'red',
                          borderBottomWidth: 0,
                      },headerBackground: (
                        <View style={styles.linearGradient}>
                        <LinearGradient
                            colors={['#2C4A6A', '#4F4164']}
                            start={{x: .0, y: 0}} end={{x: 0.3, y: 2.8}}
                            locations={[0,0.9]}
                            style={[StyleSheet.absoluteFill, styles.linearGradient]}
                        />
                        </View>
                    ),
                      headerTitleStyle: {
                          textAlign: 'center',
                          flexGrow:1,
                          alignSelf:'center',
                          //fontFamily: 'Euphemia UCAS',
                      },

                  }
          }

      }
  }
);
const DashStack = createStackNavigator({
  DashTabNav: DashTabNav,
},{
  cardStyle: {
      backgroundColor: 'red'
  }
});

export default createAppContainer(createSwitchNavigator(
  {
      AuthLoading: AuthLoadingScreen,
      App: DashStack,
      Auth: AuthStack,
  },
  {
      initialRouteName: 'AuthLoading',
  }
));

export const GradientHeader = props => (
  <View style={{ backgroundColor: '#eee' }}>
      <LinearGradient
          colors={['#00a8c3', '#00373f']}
          style={[StyleSheet.absoluteFill, styles.linearGradient]}
      />
      <Header {...props} style={{ backgroundColor: 'transparent' }}/>
  </View>
);


const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: "row",
    elevation: 2,
    height: Platform.OS === 'ios' ? 90 : 81,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    paddingBottom: 25,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
  },
  buttonText: {
      fontSize: 18,
     //fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
  },
  backArrow: {
      position: 'absolute',
      top: 10,
      left: 10,
  }
});


/*
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
*/