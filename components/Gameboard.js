import React, { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, SCOREBOARD_KEY } from '../constants/Game';
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from '@react-native-async-storage/async-storage';




let board = [];

export default Gameboard = ({ route }) => {

  const [playerName, setPlayerName] = useState('');
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState(''); 

  // this array has the information wheter dice is selected or not
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

  //This array has the information wheter the spot count has been selected or no
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  //This array has dice spots for a throw
  // has Total points different spot counts

  const [scores, setScores] = useState([]);

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
        key={"row" + i}
        onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={70}
          color={getDiceColor(i)}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }
  
  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={'points' + spot}>
        <Text key={'points' + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
      </Col>
    )
  }

  const buttonsRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    buttonsRow.push(
      <Col key={'buttonsRow' + diceButton}>
        <Pressable
          onPress={() => selectDicePoints(diceButton)}
          key={'buttonsRow' + diceButton}>
          <MaterialCommunityIcons
            name={'numeric-' + (diceButton + 1) + "-circle"}
            key={'buttonsRow' + diceButton}
            size={35}
            color={getDicePointsColor(diceButton)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    )
  }

  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
      getScoreboardData();
    }
  }, []);

  useEffect(() => {
    if (nbrOfThrowsLeft === 0) {
      setStatus('Select your points');
    }
    else if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
    else if (selectedDicePoints.every(x => x)) {
      savePlayerPoints();
    }
  }, [nbrOfThrowsLeft]);

  function getDicePointsColor(i) {
    if (selectedDicePoints[i]) {
      return "black";
    }
    else {
      return "steelblue"
    }
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "steelblue";
  }

  function selectDice(i) {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  function selectDicePoints(i) {
    let selected = [...selectedDices];
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal];
    if (!selectedPoints[i]) {
      selectedPoints[i] = true;
      let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
      points[i] = nbrOfDices * (i + 1);
      setDicePointsTotal(points);
    }
    selected.fill(false);
    setSelectedDices(selected);
    setSelectedDicePoints(selectedPoints);
    setNbrOfThrowsLeft(NBR_OF_THROWS)
    return points[i];
  }

  function throwDices() {
    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    setDiceSpots(spots);
    setStatus('Select and throw dices again');
  }

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
      }
    }
    catch (error) {
      console.log('Read error: ' + error.message);
    }
  }

 

  const savePlayerPoints = async () => {
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let points = dicePointsTotal.reduce((partialSum, a) => partialSum + a, 0);
    var time = date.getHours() + ":" + date.getMinutes();

    if (points >= 63) {
    let totalPoints = points + 50
    let bonusPoints = 50
   

    const playerPoints =  {
      name: playerName,
      date: day + "." + month,
      time: time,
      points: points,
      bonusPoints: bonusPoints,
      totalPoints: totalPoints
      }
      try {
        const newScore = [...scores, playerPoints];
        const jsonValue = JSON.stringify(newScore);
        await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
      }
      catch (error){
        console.log('Save error: ' + error.message);
      }
    } else {
        const playerPoints =  {
          name: playerName,
          date: day + "." + month,
          time: time,
          points: points,
          bonusPoints: 0,
          totalPoints: points
      }
      try {
        const newScore = [...scores, playerPoints];
        const jsonValue = JSON.stringify(newScore);
        await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
      }
      catch (error){
        console.log('Save error: ' + error.message);
      }
    }
  }

  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
        <Text style={styles.buttonText}>
          Throw dices
        </Text>
      </Pressable>
      <View style={styles.dicePoints}><Grid>{pointsRow}</Grid></View>
      <View style={styles.dicePoints}><Grid>{buttonsRow}</Grid></View>
      <Text style={styles.name}>Player: {playerName}</Text>
    </View>
  )
}