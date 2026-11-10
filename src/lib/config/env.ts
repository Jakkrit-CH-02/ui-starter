type EnvSource = Record<string, string | undefined>;

declare global {
  interface Window {
    /** Optional runtime config injected before the app loads (e.g. by the web server). */
    env?: EnvSource;
  }
}

// Runtime config (window.env) wins over build-time config (.env files).
const source: EnvSource = window.env ?? import.meta.env;

const env = {
  MODE: import.meta.env.MODE,
  BASE_NAME: source.VITE_APP_BASE_NAME ?? "",
  TENANT_ID: source.VITE_APP_TENANT_ID ?? "",
  CLIENT_ID: source.VITE_APP_CLIENT_ID ?? "",
  REDIRECT_URL: source.VITE_APP_REDIRECT_URL ?? "",
  API_SCOPE: source.VITE_APP_API_SCOPE ?? "",
  API_ENDPOINT: source.VITE_APP_API_ENDPOINT ?? "",
  IMAGE_ROOT: source.VITE_APP_IMAGE_ROOT ?? "",
};

export default env;
