interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_UPLOAD_URL: string;
}

declare module '*.scss' {
  const styles: Record<string, string>;
  export default styles;
}