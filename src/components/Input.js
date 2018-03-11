import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Colors from '../styles/Colors';

// TextInput 包装
const Input = ({
  placeholder,
  hasButton,
  iconName,
  onChangeText,
  buttonLoading,
  buttonOnPress,
  buttonText,
  secureTextEntry
}) => (
  <View style={Styles.InputWrapper}>
    <Icon
      name={iconName}
      iconStyle={{ marginRight: 10 }}
      size={20}
      type="font-awesome"
    />
    <TextInput
      underlineColorAndroid="transparent"
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      style={{ flex: 1, padding: 0 }}
      onChangeText={text => onChangeText(text)}
    />
    {hasButton && (
      <Button
        text={buttonText}
        loading={buttonLoading}
        loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
        textStyle={{ fontWeight: '400', fontSize: 15, color: Colors.link }}
        buttonStyle={Styles.InputButton}
        containerStyle={{ marginRight: 10 }}
        onPress={buttonOnPress}
      />
    )}
  </View>
);

const Styles = StyleSheet.create({
  InputWrapper: {
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: Colors.border
  },
  InputButton: {
    borderWidth: 0,
    backgroundColor: '#fff'
  }
});

export default Input;
