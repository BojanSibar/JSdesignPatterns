// Boilerplate for memento
interface Memento {
  getState(): string;
}

interface Originator {
  save(): Memento;
  restore(memento: Memento): void;
}

class CareTaker {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  backup(): void {
    console.log("I will ask for memento, and keep it privately");
    this.mementos.push(this.originator.save());
  }

  undo(): void {
    if (this.mementos.length === 0) {
      return;
    }
    const memento = this.mementos.pop();
    if (!memento) return;
    this.originator.restore(memento);
  }

  showHistory(): void {
    for (const memento of this.mementos) {
      console.log(memento);
    }
  }
}

// runtime
class TextEditorMemento implements Memento {
  private readonly content: string;
  private lastUpdate: string;

  constructor(content: string) {
    this.content = content;
    this.lastUpdate = new Date().toISOString();
  }

  getState(): string {
    return "";
  }
}

//todo: text editor should support undo
class TextEditor implements Originator {
  private _content: string = "";

  save(): Memento {
    return new TextEditorMemento(this._content);
  }

  restore(memento: Memento): void {
    this._content = memento.getState();
  }

  addContent(newContent: string) {
    this._content += " " + newContent;
  }

  highlight(word: string) {
    this._content = this._content.split(word).join(`<b>${word}</b>`);
  }

  render() {
    console.log(this._content);
  }
}

const editor = new TextEditor();
const editorCareTaker = new CareTaker(editor);

editorCareTaker.backup();
editor.addContent("some content");
editor.render();

editorCareTaker.backup();

editor.addContent("some more content");
editor.render();

editorCareTaker.backup();

editorCareTaker.undo();

editor.highlight("some");
editor.render();

editorCareTaker.backup();
