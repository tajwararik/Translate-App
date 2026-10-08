export type Language = {
  name: string;
  code: string;
};

export type Option = {
  inputOptions: Language[];
  outputOptions: Language[];
};

export type LanguageCode = {
  input: string;
  output: string;
};

export type Expand = {
  input: boolean;
  output: boolean;
};

export type Text = {
  inputText: string;
  outputText: string;
};

export type LanguageContextType = {
  languageCode: LanguageCode;
  visibleOptions: Option;
  handleLanguage: (code: string, isInput: boolean) => void;
  handleExpand: (isInput: boolean) => void;
  addToVisibleOptions: (option: Language, isInput: boolean) => void;
};

export type ContainerProps = {
  isInput: boolean;
  translatingText?: string;
  translatedText?: string;
  expandInputOptions?: boolean;
  expandOutputOptions?: boolean;
  handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  handleTranslate?: () => void;
  handleSwapLanguages?: () => void;
  handleListen?: (isInput: boolean) => void;
  handleCopy?: () => void;
};
