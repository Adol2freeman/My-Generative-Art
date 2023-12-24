var pos = 0
var d = 0.5

var arrayX = 50

var backgroundItems = []

var ingots = []

var texts = ["福如東海", "壽比南山", "青春永駐", "富貴安康", "萬壽無疆", 
            "龍鳳呈祥", "金玉滿堂", "龍馬精神", "龍騰虎躍", "龍年大吉", 
            "龍轉乾坤", "舞龍迎春", "龍鳳呈祥", "龍舞雲川", "龍送吉祥", 
            "飛龍在天", "魚躍龍門"]

//Ingot
var currentTime = 0
var lastTime = 0

function setup() {
  createCanvas(480, 720);
  //createCanvas(windowWidth, windowHeight);

  background("#ed4343");

  findBackgroundItem()

  font = loadFont('Data/Font1.ttf')
}

function draw() {
  background("#ed4343");

  for(let i = 0; i < backgroundItems.length; i++)
  {
    backgroundItems[i].x += backgroundItems[i].direction

    var cur = new backgroundItem(backgroundItems[i].x, backgroundItems[i].y, backgroundItems[i].direction, backgroundItems[i].type, backgroundItems[i].t)
    cur.display()

    if(backgroundItems[i].direction == 1 & backgroundItems[i].x >= width + 200)
    {
      backgroundItems[i].x = 0 - 400
      if(backgroundItems[i].type == 1)
      {
        backgroundItems[i].t = random(texts)
      }
    }

    if(backgroundItems[i].direction == -1 & backgroundItems[i].x <= -200)
    {
      backgroundItems[i].x = width + 400
      if(backgroundItems[i].type == 1)
      {
        backgroundItems[i].t = random(texts)
      }
    }
  }

  push()

  for(let i = 0; i < ingots.length; i++)
  {
    if(ingots[i].y <= height + 50)
    {
      ingots[i].y += 1

      var currentIngot = new ingot(ingots[i].x, ingots[i].y)
      currentIngot.display()
    }
  }

  pop()

  push()
    noStroke()
    fill("#b32221")

    rectMode(CENTER)
    rect(width / 2, 165, 425, 125, 30)
  pop()

  push()

  fill("#ff4a4a")

  textSize(100)
  textStyle(BOLD)
  textAlign(CENTER)
  
  text("新年快樂", width / 2, 200)
  pop()

  curCaishen()
}

function Caishen(x, y, delta)
{
  push()
  rectMode(CENTER)

  translate(x, y)
  noStroke()

  //Body
  push()
    translate(0, -37.5)

    fill("#db1616")
    circle(0, 0, 80)

    push()
      stroke("#ede66d")
      strokeWeight(8)

      line(35, 10, -35, 10)
    pop()

    push()
      fill("#fff674")
      circle(0, 10, 20)
    pop()

    push()
      fill("#db1616")
      rect(0, 10, 10)
    pop()
  pop()

  //Head
  push()
    translate(0, -50 - 37.5)

    fill("#ffd8af")

    circle(0, 0, 60)
    
    //Eyes
    push()
      fill("white")

      ellipse(10, -5, 15, 20)
      ellipse(-10, -5, 15, 20)
      
      //Eyeball
      push() 
        let deltaXX = 0 
        let deltaYY = 0

        if(dist(0, 0, mouseX, mouseY) <= 600)
        {
            deltaXX = map(mouseX, 0, width, -3, 3)
            deltaYY = map(mouseY, 0, height, -4, 4)
        }

        fill("black")

        circle(10 + deltaXX, -9 + deltaYY, 3)
        circle(-10 + deltaXX, -9 + deltaYY, 3)
      pop()

      push()
        stroke("black")
        line(9, -17, 20, -17)
        line(-9, -17, -20, -17)
      pop()
    pop()

    //Mouth
    push()
      translate(0, 17.5)

      stroke("black")
      strokeWeight(2)

      line(10, 0, -10, 0)
    pop()
  pop()

  push()
    translate(0, -30 -50 - 37.5)

    push()
    fill("#c71d1c")
    rect(0, -20, 45, 15)
  pop()
  
  //Hat 
  push()
    push()
    fill("#c71c1c")
    
    beginShape()
      curveVertex(23, -7.5)
      curveVertex(23, 10)
      curveVertex(70, 10)
      curveVertex(65, -15)
    endShape(CLOSE)

    beginShape()
      curveVertex(-23, -7.5)
      curveVertex(-23, 10)
      curveVertex(-70, 10)
      curveVertex(-65, -15)
    endShape(CLOSE)
  pop()

    fill("#db1616")

    angleMode(DEGREES)
    arc(0, -12.5, 57, 17.5, 180, 360)

    rect(0, 0, 57, 25)
  pop()

  push()
    fill("#c71d1c")

    angleMode(DEGREES)
    arc(0, -27.5, 45, 14, 180, 360)
  pop()

  push()
    fill("#fff674")

    circle(55, -2, 12.5)
    circle(-55, -2, 12.5)
  pop()

  push()
    fill("#c71c1c")
    
    rect(55, -2, 5)
    rect(-55, -2, 5)
  pop()

  push()
    fill("#fff674")

    rect(0, 0, 30, 12.5)
  pop()

  //hand
  push()
    translate(0, 65 + delta)

    push()
      fill("#ffd8af")

      circle(35, 0, 30)
      circle(-35, 0, 30)
    pop()

    push()
      translate(0, -15)

      fill(253, 216, 53)

      circle(0, 0, 50)
    pop()

    push()
      translate(-25, -15)

      fill("#FFEE58")

      rotate(30)
      ellipse(0, 0, 90, 35)
    pop()

    push()
      translate(25, -15)

      fill("#FFEE58")

      rotate(-30)
      ellipse(0, 0, 90, 35)
    pop()
  pop()
  pop()
}

function curCaishen()
{
  push()
    translate(width / 2, height * 3.3 / 4)
    scale(2)

    if(pos >= 30)
    {
      d = -0.5
    }
    
    if(pos <= -5)
    {
      d = 0.4
    }

    pos += d

    Caishen(0, 0, pos)
  pop()
}

function findBackgroundItem()
{
  var curY = 0
  for(let y = 0 - 400; y <= height + 400; y += 60)
  {
    let curX = 0

    if(curY % 2 == 0)
    {
      var currentDir = 1
    }
    else
    {
      var currentDir = -1
    }

    for(let x = 0 - 200; x <= width + 200; x += arrayX)
    {
      if(curX % 2 == 0)
        {
          backgroundItems.push(new backgroundItem(x, y, currentDir, 0, ""))
          arrayX = 65
        }
        else
        {
          backgroundItems.push(new backgroundItem(x, y, currentDir, 1, random(texts)))
          arrayX = 200
        }
        curX += 1
    }

    curY += 1
  }
}

class backgroundItem
{
  constructor(x, y, direction, type, t)
  {
    this.x = x
    this.y = y
    this.direction = direction
    this.type = type
    this.t = t
  }

  display()
  {
    switch(this.type)
    {
      case 0:

        push()
          noFill()

          stroke("#d62828")
          strokeWeight(1)

          circle(this.x, this.y, 50)

          push()
            translate(this.x, this.y)
            rotate(45)

            strokeWeight(1.5)

            rectMode(CENTER)
            rect(0, 0, 20)
          pop()
        pop()

        break;
      case 1:
        push()
          fill("#d62828")
          textSize(50)
          textFont(font)
          text(this.t ,this.x - 30, this.y + 10)
        pop()
        break;
    }
  }
}

class ingot
{
  constructor(x, y)
  {
    this.x = x
    this.y = y
  }

  display()
  {
    push()
      translate(this.x, this.y)
      scale(0.5)

      fill("#fff773")
      noStroke()

      angleMode(DEGREES)

      circle(0, -10, 30)

      push()
        translate(10, 0)
        rotate(-30)

        ellipse(0, 0, 50, 30)
      pop()

      push()
        translate(-10, 0)
        rotate(30)

        ellipse(0, 0, 50, 30)
      pop()
    pop()
  }
}

function mouseMoved()
{
  currentTime = millis()

  if(currentTime - lastTime >= 250   & mouseY <= height / 4 & mouseX >= 0 & mouseX <= width)
  {
    ingots.push(new ingot(mouseX, mouseY))
    lastTime = currentTime
  }
}

function mousePressed()
{
  //print(backgroundItems)
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
    print("Get it")
  }
}