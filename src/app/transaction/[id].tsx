import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";
import { useTransactionDatabase } from "@/database/useTransactionsDatabase";
import { TransactionTypes } from "@/utils/TransactionType";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [type, setType] = useState(TransactionTypes.Input);

  const params = useLocalSearchParams<{ id: string }>();
  console.log("parammms >>", params.id);
  const transactionsDatabase = useTransactionDatabase();

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert("Atenção", "Preencha o valor");
      }
      setIsCreating(true);
      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      });
      Alert.alert("Sucesso", "Transação salva com sucesso", [
        {
          text: "Ok",
          onPress: router.back,
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel salvar a transação");
      console.log(error);
      setIsCreating(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput
          label="Valor alvo (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110%"
          onChangeText={setObservation}
        />
        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
