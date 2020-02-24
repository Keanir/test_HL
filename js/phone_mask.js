// На инпуты для номера телефона применяется шаблон, по которому небходимо ввести номер
// С помощью регулярных выражений проверяются все символы и идет автоматическая подстановка
// таких значений, как +7, () и пробелы. Также следим, чтобы обрабатывались только нужные клавиши
window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call(document.querySelectorAll(".phone__mask"), function(input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault()
      let template = "+7 (___) ___ __ __";
      let  i = 0;
      let  def = template.replace(/\D/g, "");
      let  val = this.value.replace(/\D/g, "");
      let  new_value = template.replace(/[_\d]/g, function(str) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : str
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3)
        new_value = new_value.slice(0, i)
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function(str) {
          return "\\d{1," + str.length + "}"
        })
        .replace(/[+()]/g, "\\$&")
      reg = new RegExp("^" + reg + "$")
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false)
    input.addEventListener("focus", mask, false)
    input.addEventListener("blur", mask, false)
    input.addEventListener("keydown", mask, false)
  });
});
