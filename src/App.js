import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Colors from './styles/Colors';
import Metrics from './styles/Metrics';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

// 主页
import HomeScreen from './views/Home';
import SearchScreen from './views/SearchScreen';
import PersonalScreen from './views/PersonalScreen';
// 首屏
import LaunchScreen from './views/LaunchScreen';
import SearchDetailScreen from './views/SearchDetailScreen';
import CategoryAppScreen from './views/CategoryAppScreen';
import ArticleListScreen from './views/ArticleListScreen';
import LoginScreen from './views/LoginScreen';
import AccountScrren from './views/AccountScrren';

console.disableYellowBox = true;

// 本地存储
global.storage =
  global.storage ||
  new Storage({
    size: 2000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
  });

const SearchStack = StackNavigator(
  {
    Search: {
      screen: SearchScreen
    },
    SearchDetail: {
      screen: SearchDetailScreen
    },
    CategoryApp: {
      screen: CategoryAppScreen
    },
    ArticleList: {
      screen: ArticleListScreen
    }
  },
  {
    initialRouteName: 'Search'
  }
);

const UserStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Account: {
      screen: AccountScrren
    }
  },
  {
    initialRouteName: 'Account'
  }
);

const RootStack = TabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Search: {
      screen: SearchStack
    },
    Personal: {
      screen: UserStack
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: Colors.active,
      inactiveTintColor: Colors.text,
      labelStyle: {
        fontSize: 13
      },
      style: {
        height: Metrics.navBarHeight
      }
    }
  }
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelVisible: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        modelVisible: false
      });
    }, 500);
  }

  render() {
    const { modelVisible } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <RootStack />
        {/* <Modal visible={modelVisible} onRequestClose={() => {}}>
          <LaunchScreen />
        </Modal> */}
      </View>
    );
  }
}

export default App;
