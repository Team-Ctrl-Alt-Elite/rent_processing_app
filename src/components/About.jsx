import React from "react";
import TeamMember from "./Team";
import "../styles/about.css";

export default function About() {
  const teamMembersData = [
    {
      name: "Tiffany McNerlin",
      role: "Frontend Developer",
      imageUrl: "/img/tiff.jpg",
      bio: "",
    },
    {
      name: "Kavish Desai",
      role: "Backend Developer",
      imageUrl: "/img/kavish.png",
      bio: "",
    },
    {
      name: "Bhargavi Katta",
      role: "Backend Developer",
      imageUrl: "/img/bhargavi.png",
      bio: "",
    },
    {
      name: "David Chiu",
      role: "Frontend Developer",
      imageUrl: "/img/david.png",
      bio: "",
    },
  ];

  return (
    <>
      <div className="about-background">
        <div className="about-team">
          <h1>Our Team</h1>
          <div className="team-members">
            {teamMembersData.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
