const input = document.getElementById("input");
const submit = document.getElementById("submit-btn"); // btn

const profile = document.getElementById("profile");
const profile_header = document.getElementById("profile-header");
const profile_aside = document.getElementById("profile-aside");
const profile_stats = document.getElementById("profile-stats");
const profile_details = document.getElementById("profile-details");

const error = document.getElementById("error");

let text = ""; // input value

const createElement = (type, parent, content = "Not Specified", options = {}) => {
  const element = document.createElement(type);
  element.textContent = content;

  if (type === "img") {
    element.src = options.src || "";
    element.alt = content;
  }

  if (type === "a") {
    element.href = options.href || "#";
    element.id = options.id || "";
  }

  parent.appendChild(element);
  return element;
};

const createAvatar = (parent, html_url, avatar_url) => {
  const link = createElement("a", parent, "", { href: html_url });
  createElement("img", link, "avatar", { src: avatar_url || "/placeholder.png" });
};

// Create elements from list
const createDetails = (parent, array) => {
  Object.entries(array).forEach(([key, value]) => {
    if (!value) value = "Not specified";
    createElement("p", parent, `${key}: ${value}`);
  });
};

// Instantiate  profile
const createProfile = (header, stats, details, html_url, avatar_url) => {
  createAvatar(profile_header, html_url, avatar_url);
  createDetails(profile_aside, header);
  createDetails(profile_stats, stats);
  createDetails(profile_details, details);
};

// Fetch user and display profile
const handleSubmit = async () => {
  if ((profile.style.display = "none")) profile.style.display = "flex"; // Show profile

  error.innerText = ""; // Reset error state
  submit.disabled = true;

  // Fetch request to GitHub API
  try {
    const res = await fetch(`https://api.github.com/users/${text}`);

    if (!res.ok) {
      error.innerText = "User doesn't exist";
      return;
    }
    const {
      avatar_url,
      id,
      name,
      login,
      company,
      location,
      bio,
      blog,
      followers,
      following,
      public_repos,
      last_updated,
      html_url,
    } = await res.json();

    const header = {
      Name: name,
      User: login,
      Bio: bio,
    };

    const stats = {
      Followers: followers,
      Following: following,
      Repositories: public_repos,
    };

    const details = {
      "ID": id,
      "Location": location,
      "Company": company,
      "Blog": blog,
      "Last Updated": last_updated,
    };

    createProfile(header, stats, details, html_url, avatar_url);

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
