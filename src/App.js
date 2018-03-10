import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Colors from './styles/Colors';
import Metrics from './styles/Metrics';

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



console.disableYellowBox = true;

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
    }
  },
  {
    initialRouteName: 'Login'
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
        <RootStack/>
        {/* <Modal visible={modelVisible} onRequestClose={() => {}}>
          <LaunchScreen />
        </Modal> */}
      </View>
    );
  }
}

export default App;
