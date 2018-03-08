import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../styles/Colors';

class PersonalScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: '个人中心',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Icon name="person" color={tintColor} />;
      } else {
        return <Icon name="person" color={Colors.text} />;
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>个人中心</Text>
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

export default PersonalScreen;
