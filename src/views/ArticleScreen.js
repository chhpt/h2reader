import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  ProgressBarAndroid,
  Linking
} from 'react-native';
import { List, Text, ListItem, Card, Icon } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import ArticleRender from '../components/ArticleRender';
import Colors from '../styles/Colors';
import appStore from '../store/AppStore';
import userStore from '../store/UserStore';

@observer
class ArticleScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text>标题</Text>,
    header: null,
    tabBarVisible: false
  });

  collectArticle(article) {
    userStore.collectArticle(article).then(res => {
      if (res.status) {
        appStore.showDialog('已收藏文章');
      } else {
        appStore.showDialog(res.error);
      }
    });
  }

  cancelCollectArticle(article) {
    userStore.cancelCollectArticle(article).then(res => {
      if (res.status) {
        appStore.showDialog('已取消收藏文章');
      } else {
        appStore.showDialog(res.error);
      }
    });
  }

  openLink(url) {
    Linking.openURL(url);
  }

  render() {
    const { article, loading } = appStore;
    const { collectArticles } = userStore;
    const exit = collectArticles.slice(0).find(e => e.title === article.title);

    return (
      <View style={Styles.root}>
        <Card containerStyle={Styles.header} wrapperStyle={Styles.headerInner}>
          {exit ? (
            <Icon
              name="star"
              containerStyle={Styles.icon}
              type="entypo"
              onPress={() => this.cancelCollectArticle(article)}
            />
          ) : (
            <Icon
              name="star-outlined"
              containerStyle={Styles.icon}
              type="entypo"
              onPress={() => this.collectArticle(article)}
            />
          )}
          <Icon
            name="share"
            containerStyle={Styles.icon}
            type="material-community"
            onPress={() => this.openLink(article.url)}
          />
        </Card>
        {loading && (
          <Card containerStyle={Styles.loadWrapper}>
            <ProgressBarAndroid
              styleAttr="Inverse"
              color={Colors.loading}
              style={{
                width: 36,
                height: 36
              }}
            />
          </Card>
        )}
        <ArticleRender article={article} />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: 50,
    margin: 0,
    elevation: 4,
    padding: 10
  },
  headerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    marginLeft: 30,
    marginRight: 30
  },
  loadWrapper: {
    width: 50,
    height: 50,
    marginTop: 30,
    elevation: 4,
    padding: 7,
    borderRadius: 25
  }
});

export default ArticleScreen;
