export class SessionStorageService {
  getItem (id: string): string {
    return window.sessionStorage.getItem(id);
  }
  setItem (id: string, s: string) {
    window.sessionStorage.setItem(id, s);
  }
}
