import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { Lerp, Clamp } from 'helpers/utils';

export default function Screen(props) {
  const [morningActive, setMorningActive] = useState(true);
  const [afternoonActive, setAfternoonActive] = useState(false);
  const [eveningActive, setEveningActive] = useState(false);
  const morningCanvas = useRef(null);
  const morningAnimationFrame = useRef(null);
  const afternoonCanvas = useRef(null);
  const afternoonAnimationFrame = useRef(null);
  const eveningCanvas = useRef(null);
  const eveningAnimationFrame = useRef(null);
  const timeCounter = useRef(0);
  /**
   * Morning animation
   */
  const morning = () => {
    const bgSize = {
      x: morningCanvas.current.width,
      y: morningCanvas.current.height
    }
    // context for canvas
    const ctx = morningCanvas.current.getContext('2d');
    // Base color: 255, 246, 212
    const col = (x, y, r, g, b) => {
      let lerpR, lerpG, lerpB;
      lerpR = Lerp(235, 255, r/255);
      lerpG = Lerp(226, 255, g/255);
      lerpB = Lerp(192, 232, b/255);
      ctx.fillStyle = "rgb(" + lerpR + "," + lerpG + "," + lerpB + ")";
      ctx.fillRect(x, y, 1,1);
    }
    const getRed = (x, y, t) => {
      return( Math.floor(201 + 55*Math.cos( (x*x-y*y)/300 + t )) );
    }
    const getGreen = (x, y, t) => {
      return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
    }
    const getBlue = (x, y, t) => {
      return( Math.floor(183 + 73*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
    }
    let t = 0;
    const run = () => {
      ctx.clearRect(0, 0, bgSize.x, bgSize.y);
      for(let x = 0; x <= bgSize.x; x++) {
        for(let y = 0;y <= bgSize.y; y++) {
          col(x, y, getRed(x, y, t), getGreen(x, y, t), getBlue(x, y, t));
        }
      }
      t += 0.15;
      morningAnimationFrame.current = requestAnimationFrame(run);
    }
    run();
  }
  /**
   * Afternoon animation
   */
  const afternoon = () => {
    const bgSize = {
      x: afternoonCanvas.current.width,
      y: afternoonCanvas.current.height
    }
    // context for canvas
    const ctx = afternoonCanvas.current.getContext('2d');
    // Base color: 144, 252, 249
    const col = (x, y, r, g, b) => {
      let lerpR, lerpG, lerpB;
      lerpR = Lerp(124, 164, r/255);
      lerpG = Lerp(232, 255, g/255);
      lerpB = Lerp(229, 255, b/255);
      ctx.fillStyle = "rgb(" + lerpR + "," + lerpG + "," + lerpB + ")";
      ctx.fillRect(x, y, 1,1);
    }
    const getRed = (x, y, t) => {
      return( Math.floor(201 + 55*Math.cos( (x*x-y*y)/300 + t )) );
    }
    const getGreen = (x, y, t) => {
      return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
    }
    const getBlue = (x, y, t) => {
      return( Math.floor(183 + 73*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
    }
    let t = 0;
    const run = () => {
      ctx.clearRect(0, 0, bgSize.x, bgSize.y);
      for(let x = 0; x <= bgSize.x; x++) {
        for(let y = 0;y <= bgSize.y; y++) {
          col(x, y, getRed(x, y, t), getGreen(x, y, t), getBlue(x, y, t));
        }
      }
      t += 0.15;
      afternoonAnimationFrame.current = requestAnimationFrame(run);
    }
    run();
  }
  /**
   * Evening animation
   */
  const evening = () => {
    const bgSize = {
      x: eveningCanvas.current.width,
      y: eveningCanvas.current.height
    }
    // context for canvas
    const ctx = eveningCanvas.current.getContext('2d');
    // Base color: 46, 49, 148
    const col = (x, y, r, g, b) => {
      let lerpR, lerpG, lerpB;
      lerpR = Lerp(26, 66, r/255);
      lerpG = Lerp(49, 69, g/255);
      lerpB = Lerp(128, 168, b/255);
      ctx.fillStyle = "rgb(" + lerpR + "," + lerpG + "," + lerpB + ")";
      ctx.fillRect(x, y, 1,1);
    }
    const getRed = (x, y, t) => {
      return( Math.floor(201 + 55*Math.cos( (x*x-y*y)/300 + t )) );
    }
    const getGreen = (x, y, t) => {
      return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
    }
    const getBlue = (x, y, t) => {
      return( Math.floor(183 + 73*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
    }
    let t = 0;
    const run = () => {
      ctx.clearRect(0, 0, bgSize.x, bgSize.y);
      for(let x = 0; x <= bgSize.x; x++) {
        for(let y = 0;y <= bgSize.y; y++) {
          col(x, y, getRed(x, y, t), getGreen(x, y, t), getBlue(x, y, t));
        }
      }
      t += 0.15;
      eveningAnimationFrame.current = requestAnimationFrame(run);
    }
    run();
  }
  useEffect(() => {
    morning();
    afternoon();
    evening();
    console.log('what is the time counter', timeCounter.current);
    setInterval(() => {
      timeCounter.current = (timeCounter.current + 1) % 3;
      console.log('about to switch', timeCounter.current);
      switch (timeCounter.current) {
        case 0:
          setEveningActive(false);
          setMorningActive(true);
          break;
        case 1:
          setMorningActive(false);
          setAfternoonActive(true);
          break;
        case 2:
          setAfternoonActive(false);
          setEveningActive(true);
          break;
        default:
          break;
      }
    }, 4000);
  }, []);
  return (
    <>
      <canvas
        ref={morningCanvas}
        className={classnames('Gradient Gradient--morning', {
          active: morningActive
        })}
        width="50"
        height="50"
      ></canvas>
      <canvas
        ref={afternoonCanvas}
        className={classnames('Gradient Gradient--morning', {
          active: afternoonActive
        })}
        width="50"
        height="50"
      ></canvas>
      <canvas
        ref={eveningCanvas}
        className={classnames('Gradient Gradient--morning', {
          active: eveningActive
        })}
        width="50"
        height="50"
      ></canvas>
    </>
  )
}
