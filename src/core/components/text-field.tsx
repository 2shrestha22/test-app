import { Text, TextInput, TextInputProps, View } from "react-native";

export default function TextField({
  error,
  ...props
}: TextInputProps & {
  error?: string;
}) {
  return (
    <View>
      <TextInput {...props} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}
