import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, FlatList } from 'react-native';


function renderPost (item) {
  return (
    <View
      key={item.id}
      style={styles.post}
    >
      <View style={styles.postNumber}>
        <Text>{item.id}</Text>
      </View>
      <View style={styles.postContent}>
        <Text>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>
      </View>
    </View>
  );
};

class App extends Component {
  state = {
    isLoading: true,
    error: false,
    post: [],
  };

  UNSAFE_componentWillMount = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const post = await response.json();
      this.setState({
        isLoading: false,
        post,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true,
      });
    }
  };

  render() {
    const { isLoading, error, post } = this.state;
    if (isLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    if (error) {
      return (
        <View style={styles.center}>
          <Text>Failed to load post!</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={post}
          renderItem={({ item }) => renderPost(item)}
          keyExtractor={(item, index) => item + index}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    flexDirection: 'row',
  },
  postNumber: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 25,
    paddingRight: 15,
  },
  postBody: {
    marginTop: 10,
    fontSize: 12,
    color: 'lightgray',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: 'skyblue',
  },
});

export default App;
