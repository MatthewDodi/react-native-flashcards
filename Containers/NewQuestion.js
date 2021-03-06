import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { addCardToDeckAction } from '../actions';
import { addCardToDeck } from '../utils/helpers';


class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  inputHandler = (value, inputType) => {
    this.setState({ [inputType]: value });
  };

  submitHandler = () => {
    const { question, answer } = this.state;
    const { title } = this.props.navigation.state.params;
    const card = {
      question,
      answer
    };
    this.props.dispatch(addCardToDeckAction(title, card));
    addCardToDeck(title, card);
    this.props.navigation.goBack();
    this.setState(() => ({ question: '', answer: '' }));
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 25, marginBottom: 30}}>Add a new Card</Text>
        {!this.state.question && <Text style={{color: 'gray'}}>Required</Text>}
        <TextInput
          style={styles.input}
          value={this.state.question}
          onChangeText={(v) => this.inputHandler(v, 'question')}
          placeholder = "Question"
          placeholderTextColor = "#171F33"
          autoCapitalize = "none" />
        {!this.state.answer && <Text style={{color: 'gray'}}>Required</Text>}
        <TextInput
          style={styles.input}
          value={this.state.answer}
          onChangeText={(v) => this.inputHandler(v, 'answer')}
          placeholder = "Answer"
          placeholderTextColor = "#171F33"
          autoCapitalize = "none" />
        <TouchableOpacity disabled={!this.state.question && !this.state.answer} onPress={this.submitHandler} style={styles.btn}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  input: {
     textAlign: 'center',
     marginBottom: 25,
     padding: 10,
     width: .9 * Dimensions.get('window').width,
     borderColor: '#171F33',
     borderWidth: 2,
     borderRadius: 5,
     fontSize: 15
  },
  btn: {
    margin: 5,
    backgroundColor: '#171F33',
    width: 150,
    padding: 20,
    borderRadius: 5,
  }});

export default connect()(NewQuestion);