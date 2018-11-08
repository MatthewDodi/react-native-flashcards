import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, FlatList, ImageBackground } from 'react-native';
import { getDecks } from '../utils/helpers';
import { setDecks } from '../actions'
import DeckItem from '../Components/DeckItem';
import styled from 'styled-components';

const gradientsArray = [['#6190E8', '#A7BFE8'], ['#CAC531', '#F3F9A7'], ['#11998e', '#38ef7d']]

const BackgroundImage = styled.ImageBackground`
  position: absolute;
  height: 100%;
  width: 100%;
`


class Home extends Component {
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    getDecks()
      .then(res => {
        this.props.dispatch(setDecks(res));
      });
  };

  render() {
    const { decks } = this.props;

    return (
      <BackgroundImage
      source={require('../assets/memphis-colorful.png')}
      resizeMode='repeat'>
        <View style={{alignItems: 'center', flex: 1}}>
          <FlatList
            contentContainerStyle={{alignItems: 'center', width: Dimensions.get('window').width}}
            data={Object.keys(decks)}
            renderItem={({ item, index }) => 
              <DeckItem
                gradient={gradientsArray[index]}
                title={item}
                cards={decks[item].questions.length} />}
            keyExtractor={(item, index) => item}
          />
      </View>
      </BackgroundImage>
    );
  }
};

const mapStateToProps = state => ({
  decks : state
})

export default connect(mapStateToProps)(Home);