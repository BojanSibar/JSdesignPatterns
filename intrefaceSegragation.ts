interface OnInit {
  onInit();
}
// interface is just temp typescript thing
// it doesn't go into bundle, after compilation
// typescript reject it
// USE CLASSES INSTEAD INTERFACES - from typescript
interface onDestroy {
  onDestroy();
}

interface LifeCycle {
  onInit();
  onDestroy();
  onRender();
  onChanges();
}

class UiComponent implements onDestroy {
  onDestroy() {
    // run this code when this component is destroyed
  }
}

new UiComponent();
