import { View, Text } from "react-native";
import { RecIcon } from "@/components/rex/RecIcon";
import RexCollectionRow from "./RecCollectionRow";
export default function RexCollection({ recs }: any) {
  const getPending = (recs: any[]) => {
    return recs.filter((rec: any) => rec.rec.status == "Pending");
  };
  const getCompleted = (recs: any) => {
    return recs.filter((rec: any) => rec.rec.status == "Completed");
  };
  const getArchived = (recs: any) => {
    return recs.filter((rec: any) => rec.rec.status == "Archived");
  };
  const pending = getPending(recs);
  const completed = getCompleted(recs);
  const archived = getArchived(recs);
  return (
    <View className="p-2">
      <View className="flex flex-col">
        <RexCollectionRow title="Pending" recs={pending} />
        <RexCollectionRow title="Completed" recs={completed} />
        <RexCollectionRow title="Archived" recs={archived} />
      </View>
    </View>
  );
}
