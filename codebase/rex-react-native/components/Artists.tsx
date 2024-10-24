import { Text } from "react-native";
export function Artists({ artists, artist }: any) {
  return (
    <Text className={`font-jlight text-base px-4`}>
      {artists &&
        artists.map((artist: any, index: number) => {
          if (index != artists.length - 1) {
            return `${artist.name}, `;
          } else {
            return artist.name;
          }
        })}
      {artist && !artists && artist.name}
    </Text>
  );
}
