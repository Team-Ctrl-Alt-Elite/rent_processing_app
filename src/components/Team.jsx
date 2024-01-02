import React from 'react'

export default function Team({ name, role, imageUrl, bio }) {
  return (
    <>
    <div className="team-member">
      <img src={imageUrl} className="member-photo" />
      <div className="member-info">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p>{bio}</p>
      </div>
    </div>
    </>
  )
}