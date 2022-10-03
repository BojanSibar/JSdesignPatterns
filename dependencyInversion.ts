class Auth {}
class GoogleAuth implements AbstractAuth {
  singIn() {}
  signOut() {}
}
class Auth0 {}
class CustomAuth {}

// ----
abstract class AbstractAuth {
  abstract singIn();
  abstract signOut();
}
//

class UIComponent {
  constructor(auth: AbstractAuth) {}
}

new UIComponent(new GoogleAuth());
