import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
interface User {
  name: string;
  age: number;
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent  {

  @ViewChild('gameCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  width = 600;
  height = 400;

  terrain: number[] = [];
  terrainSegmentWidth = 10;
  terrainLength = 1000; // long terrain for scrolling

  terrainScrollX = 0;

  car = {
    x: 100,
    y: 0,
    width: 50,
    height: 25,
    velocity: 0,
    acceleration: 0,
    angle: 0,
    angularVelocity: 0,
    mass: 1.5,
    wheelRadius: 10,
    suspension: 2,
    suspensionVelocity: 0
  };

  gravity = 0.6;
  friction = 0.05;
  maxVelocity = 10;

  accelerating = false;
  braking = false;
  gameOver = false;
  distance = 0;

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.generateTerrain();
    this.car.y = this.getTerrainHeight(0) - this.car.height / 2;
    requestAnimationFrame(() => this.gameLoop());
  }

  generateTerrain() {
    this.terrain = [];
    let height = this.height - 100;
    let smoothing = 0;
    for (let i = 0; i < this.terrainLength; i++) {
      smoothing += (Math.random() - 0.5) * 2;
      smoothing = Math.max(-10, Math.min(10, smoothing));
      height += smoothing;
      height = Math.max(this.height / 2, Math.min(this.height - 50, height));
      this.terrain.push(height);
    }
  }

  getTerrainHeight(index: number): number {
    if (index < 0) return this.height - 100;
    if (index >= this.terrain.length) return this.height - 100;
    // Smooth interpolation for realistic ground height
    const baseIndex = Math.floor(index);
    const t = index - baseIndex;
    const h1 = this.terrain[baseIndex];
    const h2 = this.terrain[baseIndex + 1] || h1;
    // Cubic interpolation could be added here, but linear interpolation for simplicity
    return h1 * (1 - t) + h2 * t;
  }

  gameLoop() {
    if (this.gameOver) return;

    this.updatePhysics();
    this.render();

    requestAnimationFrame(() => this.gameLoop());
  }

  updatePhysics() {
    // Acceleration control
    if (this.accelerating) {
      this.car.acceleration = 0.3;
    } else if (this.braking) {
      this.car.acceleration = -0.4;
    } else {
      this.car.acceleration = -this.friction;
    }

    // Update velocity with limits
    this.car.velocity += this.car.acceleration;
    this.car.velocity = Math.min(this.maxVelocity, Math.max(-5, this.car.velocity));

    // Calculate horizontal movement from velocity
    this.terrainScrollX += this.car.velocity;
    this.distance = this.terrainScrollX;

    // Determine terrain slope around car position
    const idx = this.terrainScrollX / this.terrainSegmentWidth;
    const h1 = this.getTerrainHeight(idx);
    const h2 = this.getTerrainHeight(idx + 1);
    const slope = (h2 - h1) / this.terrainSegmentWidth;

    // Calculate ideal car vertical position based on terrain altitude
    const remainder = idx % 1;
    const terrainHeightAtCar = h1 + slope * remainder;

    // Suspension simulation (simplified)
    const targetY = terrainHeightAtCar - this.car.height / 2;
    const springForce = (targetY - this.car.y) * 0.1;
    const dampingForce = this.car.suspensionVelocity * 0.8;
    const accelerationY = springForce - dampingForce - this.gravity * slope * this.car.mass;

    this.car.suspensionVelocity += accelerationY;
    this.car.suspensionVelocity *= 0.8; // damping
    this.car.y += this.car.suspensionVelocity;

    // Update car angle smoothly to match terrain slope
    const targetAngle = Math.atan(slope);
    this.car.angle += (targetAngle - this.car.angle) * 0.1;

    // Gravity effect pushing car backward on slope if not accelerating
    if (!this.accelerating) {
      this.car.velocity -= slope * 0.2;
    }

    // End game if flipped or fallen off screen
    if (this.car.angle > Math.PI / 2 || this.car.angle < -Math.PI / 2 || this.car.y > this.height) {
      this.gameOver = true;
    }
  }

  render() {
    // Clear canvas and draw background sky
    this.ctx.fillStyle = '#87CEEB';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw terrain with a green layer on top for grass
    this.ctx.fillStyle = '#654321';
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height);
    const pointsToDraw = this.width / this.terrainSegmentWidth;
    for (let i = 0; i <= pointsToDraw; i++) {
      const terrainX = this.terrainScrollX / this.terrainSegmentWidth + i;
      const y = this.getTerrainHeight(terrainX);
      this.ctx.lineTo(i * this.terrainSegmentWidth, y);
    }
    this.ctx.lineTo(this.width, this.height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = '#228B22';
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height);
    for (let i = 0; i <= pointsToDraw; i++) {
      const terrainX = this.terrainScrollX / this.terrainSegmentWidth + i;
      const y = this.getTerrainHeight(terrainX);
      this.ctx.lineTo(i * this.terrainSegmentWidth, y - 5);
    }
    this.ctx.lineTo(this.width, this.height);
    this.ctx.closePath();
    this.ctx.fill();

    // Draw car with tilt
    this.ctx.save();
    this.ctx.translate(this.car.x, this.car.y);
    this.ctx.rotate(this.car.angle);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(-this.car.width / 2, -this.car.height / 2, this.car.width, this.car.height);

    // Draw wheels (simple black circles)
    const wheelOffsetX = this.car.width / 3;
    const wheelOffsetY = this.car.height / 2;
    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(-wheelOffsetX, wheelOffsetY, this.car.wheelRadius, 0, 2 * Math.PI);
    this.ctx.arc(wheelOffsetX, wheelOffsetY, this.car.wheelRadius, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.restore();

    // Draw distance display
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Distance: ${this.distance.toFixed(0)} m`, 10, 30);

    // Show game over
    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over!', this.width / 2, this.height / 2);
      this.ctx.textAlign = 'start';
    }
  }

  accelerate() {
    this.accelerating = true;
  }

  stopAccelerate() {
    this.accelerating = false;
  }

  brake() {
    this.braking = true;
  }

  stopBrake() {
    this.braking = false;
  }
// getUsers(): Promise<User[]> {
//   debugger
//   return fetch('https://api.example.com/users')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => data as User[]);
// }

}
