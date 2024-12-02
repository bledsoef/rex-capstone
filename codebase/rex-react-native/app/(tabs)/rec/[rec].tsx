import { StyleSheet, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Song } from "@/components/Song";
import { images } from "@/constants";
import { useMusicPlayer } from "@/components/globalContexts/PlayerContext";
import RecHeader from "@/components/rex/RecHeader";
import RexHeader from "@/components/rex/RexHeader";
import StarSelector from "@/components/rex/reviews/StarSelector";
import RecComments from "@/components/rex/reviews/RecComments";
export default function RecPage() {
  const { rec } = useLocalSearchParams();
  const [recData, setRec] = useState({});
  const [media, setMedia] = useState({});
  const [mediaType, setMediaType] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [mediaCreators, setMediaCreators] = useState(null);
  const [sender, setSender] = useState({ username: "" });
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [review, setReview] = useState({})
  const getRecComments = async () => {
    var res = await fetch(
      `http://127.0.0.1:8000/getRecComments?rec_id=${rec}`
    );
    var data = await res.json();
    setComments(data["rec_comments"]);

  };
  useEffect(() => {
    const fetchRecData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getRecInformation?rec_id=${rec}`
        );
        const data = await response.json();
        setRec(data["rec"]);
        setMedia(data["media"]);
        setSender(data["sender"]);
        const mediaType = data["media_type"];
        setMediaType(mediaType);
        setMediaCreators(data["media_creators"]);
        if (data["media_type"] != "playlist") {
          const mediaFileRef = ref(
            storage,
            `/${mediaType == "song" ? "album" : mediaType}Images/${
              mediaType == "song"
                ? data["media"]["album_id"]
                : data["media"]["id"]
            }.jpg`
          );
          getDownloadURL(mediaFileRef)
            .then((res) => {
              setMediaURL(res);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
        if (data["media_type"] != "playlist") {
          const mediaFileRef = ref(
            storage,
            `/${mediaType == "song" ? "album" : mediaType}Images/${
              mediaType == "song"
                ? data["media"]["album_id"]
                : data["media"]["id"]
            }.jpg`
          );
          getDownloadURL(mediaFileRef)
            .then((res) => {
              setMediaURL(res);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        } else {
          // playlist
          var fileRef;
          if (data["media"]["title"] == "My Liked Songs") {
            fileRef = ref(storage, `/playlistImages/liked.png`);
          } else if (data["media"]["has_image"] == false) {
            return;
          } else {
            fileRef = ref(
              storage,
              `/playlistImages/${data["media"]["id"]}.jpg`
            );
          }
          getDownloadURL(fileRef)
            .then((res) => {
              setMediaURL(res);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecData();
    getRecComments()
  }, []);

  return (
    <SafeAreaView className="bg-white min-h-screen">
      <ScrollView className="h-full">
        <RecHeader
          rec={recData}
          sender={sender}
          mediaCreators={mediaCreators}
          media={media}
          mediaType={mediaType}
          mediaURL={mediaURL}
        />
        <StarSelector
          rating={rating}
          onSelectRating={(newRating: any) => setRating(newRating)}
        />
        <RecComments recID={rec} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
