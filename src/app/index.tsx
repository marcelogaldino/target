import { Button } from "@/components/Button";
import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target, TargetProps } from "@/components/Target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useFocusEffect } from "expo-router";
import { Alert, StatusBar, View } from "react-native";
import { useCallback, useState } from "react";
import { Loading } from "@/components/Loading";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useTransactionDatabase } from "@/database/useTransactionsDatabase";

export default function Index() {
  const [summary, setSummary] = useState<HomeHeaderProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);

  const targetDatabase = useTargetDatabase();
  const transactionDatabase = useTransactionDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const res = await targetDatabase.listBySavedValue();
      return res.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Nao foi possivel carregar as metas");
      console.log(error);
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const { input, output } = await transactionDatabase.summary();

      return {
        total: numberToCurrency(input + output),
        input: {
          label: "Entradas",
          value: numberToCurrency(input),
        },
        output: {
          label: "Saídas",
          value: numberToCurrency(output),
        },
      };
    } catch (error) {
      Alert.alert("Erro", "Nao foi possivel carregar o resumo");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const summaryPromise = fetchSummary();

    const [targetData, summaryData] = await Promise.all([
      targetDataPromise,
      summaryPromise,
    ]);

    setTargets(targetData);
    setSummary(summaryData);
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
