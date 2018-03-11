import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Colors from '../styles/Colors';
import { observer, Provider } from 'mobx-react';

const generateRoute = text => (
  <View style={[styles.container, { backgroundColor: '#fff' }]}>
    <Text>{text}</Text>
  </View>
);

@observer
class TabLayou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: []
    };
  }

  componentWillMount() {
    // 在 render 前导入 routes 数据
    this.setState({
      routes: this.props.routes
    });
  }
  renderHeader = props => (
    <TabBar
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ color: Colors.text }}
      indicatorStyle={{ backgroundColor: Colors.link }}
      {...props}
    />
  );

  render() {
    const { renderScene, onIndexChange } = this.props;
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderHeader={this.renderHeader}
        renderScene={({ index, route }) => renderScene(index, route)}
        onIndexChange={index => {
          this.setState({ index });
          onIndexChange && onIndexChange(index);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TabLayou;
