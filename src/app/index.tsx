import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useFocusEffect } from "expo-router";
import { Alert, StatusBar, View } from "react-native";
import { useCallback } from "react";

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
  const targetDatabase = useTargetDatabase();

  async function fetchTargets() {
    try {
      const res = await targetDatabase.listBySavedValue();
      console.log(res);
    } catch (error) {
      Alert.alert("Erro", "Nao foi possivel carregar as metas");
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTargets();
    }, []),
  );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        title="Metas"
        emptyMessage="Nenhuma meta. Toque para criar uma meta"
        keyExtractor={(item) => item.id}
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
