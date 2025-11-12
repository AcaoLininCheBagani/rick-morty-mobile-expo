import { GET_CHARACTER, GET_CHARACTERS } from "@/graphql/queries";
import { client } from "@/lib/graphqlClient";
import { Character, CharactersResponse } from "@/types/Character";

export const fetchCharacters = async (page: number) => {
  const data = await client.request<CharactersResponse>(GET_CHARACTERS, { page });
  return data.characters;
}

export const fetchCharacter = async (id: string) => {
  const data = await client.request<{ character: Character }>(GET_CHARACTER, { id });
  return data.character
}