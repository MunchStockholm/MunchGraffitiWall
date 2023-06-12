import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import backBtnImg from '../assets/images/back.png';
import Paintings from './Paintings';


function DrawingBoard() {
    const curColor = useRef('black');
    const curBrushSize = useRef(15);
    const lineHistory = useRef([]);
    const currentLine = useRef([]);
    const ctx = useRef(null);
    const brushSizeInput = useRef(null);
    const isInsideCanvas = useRef(false);
    const isDown = useRef(false);
    const canvasX = useRef(0);
    const canvasY = useRef(0);
  
    const BOUNDARY_SIZE = 200; // Adjust this value as per your desired boundary size
  
    const changeColor = (color) => {
      curColor.current = color;
      updateBrushSizeBackground();
    };
  
    const changeBrushSize = (size) => {
      curBrushSize.current = size;
      updateBrushSize();
    };
  
    const updateBrushSize = () => {
      const brushSize = parseInt(brushSizeInput.current.value);
  
      if (curBrushSize.current !== brushSize) {
        brushSizeInput.current.value = curBrushSize.current;
        ctx.current.lineWidth = curBrushSize.current;
        ctx.current.lineCap = 'round';
      }
    };
  
    const updateBrushSizeBackground = () => {
      const sizeBtn5 = document.getElementById('sizeBtn5');
      const sizeBtn25 = document.getElementById('sizeBtn25');
      const sizeBtn40 = document.getElementById('sizeBtn40');
  
      sizeBtn5.style.backgroundColor = curColor.current;
      sizeBtn25.style.backgroundColor = curColor.current;
      sizeBtn40.style.backgroundColor = curColor.current;
    };
  
    useEffect(() => {
      const myCanvas = document.getElementById('myCanvas');
      brushSizeInput.current = document.getElementById('brushSize');
      ctx.current = myCanvas.getContext('2d');
  
      brushSizeInput.current.addEventListener('change', updateBrushSize);
      brushSizeInput.current.addEventListener('input', updateBrushSize);
  
      brushSizeInput.current.value = curBrushSize.current.toString();
      ctx.current.lineWidth = curBrushSize.current;
      ctx.current.lineCap = 'round';
      ctx.current.lineJoin = 'round';
  
      const handleMouseDown = (e) => {
        isDown.current = true;
        ctx.current.beginPath();
        canvasX.current = e.pageX - myCanvas.offsetLeft;
        canvasY.current = e.pageY - myCanvas.offsetTop;
        ctx.current.moveTo(canvasX.current, canvasY.current);
      };
  
      const handleMouseMove = (e) => {
        if (isDown.current) {
          canvasX.current = e.pageX - myCanvas.offsetLeft;
          canvasY.current = e.pageY - myCanvas.offsetTop;
          const lastPoint = currentLine.current[currentLine.current.length - 1];
  
          if (
            !lastPoint ||
            (lastPoint.x !== canvasX.current || lastPoint.y !== canvasY.current)
          ) {
            if (
              canvasX.current >= -BOUNDARY_SIZE &&
              canvasX.current <= myCanvas.width + BOUNDARY_SIZE &&
              canvasY.current >= -BOUNDARY_SIZE &&
              canvasY.current <= myCanvas.height + BOUNDARY_SIZE
            ) {
              ctx.current.lineTo(canvasX.current, canvasY.current);
              ctx.current.strokeStyle = curColor.current;
              ctx.current.lineWidth = curBrushSize.current;
              ctx.current.stroke();
  
              currentLine.current.push({
                x: canvasX.current,
                y: canvasY.current,
                color: curColor.current,
                brushSize: curBrushSize.current,
              });
            } else {
              isDown.current = false;
              if (isInsideCanvas.current) {
                isInsideCanvas.current = false;
                ctx.current.closePath();
                lineHistory.current.push([...currentLine.current]);
                currentLine.current = []; // Clear the current line
              }
            }
          }
        }
      };
  
      const handleMouseLeave = (e) => {
        if (isDown.current && isInsideCanvas.current) {
          isInsideCanvas.current = false;
        }
      };
  
      const handleMouseUp = () => {
        if (isDown.current) {
          isDown.current = false;
          if (isInsideCanvas.current) {
            ctx.current.closePath();
            lineHistory.current.push([...currentLine.current]);
          }
          currentLine.current = []; // Clear the current line
        }
      };
  
      const handleDocumentMouseMove = (e) => {
        if (isDown.current && !isInsideCanvas.current) {
          canvasX.current = e.pageX - myCanvas.offsetLeft;
          canvasY.current = e.pageY - myCanvas.offsetTop;
          const lastPoint = currentLine.current[currentLine.current.length - 1];
  
          if (
            canvasX.current >= -BOUNDARY_SIZE &&
            canvasX.current <= myCanvas.width + BOUNDARY_SIZE &&
            canvasY.current >= -BOUNDARY_SIZE &&
            canvasY.current <= myCanvas.height + BOUNDARY_SIZE
          ) {
            if (
              !lastPoint ||
              (lastPoint.x !== canvasX.current || lastPoint.y !== canvasY.current)
            ) {
              ctx.current.lineTo(canvasX.current, canvasY.current);
              ctx.current.strokeStyle = curColor.current;
              ctx.current.lineWidth = curBrushSize.current;
              ctx.current.stroke();
  
              currentLine.current.push({
                x: canvasX.current,
                y: canvasY.current,
                color: curColor.current,
                brushSize: curBrushSize.current,
              });
            }
          } else {
            isDown.current = false;
            if (isInsideCanvas.current) {
              isInsideCanvas.current = false;
              ctx.current.closePath();
              lineHistory.current.push([...currentLine.current]);
              currentLine.current = []; // Clear the current line
            }
          }
        }
      };
  
      myCanvas.addEventListener('mousedown', handleMouseDown);
      myCanvas.addEventListener('mousemove', handleMouseMove);
      myCanvas.addEventListener('mouseup', handleMouseUp);
      myCanvas.addEventListener('mouseleave', handleMouseLeave);
      myCanvas.addEventListener('mouseenter', () => {
        isInsideCanvas.current = true;
      });
  
      document.addEventListener('mousemove', handleDocumentMouseMove);
  
      return () => {
        myCanvas.removeEventListener('mousedown', handleMouseDown);
        myCanvas.removeEventListener('mousemove', handleMouseMove);
        myCanvas.removeEventListener('mouseup', handleMouseUp);
        myCanvas.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mousemove', handleDocumentMouseMove);
      };
    }, []);
  
    const undoLastLine = () => {
      if (lineHistory.current.length > 0) {
        lineHistory.current.pop();
        redrawCanvas();
      }
    };
  
    const redrawCanvas = () => {
      const myCanvas = document.getElementById('myCanvas');
      const context = myCanvas.getContext('2d');
      context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  
      lineHistory.current.forEach((line) => {
        line.forEach((point, index) => {
          if (index === 0) {
            context.beginPath();
            context.strokeStyle = point.color;
            context.lineWidth = point.brushSize;
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });
  
        context.stroke();
      });
    };
  
    const sendDrawing = () => {
      const myCanvas = document.getElementById('myCanvas');
      const canvasDataUrl = myCanvas.toDataURL('image/png');
      const [, base64Data] = canvasDataUrl.split(',');
  
      const artworkData = {
        ImageBytes: base64Data,
        ImageUrl: '', // Add the appropriate image URL if needed
        IsFeatured: true, // Set the desired value for IsFeatured
      };
  
      fetch('https://graffitiwallserver.onrender.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artworkData),
      })
        .then((response) => {
          console.log('Drawing sent successfully!');
        })
        .catch((error) => {
          console.error('Error sending drawing:', error);
        });
    };
  
  return (
    <div>
      <canvas id="myCanvas" width="900px" height="900px" style={{ backgroundColor: 'white' }}>
        Sorry, your browser doesn't support canvas technology.
      </canvas>

      <div id="sidebar">
      
        <Link to="/">
            <button id="backButton" className="imgBtn">
            <img src={backBtnImg} className="sidebarImg" />
            </button>
        </Link>

        <p>

          <button
            id="sizeBtn5"
            style={{ borderRadius: '50%', height: '30px', width: '30px' }}
            className="sizeBtn"
            onClick={() => changeBrushSize(5)}
          ></button>

          <button
            id="sizeBtn25"
            style={{ borderRadius: '50%', height: '40px', width: '40px' }}
            className="sizeBtn"
            onClick={() => changeBrushSize(25)}
          ></button>

          <button
            id="sizeBtn40"
            style={{ borderRadius: '50%', height: '50px', width: '50px' }}
            className="sizeBtn"
            onClick={() => changeBrushSize(40)}
          ></button>

          <input id="brushSize" type="hidden" value={curBrushSize.current} />

        </p>

        <div id="colorPicker">

          <button
            style={{ backgroundColor: '#ffffff' }}
            className="paletteBtn"
            onClick={() => changeColor('#ffffff')}
          ></button>

          <button
            style={{ backgroundColor: '#1d242d' }}
            className="paletteBtn"
            onClick={() => changeColor('#1d242d')}
          ></button>

          <button
            style={{ backgroundColor: '#bbd3cf' }}
            className="paletteBtn"
            onClick={() => changeColor('#bbd3cf')}
          ></button>

          <button
            style={{ backgroundColor: '#908143' }}
            className="paletteBtn"
            onClick={() => changeColor('#908143')}
          ></button>

          <button
            style={{ backgroundColor: '#bc8173' }}
            className="paletteBtn"
            onClick={() => changeColor('#bc8173')}
          ></button>

          <button
            style={{ backgroundColor: '#d7bfa1' }}
            className="paletteBtn"
            onClick={() => changeColor('#d7bfa1')}
          ></button>
          
          <button
            style={{ backgroundColor: '#b93f35' }}
            className="paletteBtn"
            onClick={() => changeColor('#b93f35')}
          ></button>

          <button
            style={{ backgroundColor: '#714f62' }}
            className="paletteBtn"
            onClick={() => changeColor('#714f62')}
          ></button>

          <button
            style={{ backgroundColor: '#667c80' }}
            className="paletteBtn"
            onClick={() => changeColor('#667c80')}
          ></button>

          <button
            style={{ backgroundColor: '#dcb24e' }}
            className="paletteBtn"
            onClick={() => changeColor('#dcb24e')}
          ></button>

          <button
            style={{ backgroundColor: '#354060' }}
            className="paletteBtn"
            onClick={() => changeColor('#354060')}
          ></button>

          <button
            style={{ backgroundColor: '#d5cdc1' }}
            className="paletteBtn"
            onClick={() => changeColor('#d5cdc1')}
          ></button>

          <button
            style={{ backgroundColor: '#ee9b3e' }}
            className="paletteBtn"
            onClick={() => changeColor('#ee9b3e')}
          ></button>

          <button
            style={{ backgroundColor: '#f7f0c7' }}
            className="paletteBtn"
            onClick={() => changeColor('#f7f0c7')}
          ></button>

        </div>
        <p>

          <button id="undoBtn" className="imgBtn" onClick={undoLastLine}>
            <img src="images\undo.png" className="sidebarImg" />
          </button>
         <Link to="/Paintings">
          <button id="sendBtn" className="imgBtn" onClick={sendDrawing}>
            Send
          </button>
         </Link>
          

        </p>
      </div>
    </div>
  );
}

export default DrawingBoard;