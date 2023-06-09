import React, { useState } from 'react';
import DrawingBoard from "../components/DrawingBoard";
import '../styles/DrawPage.css';

function DrawPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DrawingBoard />
    </>
  );
}

export default DrawPage;