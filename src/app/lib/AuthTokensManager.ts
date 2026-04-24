import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthTokensManager {
  private static KEY = "@foodiary::auth";

  static async save({ accessToken, refreshToken }: AuthTokensManager.Tokens) {
    return await AsyncStorage.setItem(
      this.KEY,
      JSON.stringify({ accessToken, refreshToken }),
    );
  }

  static async load(): Promise<AuthTokensManager.Tokens | null> {
    try {
      const value = await AsyncStorage.getItem(this.KEY);
      if (!value) return null;
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  static async clear() {
    return await AsyncStorage.removeItem(this.KEY);
  }
}

export namespace AuthTokensManager {
  export type Tokens = {
    accessToken: string;
    refreshToken: string;
  };
}
