import { getRandomColor } from "../helpers/helpers";

export const BouncingBalls = () => {
  const canvas = {
    element: document.getElementById("canvas") as BallType,
    width: 800, //600,
    height: 600, //400,
    initialize: function () {
      this.element.style.width = this.width + "px";
      this.element.style.height = this.height + "px";

      document.body.appendChild(this.element);
    },
  };

  const colors = new Array(50).map(() => getRandomColor());
  canvas.element.addEventListener("click", function (e) {
    const xCoordinate = e.x - (window.innerWidth - canvas.width) / 2;
    const yCoordinate = e.y - (window.innerHeight - canvas.height) / 2;
    const randomNumber = Math.floor(Math.random() * 3);
    const selectedColor = colors[randomNumber];

    const dx = Math.floor(Math.random() * 10);
    const dy = Math.floor(Math.random() * 10);

    Ball.create(selectedColor, dx, dy).draw(xCoordinate, yCoordinate);
  });
  interface BallType extends HTMLElement {
    dx: number;
    dy: number;
    width: number;
    height: number;
    element: HTMLElement;
    moveTo: (x: number, y: number) => void;
    changeDirectionIfNecessary: (x: number, y: number) => void;
    draw: (x: number, y: number) => void;
  }
  const Ball = {
    create: function (color: string, dx: number, dy: number) {
      const newBall = Object.create(this);
      newBall.dx = dx;
      newBall.dy = dy;
      newBall.width = 40;
      newBall.height = 40;
      newBall.element = document.createElement("div") as HTMLElement;
      newBall.element.style.backgroundColor = color;
      newBall.element.style.width = newBall.width + "px";
      newBall.element.style.height = newBall.height + "px";
      newBall.element.className += " ball";
      newBall.width = parseInt(newBall.element.style.width);
      newBall.height = parseInt(newBall.element.style.height);
      canvas.element.appendChild(newBall.element);
      return newBall as BallType;
    },
    moveTo: function (this: BallType, x: number, y: number) {
      this.element.style.left = (x + "px") as string;
      this.element.style.top = (y + "px") as string;
    },
    changeDirectionIfNecessary: function (this: BallType, x: number, y: number) {
      if (x < 0 || x > canvas.width - this.width) {
        this.dx = -this.dx;
      }
      if (y < 0 || y > canvas.height - this.height) {
        this.dy = -this.dy;
      }
    },
    draw: function (this: BallType, x: number, y: number) {
      this.moveTo(x, y);
      const ball = this as BallType;
      setTimeout(function (this: BallType) {
        ball.changeDirectionIfNecessary(x, y);
        ball.draw(x + ball.dx, y + ball.dy);
      }, 1000 / 60);
    },
  };

  canvas.initialize();
  return (
    <div style={{ height: "100px" }}>
      <h1>Bouncing Balls</h1>
      <p>Click inside the ball area to add balls</p>
      <div id="canvas"></div>
    </div>
  );
};
