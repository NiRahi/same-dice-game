import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';

export default Header = () => {
  return (
    <View>
      <Text style={styles.name}>
        Yahtzee MINI
      </Text>
    </View>
  )
}