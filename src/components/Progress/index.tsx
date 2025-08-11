import { Text, View } from "react-native";
import { styles } from "./styles";

type SavedValues = {
  current: string;
  target: string;
  percentage: number;
};

type Props = {
  data: SavedValues;
};

export function Progress({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor guardado</Text>

      <View style={styles.status}>
        <Text style={styles.value}>
          {data.current}
          <Text style={styles.target}> de {data.target}</Text>
        </Text>

        <Text style={styles.percentage}>{data.percentage}%</Text>
      </View>

      <View style={styles.progress}>
        <View
          style={[styles.currentProgress, { width: `${data.percentage}%` }]}
        />
      </View>
    </View>
  );
}
