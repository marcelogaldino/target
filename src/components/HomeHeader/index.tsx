import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { Separator } from "../Separator";
import { Summary, SummaryProps } from "../Summary";

export type HomeHeaderProps = {
  total: string;
  input: SummaryProps;
  output: SummaryProps;
};

export type Props = {
  data: HomeHeaderProps;
};

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blue[500], colors.blue[800]]}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={data.input}
          icon={{ name: "arrow-upward", color: colors.green[500] }}
        />

        <Summary
          isLeft
          data={data.output}
          icon={{ name: "arrow-downward", color: colors.red[400] }}
        />
      </View>
    </LinearGradient>
  );
}
