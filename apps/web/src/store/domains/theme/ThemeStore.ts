import { makeAutoObservable, runInAction } from "mobx";
import { storage } from "../../lib/localStorage";

type Theme = "light" | "dark";

class ThemeStore {
  theme: Theme = "light";
  isTelegram: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private init() {
    if (window.Telegram?.WebApp.initData) {
      this.isTelegram = true;
      const tg = window.Telegram.WebApp;

      this.theme = tg.colorScheme === "light" ? "light" : "dark";
      this.applyTheme();

      tg.onEvent("themeChanged", () => {
        runInAction(() => {
          this.theme = tg.colorScheme === "dark" ? "dark" : "light";
          this.applyTheme();
        });
      });

      tg.ready();
    } else {
      this.isTelegram = false;
      const saved = storage.get<Theme>("theme", "light");
      this.theme = saved;
      this.applyTheme();
    }
  }

  private applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);
  }

  private saveTheme() {
    if (!this.isTelegram) {
      storage.set("theme", this.theme);
    }
  }

  setTheme = (theme: Theme) => {
    this.theme = theme;
    this.applyTheme();
    this.saveTheme();
  };

  toggleTheme = () => {
    if (this.isTelegram) return;
    this.setTheme(this.theme === "light" ? "dark" : "light");
  };
}

export default ThemeStore;
