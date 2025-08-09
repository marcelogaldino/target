import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/fontFamily";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,

  },
  label: {
    fontSize: 12,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
  },
  input: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
  },
});