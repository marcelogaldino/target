import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { View } from "react-native";

export default function Target() {
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
        <Input label="Nome da meta" />
        <CurrencyInput
          label="Valor alvo (R$)"
          value={1250.5}
          onChangeValue={() => {}}
        />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
