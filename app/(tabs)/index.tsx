import { useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import { GET_CHARACTERS } from "../graphql/queries";
import { CharactersResponse } from "../types/Character";

export default function Index() {
  const router = useRouter()
  const { loading, error, data, fetchMore } = useQuery<CharactersResponse>(GET_CHARACTERS, {
    variables: { page: 1 }
  })

  // infinite scrolling
  const loadMore = () => {
    if (data?.characters.info.next) {
      fetchMore({
        variables: { page: data.characters.info.next },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            characters: {
              ...fetchMoreResult.characters,
              results: [
                ...prev.characters.results,
                ...fetchMoreResult.characters.results
              ]
            }
          }
        }
      })
    }
  }

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View 
      style={styles.container}
    >
    <FlatList
      data={data?.characters.results || []}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Card item={item} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
    />
    </View>
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
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});