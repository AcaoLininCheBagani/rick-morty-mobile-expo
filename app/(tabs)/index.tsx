import { ScrollView, StyleSheet } from "react-native";
import Card from "../components/Card";
export default function Index() {
  return (
    <ScrollView
      style={styles.container}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_e, key) => (
        <Card key={key} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff'
  }
});