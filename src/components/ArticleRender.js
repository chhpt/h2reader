import React, { Component } from 'react';
import {
  ScrollView,
  FlatList,
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { List, Text, ListItem, Card } from 'react-native-elements';
import HTML from 'react-native-render-html';

import Colors from '../styles/Colors';
import { formatTime } from '../utils';

const { width } = Dimensions.get('window');

const windowWidth = width;
const baseMrgin = 30;
const ImageWidth = Math.floor(windowWidth) - 60;

const renderers = {
  img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
    const uri = htmlAttribs.src;
    if (!uri) return null;
    let fitHeight;
    if (htmlAttribs.width && htmlAttribs.height) {
      fitHeight =
        ImageWidth / parseInt(htmlAttribs.width) * parseInt(htmlAttribs.height);
    }
    return (
      <Image
        {...passProps}
        resizeMode="cover"
        style={{
          width: ImageWidth,
          height: Math.floor(fitHeight) || 240
        }}
        source={{
          uri
        }}
      />
    );
  }
};

class ArticleRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { article } = this.props;
    return (
      <ScrollView contentContainerStyle={Styles.ScrollView}>
        <View>
          <Text style={Styles.titleStyle}>{article.title}</Text>
          <Text style={Styles.timeStyle}>
            {article.title && formatTime(article.time)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <HTML
            html={article.content}
            imagesMaxWidth={ImageWidth}
            imagesInitialDimensions={{ width: ImageWidth, height: 300 }}
            tagsStyles={htmlContent}
            renderers={renderers}
            ignoreNodesFunction={(node, parentTagName, parentIsText) => {
              if (!node.data) return false;
              if (node.data.indexOf('\n') > -1) {
                return true;
              }
            }}
            listsPrefixesRenderers={{
              ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                return (
                  <Text
                    style={{ marginTop: 10, marginRight: 10, fontSize: 16 }}
                  >
                  ~
                  </Text>
                );
              }
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  ScrollView: {
    width: windowWidth,
    padding: 30,
    backgroundColor: '#fff'
  },
  titleStyle: {
    color: Colors.title,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 36
  },
  timeStyle: {
    marginTop: 20,
    fontSize: 18
  }
});

const htmlContent = {
  p: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 28
  },
  span: {
    fontSize: 16,
    lineHeight: 28
  },
  a: {
    fontSize: 16,
    color: Colors.link
  },
  li: {
    fontSize: 16,
    lineHeight: 28
  }
};

export default ArticleRender;
