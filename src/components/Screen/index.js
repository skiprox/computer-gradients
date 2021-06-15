import { useEffect, useRef } from 'react';
import { Lerp, Clamp } from 'helpers/utils';

export default function Screen(props) {
  const canvasRef = useRef(null);
  const bgAnimationFrame = useRef(null);
  /**
   * Background animation
   */
  const backgroundAnimation = () => {
    const bgSize = {
      x: canvasRef.current.width,
      y: canvasRef.current.height
    }
    // context for canvas
    const ctx = canvasRef.current.getContext('2d');
    // yellow 252, 238, 33
    // orange 243, 106, 39
    // brown 113, 59, 59
    const col = (x, y, r, g, b) => {
      let lerpR, lerpG, lerpB;
      lerpR = Lerp(180, 255, r/255);
      lerpG = Lerp(210, 240, g/255);
      lerpB = Lerp(160, 230, b/255);
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
      t += 0.05;
      bgAnimationFrame.current = requestAnimationFrame(run);
    }
    run();
  }
  useEffect(() => {
    backgroundAnimation();
  }, []);
  return (
    <>
      <canvas ref={canvasRef} className="Gradient" width="25" height="25"></canvas>
    </>
  )
}
