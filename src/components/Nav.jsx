import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <section>
      <h1>TenantTrack</h1>
      <Link to="/auth/login"></Link>
    </section>
  );
}
