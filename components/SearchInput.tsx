import { DSearchProps } from '@/types/SearchType';
import React from 'react';
import { StyleSheet, TextInput } from "react-native";

const DebouncedSearchInput = React.memo(({ 
  onSearch,
  delay
}: DSearchProps) => {
  const [localText, setLocalText] = React.useState('');
  const timeoutRef = React.useRef<number | null>(null);

  const handleTextChange = (newText: string) => {

    setLocalText(newText);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSearch(newText); 
    }, delay);
  };

  return (
    <TextInput
      placeholder="Search by name..."
      style={styles.input}
      onChangeText={handleTextChange}
      value={localText}
    />
  );
});

export default DebouncedSearchInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor:'#c2c1c1ff'
  },
});
