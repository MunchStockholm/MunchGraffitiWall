import { Link, useNavigate } from 'react-router-dom'; // useNavigate lagt til av Caro
import { useRef, useEffect, useState } from 'react';
import backBtnImg from '../assets/images/back.png';
import undoBtnImg from '../assets/images/undo.png';
// lagt til av Caro
import { useContext } from 'react';
import { ArtworkIdContext } from '../contexts/ArtworkIdContext';
import { Image } from 'canvas';

//import Paintings from './Paintings';

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
  const [isCanvasEmpty, setCanvasEmpty] = useState(true);
  const [isDiscardVisible, setDiscardVisible] = useState(false);

  // lagt til av Caro
  const navigate = useNavigate();
  const [, setArtworkId] = useContext(ArtworkIdContext);
  const [isLoadVisible, setLoadVisible] = useState(false);

  const changeColor = (color) => {
    if (isDown.current) {
      // Finish the current line before changing color
      isDown.current = false;
      ctx.current.closePath();
      lineHistory.current.push([...currentLine.current]);
      currentLine.current = [];
      setCanvasEmpty(lineHistory.current.length === 0);
    }
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
    
      const myDiv = document.getElementById('discardWarn');
      const myDiv2 = document.getElementById('loadContent');
    
      if (myDiv) {
        myDiv.style.display = isDiscardVisible ? 'block' : 'none';
      }

      if (myDiv2) {
        myDiv2.style.display = isLoadVisible ? 'block' : 'none';
      }

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

        if (!lastPoint || (lastPoint.x !== canvasX.current || lastPoint.y !== canvasY.current)) {
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

        setCanvasEmpty(false);
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
        currentLine.current = [];
        setCanvasEmpty(lineHistory.current.length === 0);
      }
    };

    const handleDocumentMouseMove = (e) => {
      if (isDown.current && !isInsideCanvas.current) {
        canvasX.current = e.pageX - myCanvas.offsetLeft;
        canvasY.current = e.pageY - myCanvas.offsetTop;
        const lastPoint = currentLine.current[currentLine.current.length - 1];

        if (!lastPoint || (lastPoint.x !== canvasX.current || lastPoint.y !== canvasY.current)) {
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

        setCanvasEmpty(false);
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

    const handleBeforeUnload = (e) => {
      if (!isCanvasEmpty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      myCanvas.removeEventListener('mousedown', handleMouseDown);
      myCanvas.removeEventListener('mousemove', handleMouseMove);
      myCanvas.removeEventListener('mouseup', handleMouseUp);
      myCanvas.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isCanvasEmpty]);

  const undoLastLine = () => {
    if (lineHistory.current.length > 0) {
      lineHistory.current.pop();
      redrawCanvas();
      setCanvasEmpty(lineHistory.current.length === 0);
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

  const backButton = () => {
    
    if (!isCanvasEmpty) {
      setDiscardVisible(true);
    } else {
      setDiscardVisible(false);
      navigate('/');
    }
  };

  const backButtonNo = () => {
    setDiscardVisible(false);
  }

  const sendDrawing = async () => {
    try {
      setLoadVisible(true);
  
      const myCanvas = document.getElementById('myCanvas');
      const resizedCanvas = document.createElement('canvas');
      const resizedCtx = resizedCanvas.getContext('2d');
  
      const resizeWidth = 300;
      const resizeHeight = 300;
  
      resizedCanvas.width = resizeWidth;
      resizedCanvas.height = resizeHeight;
  
      resizedCtx.drawImage(myCanvas, 0, 0, resizeWidth, resizeHeight);
  
      const canvasDataUrl = resizedCanvas.toDataURL('image/png', 0.1);
      const [, base64Data] = canvasDataUrl.split(',');
  
      const artworkData = {
        ImageBytes: base64Data,
        ImageUrl: '',
        IsFeatured: true,
      };
  
      const response = await fetch('https://graffitiwallserver.onrender.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artworkData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Drawing sent successfully!');
        console.log(data);
        setArtworkId(data.insertedId);
  
        const ctx = myCanvas.getContext('2d');
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        lineHistory.current = []; // Empty the undo history
        setCanvasEmpty(true);
  
        navigate('/souvenir');
      } else {
        throw new Error('Failed to send the drawing');
      }
    } catch (error) {
      console.error('Error sending drawing:', error);
      // Display a popup
      window.alert('Failed to send the drawing. Please try again later.');
    } finally {
      setLoadVisible(false);
    }
  };
  

return (
  <div>
    <canvas id="myCanvas" width="900px" height="900px" style={{ backgroundColor: 'white' }}>
      Sorry, your browser doesn't support canvas technology.
    </canvas>

    <div id="discardContainer">
      <div id="discardWarn" style={{ display: isDiscardVisible ? 'block' : 'none' }}>
        Discard drawing?
          <div className='btn-group'>
            <button className="buttonTheme" onClick={backButtonNo} disabled={isCanvasEmpty}>No</button>
            <Link to="/"><button className="buttonTheme" disabled={isCanvasEmpty}>Yes</button></Link>
        </div>
      </div>
    </div>

    <div id="loadContainer">
      <div id="loadContent" style={{ display: isLoadVisible ? 'block' : 'none' }}>
        Sending drawing...
      </div>
    </div>

    <div>
      <div id="sidebar">
          <button id="backButton" className="imgBtn" onClick={backButton}>
              <img src={backBtnImg} className="sidebarImg" />
          </button>

          <p>
              <button id="sizeBtn5" style={{ borderRadius: '50%', height: '30px', width: '30px' }} className="sizeBtn" onClick={() => changeBrushSize(10)}></button>
              <button id="sizeBtn25" style={{ borderRadius: '50%', height: '40px', width: '40px' }} className="sizeBtn" onClick={() => changeBrushSize(40)}></button>
              <button id="sizeBtn40" style={{ borderRadius: '50%', height: '50px', width: '50px' }} className="sizeBtn" onClick={() => changeBrushSize(80)}></button>
              <input id="brushSize" type="hidden" value={curBrushSize.current} />
          </p>

          <div id="colorPicker">
          <button style={{ backgroundColor: '#ffffff' }} className="paletteBtn" onClick={() => changeColor('#ffffff')}></button>
              <button style={{ backgroundColor: '#1d242d' }} className="paletteBtn" onClick={() => changeColor('#000000')}></button>
              <button style={{ backgroundColor: '#bbd3cf' }} className="paletteBtn" onClick={() => changeColor('#bbd3cf')}></button>
              <button style={{ backgroundColor: '#908143' }} className="paletteBtn" onClick={() => changeColor('#908143')}></button>
              <button style={{ backgroundColor: '#bc8173' }} className="paletteBtn" onClick={() => changeColor('#bc8173')}></button>
              <button style={{ backgroundColor: '#d7bfa1' }} className="paletteBtn" onClick={() => changeColor('#d7bfa1')}></button>
              <button style={{ backgroundColor: '#b93f35' }} className="paletteBtn" onClick={() => changeColor('#b93f35')}></button>
              <button style={{ backgroundColor: '#714f62' }} className="paletteBtn" onClick={() => changeColor('#714f62')}></button>
              <button style={{ backgroundColor: '#667c80' }} className="paletteBtn" onClick={() => changeColor('#667c80')}></button>
              <button style={{ backgroundColor: '#ee9b3e' }} className="paletteBtn" onClick={() => changeColor('#ee9b3e')}></button>
              <button style={{ backgroundColor: '#354060' }} className="paletteBtn" onClick={() => changeColor('#354060')}></button>
              <button style={{ backgroundColor: '#d5cdc1' }} className="paletteBtn" onClick={() => changeColor('#d5cdc1')}></button>
              <button style={{ backgroundColor: '#5b3e31' }} className="paletteBtn" onClick={() => changeColor('#5b3e31')}></button>
              <button style={{ backgroundColor: '#f7f0c7' }} className="paletteBtn" onClick={() => changeColor('#f7f0c7')}></button>
          </div>

          <p>

          <button id="undoBtn" className="imgBtn" onClick={undoLastLine}>
              <img src={undoBtnImg} className="sidebarImg" />
          </button>


          <button id="sendBtn" className="imgBtn" onClick={sendDrawing} disabled={isCanvasEmpty}>
              Send
          </button>
          </p>

      </div>
    </div>
  </div>
);
}

export default DrawingBoard;