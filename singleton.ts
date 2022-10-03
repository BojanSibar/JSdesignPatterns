const singleton = Object.freeze({
  name: "bojan",
});

// Object seal

console.log(Object.isFrozen(singleton));

singleton.name = "bob";
singleton["age"] = 12;

console.log(singleton);

function component(props) {
  Object.isFrozen(props);
}

class Singleton {
  private static instance: Singleton;

  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}

const s1 = Singleton.getInstance();

console.log(s1);
