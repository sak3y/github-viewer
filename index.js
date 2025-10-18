const input = document.getElementById("input");
const submit = document.getElementById("submit-btn");
const profile = document.getElementById("profile");
const error = document.getElementById("error");

let text = ""; // input value

const createDetail = (name, type, content, url) => {
  const element = document.createElement(type);
  element.name = name;
  element.textContent = content || null;
  if (url) {
    if (type === "img") {
      element.src = url;
      element.alt = "avatar";
    } else if (type === "a") element.href = url;
  }

  profile.appendChild(element);
};

const createProfile = (details, avatar_url, html_url) => {
  createDetail("avatar", "img", undefined, avatar_url); // avatar

  details.forEach((detail) => createDetail(detail.innerText, "p", detail)); // name, bio, etc

  createDetail("profileLink", "a", "Visit Profile", html_url); // url link
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

    const details = [name, login, location, bio, followers, following, public_repos];

    createProfile(details, avatar_url, html_url);
  } catch (err) {
    throw Error(err);
  } finally {
    submit.disabled = false;
  }
};

avatar_url: "https://avatars.githubusercontent.com/u/152389191?v=4";
bio: "Not a vibe-coder";
blog: "https://sheikh-ahm.netlify.app";
company: null;
followers: 1;
followers_url: "https://api.github.com/users/sak3y/followers";
following: 1;
following_url: "https://api.github.com/users/sak3y/following{/other_user}";
html_url: "https://github.com/sak3y";
id: 152389191;
location: "UK";
login: "sak3y";
name: "Sheikh";
organizations_url: "https://api.github.com/users/sak3y/orgs";
public_gists: 0;
public_repos: 21;
site_admin: false;
starred_url: "https://api.github.com/users/sak3y/starred{/owner}{/repo}";
type: "User";
updated_at: "2025-10-02T22:37:20Z";
user_view_type: "public";

// listen for input
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleSubmit();
  text = e.target.value;
});

// Send fetch request
submit.addEventListener("click", () => handleSubmit());
