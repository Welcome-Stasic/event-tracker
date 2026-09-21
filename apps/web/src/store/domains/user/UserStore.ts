import { makeAutoObservable } from "mobx";
import { storage } from "../../lib/localStorage";
import type { UserProfile } from "@repo/types";

class UserStore {
  user: UserProfile | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  private loadUser() {
    this.user = storage.get<UserProfile | null>("currentUser", null);
  }

  private saveUser() {
    if (this.user) {
      storage.set("currentUser", this.user);
    } else {
      storage.remove("currentUser");
    }
  }

  setUser = (user: UserProfile | null) => {
    this.user = user;
    this.saveUser();
  };

  get isAuthenticated() {
    return Boolean(this.user);
  }

  clearUser = () => {
    this.user = null;
    storage.remove("currentUser");
  };
}

export default UserStore;
