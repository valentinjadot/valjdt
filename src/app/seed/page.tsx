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
    <form
      onSubmit={onSubmit}
      className="text-black p-11 flex flex-col justify-start gap-11"
      style={{ height: "100vh" }}
    >
      <textarea
        name="information"
        cols={40}
        rows={5}
        className="h-2/6"
      ></textarea>

      <button type="submit" className="bg-white">
        Submit
      </button>
    </form>
  );
}
