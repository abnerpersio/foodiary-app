import AsyncStorage from "@react-native-async-storage/async-storage";

type SignInMethod = "google" | "email";

export class LastSignInManager {
  private static KEY = "@foodiary::last_sign_in";

  static async save(method: SignInMethod): Promise<void> {
    await AsyncStorage.setItem(this.KEY, method);
  }

  static async load(): Promise<SignInMethod | null> {
    try {
      const value = await AsyncStorage.getItem(this.KEY);
      return value as SignInMethod | null;
    } catch {
      return null;
    }
  }
}
