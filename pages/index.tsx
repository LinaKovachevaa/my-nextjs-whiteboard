import React, { useState, useEffect } from 'react';
import Room from '../src/index'; // Assuming your Room component is the default export from 'src/index.tsx'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [rooms, setRooms] = useState<string[]>([]);

  // Initialize rooms from local storage
  useEffect(() => {
    const savedRooms = localStorage.getItem('rooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    }
  }, []);

  const goToRoom = () => {
    // Find the highest existing canvas count
    const canvasRooms = rooms.filter(room => room.startsWith('Canvas'));
    const highestCount = canvasRooms.reduce((acc, room) => {
      const count = parseInt(room.replace('Canvas', ''), 10) || 0;
      return Math.max(acc, count);
    }, 0);
  
    // Generate the new room ID
    const newRoomId = `Canvas${highestCount + 1}`;
    
    // Add the new room to the list of rooms and navigate there
    setRooms(prevRooms => {
      const newRooms = [...prevRooms, newRoomId];
      localStorage.setItem('rooms', JSON.stringify(newRooms));
      return newRooms;
    });
    
    router.push(`/room/${newRoomId}`);
  };
  

  return (
    <main>
      <button onClick={goToRoom}>Create New Room</button>
      
      {/* Dropdown to navigate between rooms */}
      <select onChange={(e) => router.push(`/room/${e.target.value}`)}>
        <option value="" disabled selected>Select a room</option>
        {rooms.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
      </select>

      {/* Render a default room for demonstration */}
      <Room roomId="default-room-id" />
    </main>
  );
}

export async function getStaticProps() {
  // Your existing getStaticProps code
  return { props: {} };
}
