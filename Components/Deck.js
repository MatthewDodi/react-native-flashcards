import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { withNavigation, SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { Title, Subtitle, ButtonContainer, PrimaryButton, SecondaryButton } from '../utils/styles';

const styles = StyleSheet.create({
  gradient : {
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  height: 450,
  borderRadius: 5,
  shadowColor: '#000',
  shadowRadius: 6,
  shadowOpacity: .25,
  marginTop: 10,
  marginBottom: 10,
  shadowOffset: {height: 10}, 
  width: .95 * Dimensions.get('window').width
}});

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    }
  }

  render() {
  SafeAreaView.setStatusBarHeight(0);
  const { navigation, cards } = this.props;
  const { title } = navigation.state.params;
  return (
    <View style={{alignItems: 'center', flex: 1, backgroundColor: '#2D3652'}}>
      <LinearGradient colors={['#4e54c8', '#8f94fb']} style={styles.gradient}>
        <Title>{ title }</Title>
        <Subtitle>{ cards } { cards > 1 ? 'cards' : 'card' }</Subtitle>
      </LinearGradient>
      <ButtonContainer>
        <PrimaryButton
          color={'#8f94fb'}
          disabled={cards === 0}
          onPress={() => navigation.navigate('Quiz', { deck: title  })}
          style={{width: 175, shadowRadius: 5 ,shadowOffset: {height: 3}}}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 25}}>Start Quiz</Text>
        </PrimaryButton>
        <SecondaryButton 
          onPress={() => navigation.navigate('Question', { title })}>
            <Text style={{textAlign: 'center', color: '#8f94fb', fontSize: 20}}>Add Card</Text>
        </SecondaryButton>
      </ButtonContainer>
    </View>
    )
  }
};

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params;
  const cards = state[title].questions.length;

  return {
    cards
  }
}

export default withNavigation(connect(mapStateToProps)(Deck));