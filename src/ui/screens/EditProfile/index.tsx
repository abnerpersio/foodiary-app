import { useAuth } from "@/app/contexts/AuthContext/useAuth";
import { useAccount } from "@/app/hooks/queries/useAccount";
import { Gender } from "@/app/types/Gender";
import placeholderAvatar from "@/ui/assets/avatar/image.jpg";
import { AppHeader } from "@/ui/components/AppHeader";
import { Button } from "@/ui/components/Button";
import { DateInput } from "@/ui/components/DateInput";
import { FormGroup } from "@/ui/components/FormGroup";
import { Input } from "@/ui/components/Input";
import {
  RadioGroup,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupLabel,
} from "@/ui/components/RadioGroup";
import { theme } from "@/ui/styles/theme";
import { formatDecimal } from "@/ui/utils/formatDecimal";
import { CameraIcon, LogOutIcon } from "lucide-react-native";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useEditPicture } from "./useEditPicture";
import { useEditProfile } from "./useEditProfile";

export function EditProfile() {
  const { top, bottom } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { form, handleSubmit } = useEditProfile();

  const { isRefreshing, handleRefresh } = useAccount();

  const {
    pictureUri,
    isLoading: isUploadingPicture,
    handleUpdatePicture,
  } = useEditPicture();

  return (
    <View style={[styles.container, { paddingTop: Math.max(top, 16) }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <AppHeader
          title="Perfil"
          rightAction={
            <Button variant="ghost" size="icon" onPress={signOut}>
              <LogOutIcon size={20} color={theme.colors.black[700]} />
            </Button>
          }
        />

        <ScrollView
          style={styles.content}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.lime[900]}
              colors={[theme.colors.lime[700]]}
            />
          }
        >
          <View style={styles.form}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={handleUpdatePicture}
              disabled={isUploadingPicture}
              activeOpacity={0.8}
            >
              <Image
                style={styles.avatar}
                source={
                  pictureUri
                    ? [{ uri: pictureUri }, placeholderAvatar]
                    : placeholderAvatar
                }
              />

              <View style={styles.avatarOverlay}>
                {isUploadingPicture && (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                )}

                {!isUploadingPicture && (
                  <CameraIcon
                    size={20}
                    opacity={0.8}
                    color={theme.colors.white}
                  />
                )}
              </View>
            </TouchableOpacity>

            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormGroup label="Nome" error={fieldState.error?.message}>
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    autoCapitalize="words"
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="birthDate"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Data de Nascimento"
                  error={fieldState.error?.message}
                >
                  <DateInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="height"
              render={({ field, fieldState }) => (
                <FormGroup label="Altura" error={fieldState.error?.message}>
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    keyboardType="numeric"
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                    suffix="cm"
                    formatter={formatDecimal}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="weight"
              render={({ field, fieldState }) => (
                <FormGroup label="Peso" error={fieldState.error?.message}>
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    keyboardType="numeric"
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                    suffix="kg"
                    formatter={formatDecimal}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="gender"
              render={({ field, fieldState }) => (
                <FormGroup label="Sexo" error={fieldState.error?.message}>
                  <RadioGroup
                    value={field.value ?? null}
                    onChangeValue={field.onChange}
                    orientation="horizontal"
                    error={!!fieldState.error}
                    disabled={form.formState.isSubmitting}
                  >
                    <RadioGroupItem value={Gender.MALE}>
                      <RadioGroupIcon>🧔</RadioGroupIcon>
                      <RadioGroupLabel>Masculino</RadioGroupLabel>
                    </RadioGroupItem>

                    <RadioGroupItem value={Gender.FEMALE}>
                      <RadioGroupIcon>👩‍🦰</RadioGroupIcon>
                      <RadioGroupLabel>Feminino</RadioGroupLabel>
                    </RadioGroupItem>
                  </RadioGroup>
                </FormGroup>
              )}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: bottom + 16 }]}>
          <Button
            variant="primary"
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
