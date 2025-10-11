const input = document.getElementById("input");
const submit = document.getElementById("submit-btn");
const stats = document.getElementById("stats");

const main = () => {
  let text;


  input.addEventListener("onchange", (e) => {
    text = e.target.value;
    console.log(text);
  });
};

main();
