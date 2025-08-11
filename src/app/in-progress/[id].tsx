import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionTypes } from "@/utils/TransactionType";
import { router } from "expo-router";
import { View } from "react-native";

export default function InProgress() {
  const details = {
    current: "R$ 1.200,00",
    target: "R$ 1.200,00",
    percentage: 50,
  };

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
        onPress={() => router.navigate(`/transaction/${1}`)}
      />
    </View>
  );
}
