import React, {Component} from 'react';
import {StyleSheet, Dimensions, SectionList, View, Text} from 'react-native';

const renderItems = ({item}) => {
  return (
    <View style={styles.item}>
      <View style={styles.item_title}>
        <Text style={styles.item_title_text}>{item.title}</Text>
      </View>
      <View style={styles.item_info}>
        <Text style={styles.item_info_rating}>{item.rating}</Text>
        <Text style={styles.item_info_genres}>{item.genres.join(', ')}</Text>
      </View>
    </View>
  );
};

const renderSectionHeaders = ({section}) => {
  return <Text style={styles.sectionHeader}>{section.title}</Text>;
};

export default class Movie extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      load: false,
    };
  }
  componentDidMount() {
    const Url = 'https://yts.mx/api/v2/list_movies.json?limit=50';
    this.fetchData(Url);
  }
  async fetchData(Url) {
    try {
      let res = await fetch(Url);
      res = await res.json();
      const sectionList = this.filterMovieData(res.data.movies);
      if (res.status === 'ok') {
        this.setState({load: true, data: sectionList});
      }
    } catch (error) {
      console.log(error);
    }
  }
  filterMovieData(data) {
    let result = [];
    data.forEach(d => {
      const find = result.find(l => l.title === d.title[0]);
      !find ? result.push({title: d.title[0], data: [d]}) : find.data.push(d);
    });
    return result.sort((a, b) => (a.title < b.title ? -1 : 1));
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.load ? (
          <SectionList
            sections={this.state.data}
            renderItem={renderItems}
            renderSectionHeader={renderSectionHeaders}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>
    );
  }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 28,
    fontWeight: '200',
  },
  sectionHeader: {
    width: '100%',
    height: 25,
    lineHeight: 25,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    width: '100%',
    height: 70,
    // paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#9B9B9B',
    borderBottomWidth: 1,
  },
  item_title: {
    marginVertical: 5,
  },
  item_title_text: {
    fontSize: 16,
    fontWeight: '500',
  },
  item_info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  item_info_rating: {
    fontSize: 12,
    marginRight: 5,
    fontWeight: '900',
    backgroundColor: '#C73549',
    width: 25,
    height: 25,
    textAlign: 'center',
    lineHeight: 25,
    color: 'white',
  },
  item_info_genres: {
    fontSize: 12,
    fontWeight: '300',
    textAlignVertical: 'center',
  },
});
