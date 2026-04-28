export type SimplifiedMeal = {
  id: string;
  createdAt: Date;
  name: string;
  icon: string;
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
};

export type Meal = {
  id: string;
  status: Meal.Status;
  inputType: Meal.InputType;
  inputFileUrl: string;
  name: string;
  icon: string;
  foods: Meal.Food[];
  createdAt: Date;
};

export namespace Meal {
  export enum Status {
    UPLOADING = "UPLOADING",
    QUEUED = "QUEUED",
    PROCESSING = "PROCESSING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
  }

  export enum InputType {
    AUDIO = "AUDIO",
    PICTURE = "PICTURE",
  }

  export type Food = {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  };
}
