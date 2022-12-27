function myFunction() {
  var x = document.getElementById("passwrd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}