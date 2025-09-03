import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(null);

  const targetDatabase = useTargetDatabase();

  const params = useLocalSearchParams<{ id?: string }>();

  function handleSave() {
    if (!name.trim() && amount <= 0) {
      return Alert.alert(
        "Atenção",
        "Preencha nome e valor. O valor não pode ser zero",
      );
    }

    setIsProcessing(true);

    if (params.id) {
      update();
    } else {
      create();
    }
  }

  async function update() {
    try {
      await targetDatabase.update({ id: Number(params.id), amount, name });
      Alert.alert("Sucesso!", "Meta atualizada", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel atualizar a meta");
      console.log(error);
      setIsProcessing(false);
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount });
      Alert.alert("Nova Meta", "Meta criada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel criar a meta");
      console.log(error);
      setIsProcessing(false);
    }
  }

  function handleRemove() {
    if (!params.id) {
      return;
    }
    Alert.alert(
      "Deletar Meta",
      `Tem certeza que deseja deletar a meta ${name} ?`,
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: remove,
        },
      ],
    );
  }

  async function remove() {
    try {
      setIsProcessing(true);
      await targetDatabase.remove(Number(params.id));
      Alert.alert("Meta", "Meta deletada!", [
        {
          text: "Ok",
          onPress: () => router.replace("/"),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possivel deletar a meta");
      console.log(error);
      setIsProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta");
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira"
        rightButton={
          params.id
            ? {
                icon: "delete",
                onPress: handleRemove,
              }
            : undefined
        }
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch..."
          onChangeText={setName}
          value={name}
        />
        <CurrencyInput
          placeholder="R$ 0,00"
          label="Valor alvo (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title="Salvar"
          isProcessing={isProcessing}
          onPress={handleSave}
        />
      </View>
    </View>
  );
}
