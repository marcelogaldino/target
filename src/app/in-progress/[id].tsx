import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionType";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

export default function InProgress() {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "",
    target: "",
    percentage: 0,
  });

  const transactions: TransactionProps[] = [
    {
      id: "1",
      value: "R$ 300,00",
      date: "12/04/25",
      description: "CDB de 110% no banco XPTO",
      type: TransactionTypes.Input,
    },
    {
      id: "2",
      value: "R$ 20,00",
      date: "12/04/25",
      description: "",
      type: TransactionTypes.Output,
    },
  ];

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();

  async function fetchDetails() {
    try {
      console.log(`>>>>`, params.id);
      const response = await targetDatabase.show(Number(params.id));
      console.log(response);
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Erro", "Nao foi possivel carregar os detalhes da meta");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);

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
        padding: 24,
        gap: 24,
      }}
    >
      <PageHeader
        title={details.name}
        subtitle="Economize para alcançar sua meta financeira"
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate(`target?id=${params.id}`),
        }}
      />

      <Progress data={details} />
      <List
        title="Transações"
        data={transactions}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
