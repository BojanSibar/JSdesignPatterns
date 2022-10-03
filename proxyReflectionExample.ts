const user = {
  name: "Bojan Sibar",
  age: 32,
};

// 3rd party object, logging,
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// Reflection
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
const userProxy = new Proxy(user, {
  get: (target, prop) => {
    console.log("proxy get in action");
    return Reflect.get(target, prop);
    // return target[prop];
  },
  set: (target, prop, value) => {
    console.log("proxy set in action");
    // run validation
    target[prop] = value;
    return true;
  },
});

userProxy.name = "Sheer";

console.log(userProxy.name);
