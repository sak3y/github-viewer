const input = document.getElementById("input");
const submit = document.getElementById("submit-btn");

const profile = document.getElementById("profile");
const profile_img = document.getElementById("profile-img");
const profile_aside = document.getElementById("profile-aside");
const profile_stats = document.getElementById("profile-stats");
const profile_details = document.getElementById("profile-details");

const error = document.getElementById("error");

let text = ""; // input value

// Utitliy function to create a component
const createElement = (type, parent, content = "Unspecified", options = {}) => {
  const el = document.createElement(type);

  if (type === "img") {
    el.src = options.src || "";
    el.alt = content;
  } else if (type === "a") {
    el.href = options.href || "#";
    if (options.id) el.id = options.id;
  } else {
    el.textContent = content;
  }

  parent.appendChild(el);
  return el;
};

// Create avatar section, image with link
const createAvatar = (parent, html_url, avatar_url) => {
  const link = createElement("a", parent, "", { href: html_url });
  createElement("img", link, "avatar", { src: avatar_url || "/placeholder.png" });
};

// Create details section
const createDetails = (parent, item) => {
  Object.entries(item).forEach(([key, value]) => {
    createElement("p", parent, `${key}: ${value || "Unspecified"}`);
  });
};

const createProfile = (headerData, statsData, detailsData, html_url, avatar_url) => {
  // Clear old profile
  profile_img.innerHTML = "";
  profile_aside.innerHTML = "";
  profile_stats.innerHTML = "";
  profile_details.innerHTML = "";

  createAvatar(profile_img, html_url, avatar_url);
  createDetails(profile_aside, headerData);
  createDetails(profile_stats, statsData);
  createDetails(profile_details, detailsData);
};

// Show profile container
const showProfile = () => {
  if (profile.style.display === "none" || !profile.style.display) {
    profile.style.display = "flex";
  }
};

// Submit handler
const handleSubmit = async () => {
  if (text.trim().length < 1) {
    error.textContent = "Enter a username";
    return;
  }

  showProfile();
  error.textContent = ""; // clear errors
  submit.disabled = true;

  try {
    const res = await fetch(`https://api.github.com/users/${text}`);

    if (!res.ok) {
      error.textContent = "User doesn't exist";
      return;
    }

    const data = await res.json();

    // Destructure items
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
      updated_at,
      html_url,
    } = data;

    const header = { Name: name, User: login, Bio: bio };

    const stats = { Followers: followers, Following: following, Repositories: public_repos };

    const details = {
      "ID": id,
      "Location": location,
      "Company": company,
      "Blog": blog,
      "Last Updated": updated_at ? new Date(updated_at).toLocaleString() : "Unspecified",
    };

    createProfile(header, stats, details, html_url, avatar_url);
  } catch (err) {
    error.textContent = "An error occurred. Please try again.";
    console.error(err);
  } finally {
    submit.disabled = false;
  }
};

// Event listeners
input.addEventListener("keyup", (e) => {
  text = e.target.value;
  if (e.key === "Enter") handleSubmit();
});

submit.addEventListener("click", handleSubmit);
