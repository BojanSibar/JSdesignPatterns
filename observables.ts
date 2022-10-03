interface Observable<T> {
  update(state: T): void;
}

class Subject<T> {
  private observables: Set<Observable<T>>;

  constructor() {
    this.observables = new Set<Observable<T>>();
  }

  subscribe(observable: Observable<T>) {
    this.observables.add(observable);
  }

  unsubscribe(observable: Observable<T>) {
    this.observables.delete(observable);
  }

  next(state: T): void {
    this.observables.forEach((observable) => observable.update(state));
  }
}

class StatefulSubject<T> extends Subject<T> {
  private state: T;

  constructor(initialState: T) {
    super();
    this.state = initialState;
  }

  subscribe(observable: Observable<T>): void {
    super.subscribe(observable);
    observable.update(this.state);
  }

  next(state: T) {
    this.state = state;
    super.next(state);
  }
}

// TODO: When a user logged-in, display a toast message, fetch permissions and redirect to dashboard
// TODO: When a user logged-out, display a toast message, redirect to login page

// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)
// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)

/**
 * Responsible for auth logic
 */

interface User {
  name: string;
}

class Auth extends StatefulSubject<User> {
  private _currentUser: any;

  constructor() {
    super({ name: "" });
    this._currentUser = null;
  }

  get currentUser(): any {
    return this._currentUser;
  }

  signIn() {
    this._currentUser = { name: "Nir" };
    this.next(this._currentUser);
  }

  signOut() {
    this._currentUser = null;
    this.next(this._currentUser);
  }
}

/**
 *  UI for displaying a message on the screen
 */
class ToastMessage implements Observable<User> {
  update(state: User): void {
    this.showToast(state.name);
  }
  showToast(message: string) {
    console.log("Display toast message: " + message);
  }
}

/**
 * Responsible for fetching a set of permissions for
 * A specific User
 */
class PermissionManager {
  getPermissionsForUser(user: any) {
    console.log("Fetching permissions for: " + user);
  }
}

/**
 * Responsible for routing and redirects
 */
class Router {
  redirectTo(routeName: string) {
    console.log("Redirectong to" + routeName);
  }
}

const auth = new Auth();
const toast = new ToastMessage();

auth.signIn();
auth.subscribe(toast);
auth.signIn();

//   auth.signOut();
