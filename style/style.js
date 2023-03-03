import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "steelblue",
    width: 300,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: "#2B2B52",
    fontSize: 20,
    fontWeight: 'bold'
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: 'center'

  },
  dicePoints: {
    flexDirection: 'row',
    width: 200,
    margin: 10,
    alignContent: 'center'
  },
  pressables: {
    borderRadius: 15,

  },
  scoreboard: {
    flex: 1,
    alignItems: 'stretch',
    borderBottomWidth: 0
  },
  name: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  }, 
  home: {
    alignItems: 'center'
  },
  textinput: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: "100%",
  },
  titles: {
    color: 'steelblue',
    fontSize: 50
  }
});