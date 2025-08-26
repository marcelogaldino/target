import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target, TargetProps } from "@/components/Target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useFocusEffect } from "expo-router";
import { Alert, StatusBar, View } from "react-native";
import { useCallback, useState } from "react";
import { Loading } from "@/components/Loading";

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 860,20" },
  output: { label: "Saidas", value: "-R$ 460,20" },
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);
  const targetDatabase = useTargetDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const res = await targetDatabase.listBySavedValue();
      console.log(res);
      return res.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: String(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: String(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Nao foi possivel carregar as metas");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isLoading) {
    return <Loading />;
  }

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
