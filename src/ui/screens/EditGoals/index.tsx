import { AppHeader } from "@/ui/components/AppHeader";
import { Button } from "@/ui/components/Button";
import { FormGroup } from "@/ui/components/FormGroup";
import { Input } from "@/ui/components/Input";
import { useNavigation } from "@react-navigation/native";
import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useEditGoals } from "./useEditGoals";

export function EditGoals() {
  const { top, bottom } = useSafeAreaInsets();
  const { form, handleSubmit } = useEditGoals();
  const { goBack } = useNavigation();

  return (
    <View style={[styles.container, { paddingTop: Math.max(top, 16) }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <AppHeader title="Suas Metas" />

        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <Controller
              control={form.control}
              name="calories"
              render={({ field, fieldState }) => (
                <FormGroup label="Calorias" error={fieldState.error?.message}>
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="numeric"
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                    suffix="kcal"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="carbohydrates"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Carboidratos"
                  error={fieldState.error?.message}
                >
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="numeric"
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="proteins"
              render={({ field, fieldState }) => (
                <FormGroup label="Proteínas" error={fieldState.error?.message}>
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="numeric"
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="fats"
              render={({ field, fieldState }) => (
                <FormGroup label="Gorduras" error={fieldState.error?.message}>
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="numeric"
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: bottom + 16 }]}>
          <Button
            variant="secondary"
            style={{ flex: 1 }}
            onPress={goBack}
            disabled={form.formState.isSubmitting}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            style={{ flex: 1 }}
            onPress={handleSubmit}
            isLoading={form.formState.isSubmitting}
          >
            Salvar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
