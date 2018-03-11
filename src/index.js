import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import {
  TabNavigator,
  TabBarBottom,
  StackNavigator,
  SwitchNavigator
} from 'react-navigation';
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
import Dialog from './components/Dialog';

import userStore from './store/UserStore';
import categoryStore from './store/CategoryStore';
import { getData } from './utils/storage';
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

// 避免应用重启时，个人中心的切换效果不好
getData('account').then(res => {
  userStore.setAccount(res);
});

getData('categories').then(res => {
  categoryStore.setCategories(res);
});

getData('followApps').then(res=>{
  userStore.setFollowApps(res);
})

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

const AuthStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Personal: {
      screen: PersonalScreen
    }
  },
  {
    initialRouteName: 'Personal'
  }
);

const UserStack = SwitchNavigator(
  {
    Account: {
      screen: AccountScrren
    },
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth'
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
    User: {
      screen: UserStack
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
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
        <View style={{ flex: 1 }}>
          <RootStack />
        </View>
        {/* <Modal visible={modelVisible} onRequestClose={() => {}}>
          <LaunchScreen />
        </Modal> */}
        <Dialog />
      </View>
    );
  }
}

export default App;
