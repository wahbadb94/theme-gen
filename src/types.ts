/** */
export const ThemeableProperties = ['fill', 'text'] as const;
/** */
export type ThemeableProperty = typeof ThemeableProperties[number];

/** */
export type ThemeGenVariableConfig = {
  /** */
  twType: ExtendableTailwindProperty;
  /** */
  twName: string;
  /** */
  cssVar: `--color-${string}`;
  /** */
  hexValue: HexColor;
};
/** */
export const ExtendableTailwindProperties = ['backgroundColor', 'textColor'] as const;
/** */
export type ExtendableTailwindProperty = typeof ExtendableTailwindProperties[number];

/** */
export type HexColor = `#${string}`;

/** */
export type Themed<
  Props extends ThemeableProperty,
  States extends string = '',
  Variants extends string = ''
> = '' extends Variants
  ? PropertyStateValues<Props, States>
  : {
      [V in Variants]: PropertyStateValues<Props, States>;
    } & {
      /** */
      _hasVariants: true;
    };

/** */
export type PropertyStateValues<Props extends ThemeableProperty, States extends string> = '' extends States
  ? PropertyConfig<Props>
  : PropertyAndStatesConfig<Props, States>;

/** */
export type PropertyAndStatesConfig<Props extends ThemeableProperty, States extends string> = PropertyConfig<Props> & {
  /** */
  _states: StatesConfig<Props, States>;
};

/** */
export type StatesConfig<Props extends ThemeableProperty, States extends string> = {
  [S in States]: PropertyConfig<Props>;
};

/** */
export type PropertyConfig<Props extends ThemeableProperty> = {
  [P in Props]: HexColor;
};
