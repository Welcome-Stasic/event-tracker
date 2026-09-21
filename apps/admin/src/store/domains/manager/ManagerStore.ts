import { makeAutoObservable } from "mobx";
import type { UserDto } from "@repo/types";
import { storage } from "../../lib/localStorage";

class ManagerStore {
  user: UserDto | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  private loadUser() {
    this.user = storage.get<UserDto | null>("currentUser", null);
  }

  private saveUser() {
    if (this.user) {
      storage.set("currentUser", this.user);
    } else {
      storage.remove("currentUser");
    }
  }

  setUser = (user: UserDto | null) => {
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
export default ManagerStore;
