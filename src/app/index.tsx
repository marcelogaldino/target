import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { View } from "react-native";

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 860,20" },
  output: { label: "Saidas", value: "-R$ 460,20" },
};

const targets = [
  {
    id: "1",
    percentage: "75%",
    current: "R$ 900,00",
    name: "Comprar cadeira",
    target: "R$ 1.200,00",
  },
  {
    id: "2",
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
      }}
    >
      <HomeHeader data={summary} />

      <List
        data={targets}
        renderItem={({ item }) => <Target data={item} />}
        title="Metas"
        emptyMessage="Nenhuma meta. Toque para criar uma meta"
        keyExtractor={(item) => item.id}
        containerStyle={{ paddingHorizontal: 24 }}
      />
    </View>
  );
}
