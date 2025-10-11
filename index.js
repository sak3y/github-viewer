const input = document.getElementById("input");
const submit = document.getElementById("submit-btn");
const stats = document.getElementById("stats");
const error = document.getElementById("error");

const main = () => {
  let text;

  const handleSubmit = async () => {
    const username = text;
    let data;

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (!res.ok) {
        console.log(res.status());
        alert("Error, please try again");
        return;
      }

      data = await res.json();

      console.log(data);
    } catch (e) {
      throw Error("Error");
    }
  };

  
  const handleElement = (element) => {
    const el = document.createElement("div");
    
    
  } 

  const handleData = (data) => {
    document.getElementById("avatar") = data.avatar_url;
    document.getElementById("id").innnerHTML = data.id;
    document.getElementById("login").innnerHTML = data.login;
    document.getElementById("location").innnerHTML = data.location;
    document.getElementById("bio").innnerHTML = data.bio;
    document.getElementById("followers").innnerHTML = data.followers;
    document.getElementById("following").innnerHTML = data.following;
    document.getElementById("repos").innnerHTML = data.pubilc_repos;
    document.getElementById("url").innnerHTML = data.html_url;
  };


  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleSubmit();
    text = e.target.value;
  });

  submit.addEventListener("click", handleSubmit);
};

main();
