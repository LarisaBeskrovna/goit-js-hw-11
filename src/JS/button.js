export default class Button {
    static classes = {
      hidden: "hidden",
    };
  
    constructor({ selector, isHidden = false }) {
      this.button = this.getButton(selector);
      isHidden && this.hide();
    }
  
    getButton(selector) {
      return document.querySelector(selector);
    }
  
    hide() {
      this.button.classList.add(Button.classes.hidden);
    }
  
    show() {
      this.button.classList.remove(Button.classes.hidden);
    }
  
    disable() {
      this.button.disabled = true;
      this.button.textContent = "Loading...";
    }
  
    enable() {
      this.button.disabled = false;
      this.button.textContent = "Load more";
    }
  
    }