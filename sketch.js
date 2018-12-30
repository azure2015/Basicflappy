var bird;
var pipes = [];

function setup() {
  createCanvas(400, 400);
  bird = new Bird();
  pipes.push(new Pipe());
  
}

function draw() {
  background(20);

  for(var i=pipes.length-1; i>=0; i--) {
      pipes[i].show();
      pipes[i].update(); 
    
      if(pipes[i].hits(bird)) {
        text("hit",20,20); 
      }
      if(pipes[i].offscreen()) {
          pipes.splice(i,1); 
      }
  }
  
  bird.show();
  bird.update();
  
  if(frameCount % 100==0) {
    pipes.push(new Pipe()); 
  }
  
  
}

function keyPressed() {
   if(key === ' ') {
       bird.up();
   }
}

class Bird {
 constructor() {
   this.x = 50;
   this.y = height/2;
   this.r =  8;
   
   this.lift = -8;
   this.gravity = 0.4;
   this.velocity = 0;
 }
  
 show() {
   fill(200);
   ellipse(this.x,this.y,this.r*2);
 }
  
  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;   //friction
    this.y += this.velocity;
    
    //check bottom screen
    if(this.y> height-this.r) {
      this.y = height-this.r;
      this.velocity = 0;
    }
    
    // Check top of screen
    if(this.y < 1 ) {
      this.y = 1; 
    }
  }
    
  up() {
       this.velocity += this.lift;
    }
  
  
}

class Pipe {
    constructor() {
	    this.top = random(height/2);
  	  this.bottom = random(height/2);
      this.x = width;
      this.w = 20;
      this.speed = 3;
      this.highlight = false;
      
    }
  
    show()  {
      fill(255);
      if(this.highlight) {
          fill(220,60,60); 
      }
      rect(this.x,0,this.w,this.top);
      rect(this.x,height-this.bottom,this.w, this.bottom);
    }
  
   update() {
      this.x -= this.speed; 
     
   }
  
  offscreen() {
      if(this.x< -this.w) {
        return true;  
      } else {
        return false; 
      }
  }
  
   hits(bird) {
      this.highlight = false;
   		if(bird.y < this.top || bird.y > height - this.bottom) {
        if(bird.x > this.x && bird.x <this.x + this.w) {
           this.highlight= true;
           return true; 
        }
      }
     return false;
  }
  
  
  
}
