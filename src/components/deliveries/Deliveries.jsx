import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Deliveries = () => {
  const { user, authFetch, loading } = useAuth();
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [eta, setEta] = useState("");
  const [error, setError] = useState("");

  const userId = user?.id;

  const wsUrl = useMemo(() => {
    return `ws://localhost:8000/deliveries/stream`;
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!userId) return;

    const loadDeliveries = async () => {
      try {
        const data = await authFetch(`/deliveries?user_id=${userId}`);
        setDeliveries(data || []);
      } catch (err) {
        setError(err.message || "Unable to load deliveries.");
      }
    };

    loadDeliveries();

    const socket = new WebSocket(wsUrl);
    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.user_id !== userId) return;
        setDeliveries((prev) => {
          const exists = prev.find((item) => item.id === payload.id);
          if (exists) {
            return prev.map((item) => (item.id === payload.id ? payload : item));
          }
          return [payload, ...prev];
        });
      } catch {
        console.error("Failed to parse delivery update:", event.data);
      }
    };

    socket.onerror = () => {
      setError("Real-time tracking connection error.");
    };

    return () => {
      socket.close();
    };
  }, [authFetch, userId, wsUrl]);

  const handleCreate = async (event) => {
    event.preventDefault();
    setError("");
    if (!userId) return;

    try {
      const created = await authFetch("/deliveries", {
        method: "POST",
        body: {
          user_id: userId,
          details,
          current_location: location,
          eta,
        },
      });
      setDeliveries((prev) => [created, ...prev]);
      setDetails("");
      setLocation("");
      setEta("");
    } catch (err) {
      setError(err.message || "Could not create tracking record.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Deliveries</h1>
        <p>Track active orders and watch status updates in real time.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleCreate} className="auth-form">
          <label className="form-field">
            Delivery Details
            <input
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Order items or delivery notes"
              className="form-input"
            />
          </label>

          <label className="form-field">
            Location
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Current location"
              className="form-input"
            />
          </label>

          <label className="form-field">
            ETA
            <input
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              placeholder="Expected delivery time"
              className="form-input"
            />
          </label>

          <button className="form-button" type="submit">
            Create Tracking Record
          </button>
        </form>

        <div className="delivery-grid">
          {deliveries.length === 0 ? (
            <p>No current deliveries. Add one to get real-time updates.</p>
          ) : (
            deliveries.map((delivery) => (
              <article className="delivery-card" key={delivery.id}>
                <h2>#{delivery.id}</h2>
                <p><strong>Status:</strong> {delivery.status}</p>
                <p><strong>Location:</strong> {delivery.current_location || "Not set"}</p>
                <p><strong>ETA:</strong> {delivery.eta || "TBD"}</p>
                <p>{delivery.details || "No notes"}</p>
                <small>Updated: {new Date(delivery.updated_at).toLocaleString()}</small>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Deliveries;
