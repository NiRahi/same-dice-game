import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import { SCOREBOARD_KEY } from '../constants/Game';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header  from './Header';
import Footer from './Footer';
import styles from '../style/style';
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { Pressable } from 'react-native';

export default Scoreboard = ( {navigation} ) => {


  const [scores, setScores] = useState([]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
        // Sort results here for the renderring
      }
    }
    catch (error) {
      console.log('Read error: ' + error.message);
    }
  }
  return (
    <ScrollView>
      <DataTable style={styles.scoreboard}>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Time</DataTable.Title>
          <DataTable.Title>Points</DataTable.Title>
          <DataTable.Title>Bonus</DataTable.Title>
          <DataTable.Title>Total</DataTable.Title>
        </DataTable.Header>
        {scores.map((player, i) => (
        <DataTable.Row key={i}>
          <DataTable.Cell>{i + 1}. {player.name}</DataTable.Cell>
          <DataTable.Cell>{player.date}</DataTable.Cell>
          <DataTable.Cell>{player.time}</DataTable.Cell>
          <DataTable.Cell>{player.points}</DataTable.Cell>
          <DataTable.Cell>{player.bonusPoints}</DataTable.Cell>
          <DataTable.Cell>{player.totalPoints}</DataTable.Cell>
        </DataTable.Row>
        ))}
      </DataTable>
      <Footer />
    </ScrollView>
  )
}