import { ImageStyle, TextStyle, ViewStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

type Variants = {
  [variant: string]: {
    [variantName: string]: Style;
  };
};

type CreateVariantsParams<TVariants extends Variants> = {
  defaultVariants: {
    [K in keyof TVariants]: keyof TVariants[K];
  };
  base?: Style;
  variants: TVariants;
};

export function createVariants<TVariants extends Variants>({
  base = {},
  variants,
  defaultVariants,
}: CreateVariantsParams<TVariants>) {
  return (selectedVariants?: {
    [K in keyof TVariants]?: keyof TVariants[K];
  }) => {
    let styles = { ...base } as Style;

    for (const [variant, variantStyles] of Object.entries(variants)) {
      const variantName =
        selectedVariants?.[variant] ?? defaultVariants[variant];
      const selectedStyles =
        variantStyles[variantName as keyof typeof variantStyles];

      styles = { ...styles, ...selectedStyles };
    }

    return styles;
  };
}

export type VariantProps<T extends ReturnType<typeof createVariants>> =
  NonNullable<Parameters<T>[0]>;
