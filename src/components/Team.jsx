import React, { useState } from 'react';

export default function Team({ name, role, imageUrl, bio }) {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = () => {
    setSelectedMember({ name, role, bio });
  };

  const handleMouseLeave = () => {
    setSelectedMember(null);
  };

  return (
    <div className="team-member" onClick={handleMemberClick} onMouseLeave={handleMouseLeave}>
      <img src={imageUrl} className="member-photo" alt={name} />
      <div className="member-info">
        <h3>{name}</h3>
        {selectedMember?.name === name && (
          <div className="popover">
            <p className="role">{role}</p>
            <p>{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
