document.addEventListener('DOMContentLoaded', () => {
    // Create an SVG drawing area and add it to the svgContainer div
    const svgContainer = document.getElementById('svgContainer');
    const svg = Snap(1000, 1000);
    svgContainer.appendChild(svg.node);
  
    // List to store all rectangles
    const rectangles = [];
  
    // Function to create a draggable rectangle
    function createRectangle(length, breadth) {
      // Create a rectangle with specified dimensions and a random position
      const rect = svg.rect(
        50,
        50,
        length,
        breadth
      ).attr({
        fill: 'cornflowerblue',
        stroke: 'blue',
        strokeWidth: 2,
      });
  
      // Add dragging functionality
      makeDraggable(rect);
  
      // Add the rectangle to the list
      rectangles.push(rect);
    }
  
    // Function to make a rectangle draggable
    function makeDraggable(rect) {
      let startX, startY, initialX, initialY;
  
      rect.drag(
        function(dx, dy) {
          // During drag
          this.attr({
            x: initialX + dx,
            y: initialY + dy,
          });
          checkCollisions(this);
        },
        function(x, y) {
          // On drag start
          startX = x;
          startY = y;
          initialX = parseFloat(this.attr('x'));
          initialY = parseFloat(this.attr('y'));
        }
      );
    }
  
    // Function to check for collisions between rectangles
    // Function to check for collisions between the currently dragged rectangle and all others
function checkCollisions(draggedRect) {
    rectangles.forEach(rect => {
      if (rect !== draggedRect) {
        if (isColliding(draggedRect, rect)) {
          rect.attr({ fill: 'red' });
          draggedRect.attr({ fill: 'red' });
        } else {
          rect.attr({ fill: 'cornflowerblue' });
          draggedRect.attr({ fill: 'cornflowerblue' });
        }
      }
    });
  }
  
  
    // Function to detect if two rectangles are colliding
    function isColliding(rect1, rect2) {
      const bbox1 = rect1.getBBox();
      const bbox2 = rect2.getBBox();
  
      return !(
        bbox1.x2 < bbox2.x || 
        bbox1.x > bbox2.x2 || 
        bbox1.y2 < bbox2.y || 
        bbox1.y > bbox2.y2
      );
    }
  
    
  
    // Event listener for the Generate button
    document.getElementById('generateBtn').addEventListener('click', () => {
      const length = parseInt(document.getElementById('length').value, 10);
      const breadth = parseInt(document.getElementById('breadth').value, 10);
  
      if (!isNaN(length) && !isNaN(breadth) && length > 0 && breadth > 0) {
        createRectangle(length, breadth);
      } else {
        alert('Please enter valid length and breadth values.');
      }
    });
  });