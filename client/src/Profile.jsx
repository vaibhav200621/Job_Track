
import { useEffect, useState } from "react";

const defaultProfile = {
  name: "",
  email: "",
  goal: "",
};

function Profile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("jobtrack-profile");

    return savedProfile
      ? { ...defaultProfile, ...JSON.parse(savedProfile) }
      : defaultProfile;
  });

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "jobtrack-profile",
      JSON.stringify(profile)
    );
  }, [profile]);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));

    setSavedMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      "jobtrack-profile",
      JSON.stringify(profile)
    );

    setSavedMessage("Profile saved successfully!");
  }

  return (
    <section className="profile-page">
      <header className="page-header">
        <h1>My Profile</h1>
        <p>Manage your personal and career information.</p>
      </header>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-avatar">
          {profile.name.trim()
            ? profile.name.trim().charAt(0).toUpperCase()
            : "?"}
        </div>

        <div className="profile-field">
          <label htmlFor="profile-name">Full Name</label>
          <input
            id="profile-name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-field">
          <label htmlFor="profile-email">Email Address</label>
          <input
            id="profile-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-field">
          <label htmlFor="profile-goal">Career Goal</label>
          <textarea
            id="profile-goal"
            name="goal"
            placeholder="Example: Become a Full Stack Developer"
            value={profile.goal}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <button type="submit" className="profile-save-button">
          Save Profile
        </button>

        {savedMessage && (
          <p className="profile-success" role="status">
            {savedMessage}
          </p>
        )}
      </form>
    </section>
  );
}

export default Profile;