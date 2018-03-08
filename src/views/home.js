import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../styles/Colors';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: '首页',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Icon name="home" color={tintColor} />;
      } else {
        return <Icon name="home" color={Colors.text} />;
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>React Native Test</Text>
          <Button
            onPress={() => this.setState({ modelVisible: true })}
            title="点击"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
