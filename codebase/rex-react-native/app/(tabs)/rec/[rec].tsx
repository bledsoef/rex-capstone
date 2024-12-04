import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
  TextInput,
  Pressable,
} from "react-native";
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
import { useUserContext } from "@/components/globalContexts/UserContext";
import { Octicons } from "@expo/vector-icons";
export default function RecPage() {
  const { rec } = useLocalSearchParams();
  const { currentUser } = useUserContext();
  const [recData, setRec] = useState({});
  const [media, setMedia] = useState({});
  const [mediaType, setMediaType] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [mediaCreators, setMediaCreators] = useState(null);
  const [sender, setSender] = useState({ username: "", id: -1 });
  const [recipient, setRecipient] = useState({ username: "", id: -1 });
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [review, setReview] = useState({});
  const [update, setUpdate] = useState(0);
  const getRecComments = async () => {
    var res = await fetch(`http://127.0.0.1:8000/getRecComments?rec_id=${rec}`);
    var data = await res.json();
    setComments(data["rec_comments"]);
    setReview(data["review"]);
  };
  const handleChangeComment = (e: any) => {
    setNewComment(e);
  };
  const handleCreateComment = async () => {
    await fetch("http://127.0.0.1:8000/createRecComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: newComment,
        user_id: currentUser.id,
        rec_id: rec,
      }),
    });
    setUpdate(update + 1);
    setNewComment("");
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
        setRecipient(data["recipient"]);
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
    getRecComments();
  }, [update]);

  return (
    <SafeAreaView className="bg-white min-h-screen">
      <ScrollView className="h-full">
        <RecHeader
          rec={recData}
          isSender={sender["username"] == currentUser["username"]}
          sender={sender}
          mediaCreators={mediaCreators}
          media={media}
          mediaType={mediaType}
          mediaURL={mediaURL}
        />
        <View className="h-full bg-[#f9f9f9] p-2">
          <StarSelector
            isSender={sender["username"] == currentUser["username"]}
            rating={rating}
            onSelectRating={(newRating: any) => setRating(newRating)}
          />
          <RecComments
            recID={rec}
            sender={sender}
            recipient={recipient}
            comments={comments}
            onCreateComment={handleCreateComment}
            isSender={sender["username"] == currentUser["username"]}
          />
        </View>
      </ScrollView>
      <View
        className={`w-full bg-[#f9f9f9] flex flex-row bottom-[9%] items-center justify-center absolute pb-3 px-2 `}
      >
        <View className="flex flex-row items-center px-4 border-gray-200 w-5/6 p-4 bg-gray-100 rounded-2xl focus:border-rex">
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={100}
            className="text-base flex-1 font-jregular w-full"
            placeholder="New comment"
            onChangeText={(e: any) => handleChangeComment(e)}
            value={newComment}
          />
        </View>
        <Pressable className="p-3" onPress={() => handleCreateComment()}>
          <Octicons size={25} color={"#50ba6f"} name={"paper-airplane"} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
});
