import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import {  useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  const details = {
    current: "R$ 1.200,00",
    target: "R$ 1.200,00",
    percentage: 50,
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 24,
      }}
    >
      <PageHeader
        title="Apple Watch"
        subtitle="Economize para alcançar sua meta financeira"
        rightButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />

      <Progress data={details} />
    </View>
  );
}
