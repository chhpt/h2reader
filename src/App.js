import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Colors from './styles/Colors';
import Metrics from './styles/Metrics';

// 主页
import HomeScreen from './views/home';
import SearchScreen from './views/searchScreen';
import PersonalScreen from './views/personalScreen';
// 首屏
import LaunchScreen from './views/launchScreen';
import SearchDetailScreen from './views/searchDetailScreen';
import CategoryAppScreen from './views/categoryAppScreen';

import categoryStore from './store/CategoryStore';


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
    }
  },
  {
    initialRouteName: 'Search'
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
      screen: PersonalScreen
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
        <RootStack screenProps={{ categoryStore }} />
        {/* <Modal visible={modelVisible} onRequestClose={() => {}}>
          <LaunchScreen />
        </Modal> */}
      </View>
    );
  }
}

export default App;
