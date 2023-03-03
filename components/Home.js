import React, { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import styles from '../style/style';
import { NBR_OF_DICES, NBR_OF_THROWS,MIN_SPOT,MAX_SPOT } from '../constants/Game';

export default Home = ({navigation}) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }


  return (
    <View style={styles.home}>
      <Text style={styles.titles}>Mini Yahtzee</Text>
      { !hasPlayerName 
      ?
      <>
      <Text style={styles.name}>Enter your name</Text>
      <TextInput style={styles.textinput} onChangeText={setPlayerName} autoFocus={true} />
      <Pressable style={styles.button} onPress={() => handlePlayerName(playerName)}>
        <Text style={styles.buttonText}>OK</Text>
      </Pressable>
      </>
      :
      <>
      <Text style={styles.rule}>THE GAME: Upper section of the classic Yahtzee
dice game. You have {NBR_OF_DICES} dices and
for the every dice you have {NBR_OF_THROWS} 
 throws. After each throw you can keep dices in
order to get same dice spot counts as many as
possible. In the end of the turn you must select
your points from {MIN_SPOT} to {MAX_SPOT}.
Game ends when all points have been selected.
The order for selecting those is free.
POINTS: After each turn game calculates the sum
for the dices you selected. Only the dices having
the same spot count are calculated. Inside the
game you can not select same points from
{MIN_SPOT} to {MAX_SPOT} again.
GOAL: To get points as much as possible.
63 points is the limit of
getting bonus which gives you 50
points more.</Text>
      <Text style={styles.name}>Good luck, {playerName}!</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Gameboard', 
    {player: playerName})}>
        <Text style={styles.buttonText}>PLAY</Text>
      </Pressable>
      </>
    }
    </View>
  )
}
