import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { View } from "react-native";

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 860,20" },
  output: { label: "Saidas", value: "-R$ 460,20" },
};

const targets = [
  {
    percentage: "75%",
    current: "R$ 900,00",
    name: "Comprar cadeira",
    target: "R$ 1.200,00",
  },
  {
    percentage: "75%",
    current: "R$ 900,00",
    name: "Comprar cadeira",
    target: "R$ 1.200,00",
  },
];

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <HomeHeader data={summary} />
      <Target data={targets[0]} />
    </View>
  );
}
