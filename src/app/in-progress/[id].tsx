import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionType";
import dayjs from "dayjs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";

export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "",
    target: "",
    percentage: 0,
  });

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();
  const transactionDatabase = useTransactionDatabase();

  async function fetchTargetDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
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

  async function fetchTransactions() {
    try {
      const response = await transactionDatabase.listByTargetId(
        Number(params.id),
      );
      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        })),
      );
      console.log("transactions >>", response);
    } catch (error) {
      Alert.alert("Erro", "Nao foi possivel carregar as transações");
      console.log(error);
    }
  }

  function handleRemove(id: string) {
    if (!id) {
      return;
    }
    Alert.alert(
      "Deletar transação",
      `Tem certeza que deseja deletar a transação ?`,
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => remove(id),
        },
      ],
    );
  }

  async function remove(id: string) {
    try {
      setIsLoading(true);
      await transactionDatabase.remove(Number(id));
      fetchData();
      Alert.alert("Transação", "Transação deletada!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel deletar a transação");
      console.log(error);
      setIsLoading(false);
    }
  }

  async function fetchData() {
    const fetchTargetDetailsPromise = fetchTargetDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchTargetDetailsPromise, fetchTransactionsPromise]);

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
      <StatusBar barStyle="dark-content" />
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
          <Transaction data={item} onRemove={() => handleRemove(item.id)} />
        )}
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
