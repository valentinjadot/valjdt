"use client";

import { FormEvent } from "react";

export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/seed", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });

    const { success } = await response.json();

    if (success) {
      alert("Success!");
    }
  }

  return (
    <form onSubmit={onSubmit} className="text-black">
      <input type="text" name="information" className="text-black" />
      <button type="submit">Submit</button>
    </form>
  );
}
