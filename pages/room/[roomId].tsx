import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Room from '../../src/index';  // Update this import path as needed

export default function DynamicRoom() {
  const router = useRouter();
  const { roomId } = router.query;
  const [rooms, setRooms] = useState<string[]>([]);

  // Initialize rooms from local storage
  useEffect(() => {
    const savedRooms = localStorage.getItem('rooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    }
  }, []);

  return (
    <main>
      <h1>Welcome to Room: {roomId}</h1>

      {/* Dropdown to navigate between rooms */}
      <select 
        value={roomId === 'home' ? 'home' : roomId}
        onChange={(e) => {
          if (e.target.value === 'home') {
            router.push('/');
          } else {
            router.push(`/room/${e.target.value}`);
          }
        }}
      >
        <option value="home">Home</option>
        <option disabled>----</option>
        {rooms.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
      </select>

      {/* Render the Room component */}
      <Room roomId={roomId as string} />
    </main>
  );
}
