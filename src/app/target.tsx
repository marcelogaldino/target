import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(null);

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
      // uopdtae
    } else {
      create();
    }
  }

  async function create() {
    try {
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
        rightButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch..."
          onChangeText={setName}
          value={amount}
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
