import { View } from "react-native";
import { Option } from "./option";
import { styles } from "./styles";
import { TransactionTypes } from "@/utils/TransactionType";
import { colors } from "@/theme";

type Props = {
  selected: TransactionTypes;
  onChange: (type: TransactionTypes) => void;
};

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        title="Guardar"
        icon="arrow-upward"
        isSelected={selected === TransactionTypes.Input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.Input)}
      />
      <Option
        title="Resgatar"
        icon="arrow-downward"
        isSelected={selected === TransactionTypes.Output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  );
}
