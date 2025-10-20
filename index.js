const input = document.getElementById("input");
const submit = document.getElementById("submit-btn");
const profile = document.getElementById("profile");
const error = document.getElementById("error");

let text = ""; // input value

const createDetail = (type, content, url) => {
  if (!content) return;
  const element = document.createElement(type);
  element.textContent = content || null;
  if (url) {
    if (type === "img") {
      element.src = url;
      element.alt = content;
    } else if (type === "a") {
      element.href = url;
      element.id = "html_url";
    }
  }

  profile.appendChild(element);
};

const createProfile = (details, avatar_url, html_url) => {
  createDetail("img", "avatar", avatar_url); // avatar

  details.forEach((detail) => createDetail("p", detail)); // name, bio, etc

  createDetail("a", "Visit Profile", html_url); // url link
};

const handleSubmit = async () => {
  // Handle empty case
  if (!input.value) {
    error.innerText = "Enter a username";
    return;
  }

  error.innerText = ""; // Reset error state
  submit.disabled = true;

  // Fetch request to GitHub API
  try {
    const res = await fetch(`https://api.github.com/users/${text}`);

    if (!res.ok) {
      error.innerText = "User doesn't exist";
      return;
    }
    const { avatar_url, name, login, location, bio, followers, following, public_repos, html_url } =
      await res.json();

    const details = [name, login, location, bio, followers, following, public_repos]; // Attributes list

    if (profile.children.length > 0) profile.innerHTML = ""; // Clear old profile before displaying new profile

    createProfile(details, avatar_url, html_url);
  } catch (err) {
    throw Error(err);
  } finally {
    submit.disabled = false;
  }
};

// listen for input
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleSubmit();
  text = e.target.value;
});

// Send fetch request
submit.addEventListener("click", () => handleSubmit());
