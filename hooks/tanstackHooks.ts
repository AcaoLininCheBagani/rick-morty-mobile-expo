import { fetchCharacter, fetchCharacters } from "@/api/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetCharacters = () => {
    return useInfiniteQuery({
        queryKey: ['characters'],
        queryFn: ({ pageParam = 1 }) => fetchCharacters(pageParam),
        getNextPageParam: (lastPage) => {
            return lastPage.info.next ? lastPage.info.next : undefined;
        },
        initialPageParam: 1,
        select: (data) => data.pages.flatMap(page => page.results)
    })
}

export const useGetCharacter = (id: string) => {
    return useQuery({
        queryKey: ['character'],
        queryFn: () => fetchCharacter(id),
    })
}