import { useEffect, useRef } from 'react';

export function SparkEffect({
  selector = '#sparks',
  amount = 3000,
  speed = 0.03,
  lifetime = 250,
  direction = { x: -0.5, y: 1 },
  size = [3, 3],
  maxopacity = 0.8,
  color = '34, 197, 94', // Verde de marca #22c55e
  randColor = false,
  acceleration = [5, 40]
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const OPT = {
      selector,
      amount,
      speed: window.innerWidth < 520 ? 0.02 : speed,
      lifetime,
      direction,
      size,
      maxopacity,
      color: window.innerWidth < 520 ? '34, 197, 94' : color,
      randColor,
      acceleration
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let sparks: any[] = [];

    function setCanvasWidth() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function rand(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Spark(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.age = 0;
      this.acceleration = rand(OPT.acceleration[0], OPT.acceleration[1]);

      if (OPT.randColor) {
        this.color = `${rand(0, 255)},${rand(0, 255)},${rand(0, 255)}`;
      } else {
        // Verde con variación
        const greenVariation = rand(-20, 20);
        this.color = `${34}, ${Math.min(255, 197 + greenVariation)}, ${94 + greenVariation}`;
      }

      this.opacity = OPT.maxopacity - this.age / (OPT.lifetime * rand(1, 10));

      this.go = function () {
        this.x += OPT.speed * OPT.direction.x * this.acceleration / 2;
        this.y += OPT.speed * OPT.direction.y * this.acceleration / 2;
        this.opacity = OPT.maxopacity - ++this.age / OPT.lifetime;
      };
    }

    function addSpark() {
      let x = rand(-200, window.innerWidth + 200);
      let y = rand(-200, window.innerHeight + 200);
      sparks.push(new Spark(x, y));
    }

    function drawSpark(spark: any) {
      let x = spark.x,
        y = spark.y;
      spark.go();
      ctx.beginPath();
      ctx.fillStyle = `rgba(${spark.color}, ${spark.opacity})`;
      ctx.rect(x, y, OPT.size[0], OPT.size[1], 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      sparks.forEach((spark, i, array) => {
        if (spark.opacity <= 0) {
          array.splice(i, 1);
        } else {
          drawSpark(spark);
        }
      });
      window.requestAnimationFrame(draw);
    }

    function init() {
      setCanvasWidth();
      window.setInterval(() => {
        if (sparks.length < OPT.amount) {
          addSpark();
        }
      }, 1000 / OPT.amount);
      window.requestAnimationFrame(draw);
    }

    window.addEventListener('resize', setCanvasWidth);
    init();

    return () => {
      window.removeEventListener('resize', setCanvasWidth);
    };
  }, [selector, amount, speed, lifetime, direction, size, maxopacity, color, randColor, acceleration]);

  return (
    <canvas
      ref={canvasRef}
      id="sparks"
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
