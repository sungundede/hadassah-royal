import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Account = () => {
  const { user, authFetch, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }
    setName(user?.name || "");
  }, [user, loading, navigate]);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage("");

    try {
      const updated = await authFetch(`/users/${user.id}`, {
        method: "PATCH",
        body: { name },
      });
      setName(updated.name || "");
      setMessage("Account updated successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to update account.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Account</h1>
        <p>Manage your profile and saved details.</p>

        <div className="account-summary">
          <strong>Email</strong>
          <span>{user.email}</span>
        </div>

        <form onSubmit={handleSave} className="auth-form">
          <label className="form-field">
            Display Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-input"
            />
          </label>

          <button className="form-button" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {message && <div className="auth-help">{message}</div>}
      </section>
    </main>
  );
};

export default Account;
