import Card from "@/components/Card";
// import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "@/graphql/queries";
import { client } from "@/lib/graphqlClient";
import { CharactersResponse } from "@/types/Character";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
export default function Index() {
 
const fetchCharacters = async (page: number) => {
   const data = await client.request<CharactersResponse>(GET_CHARACTERS, {page});
   return data.characters;
}
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }  = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam = 1}) => fetchCharacters(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.info.next ? lastPage.info.next : undefined;
    },
    initialPageParam: 1,
  })

   // Flatten all pages into a single array for FlatList
  const allCharacters = React.useMemo(
    () => data?.pages.flatMap(page => page.results) ?? [],
    [data]
  );
 const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    // <View 
    //   style={styles.container}
    // >
    <FlatList
      data={allCharacters || []}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Card item={item} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null
        }
    />
    // </View>
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