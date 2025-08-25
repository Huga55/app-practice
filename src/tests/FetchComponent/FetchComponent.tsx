import { useState } from "react";

export const FetchComponent = () => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const formData = new FormData(form);

    const result = await fetch("/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const data = await result.json();

    if (data.message === "success") {
      setMessage("Success");
      return;
    }

    if (data.message === "error") {
      setMessage("Error");
      return;
    }

    setMessage("Unknown error");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" placeholder="Login" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Submit</button>
      {message && <div data-testid="message">{message}</div>}
    </form>
  );
};
