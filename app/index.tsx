import Card from "@/components/Card";
import DebouncedSearchInput from "@/components/SearchInput";
import { useGetCharacters } from "@/hooks/tanstackHooks";
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
export default function Index() {
  const [searchInput, setSearchInput] = React.useState<string>('')
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetCharacters(searchInput)

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleSearch = (query: string) => {
    setSearchInput(query);
  };

  return (
    <>
      <DebouncedSearchInput
        onSearch={handleSearch}
        delay={700}
        value={searchInput}
      />
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card item={item} />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null
          }
        />
      )}
    </>
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