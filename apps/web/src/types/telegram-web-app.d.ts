export {};

interface WebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface WebAppInitData {
  user?: WebAppUser;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        colorScheme: "light" | "dark";
        initData: string;
        initDataUnsafe: WebAppInitData;
        onEvent: (eventType: string, callback: () => void) => void;
        ready: () => void;
      };
    };
  }
}
