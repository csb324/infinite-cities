# a small history of javascript OOP / why we love babel

We're using something called Object Oriented Programming, because 
  
  1) it's a good thing to use here, and 
  2) it comes up a lot, in javascript and in other languages. 
  
For a long time, people didn't do object oriented programming in javascript, because it required a lot of very unintuitive overhead.

```
// You do not need to think about this code very much. Just behold its blah-ness. 

function Building(xPosition, yPosition) {
  this.xPosition = xPosition;
  this.yPosition = yPosition;
  this.shape = 'square';
};

Building.prototype.maxHeight = 400; // every building shares this

Building.prototype.draw = function(ctx) {
  ctx.fillRect(this.xPosition, this.yPosition, 40, 40);
};

// Inheritence

function House(xPosition, yPosition, color) {
  Building.call(this, xPosition, yPosition);
  this.color = color;
}

Object.defineProperty(Building.prototype, 'constructor', { 
    value: House, 
    enumerable: false,
    writable: true });    
    
var b = new Building(0, 20);

```

Then, ES2015 came along, and now we can write classes in a more intuitive way! With Babel's help (to convert the code into something that even internet explorer can handle), we can write something like this:

```
class Building {
  constructor(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.shape = 'square';
  }
  
  draw(ctx) {
    ctx.fillRect(this.xPosition, this.yPosition, 40, 40);
  }
}


class House extends Building {
  constructor(xPosition, yPosition, color) {
    super(xPosition, yPosition);
    this.color = color;
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    super(ctx); // super means "do my parent's thing"
  }
}

```
