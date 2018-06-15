'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var SHADOW_X = CLOUD_X + CLOUD_GAP;
var SHADOW_Y = CLOUD_Y + CLOUD_GAP;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var CLOUD_COLOR = '#ffffff';
var BORDER_COLOR = '#000000';
var TEXT_COLOR = BORDER_COLOR;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var FONT_STYLE = '16px PT Mono';
var LINE_HEIGHT = 20;

CanvasRenderingContext2D.prototype.printText = function (text, x, y, fitWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var testWidth = this.measureText(testLine).width;
    if (testWidth > fitWidth && n > 0) {
      this.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  this.fillText(line, x, y);
};

var getMaxElement = function (arr) {
  if (!arr.length) {
    return 'Array is empty!';
  }
  var currentIndex = 0;
  var maxElement = arr[currentIndex];
  for (var i = currentIndex + 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var drawCloud = function (ctx, startX, startY, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.beginPath();
  ctx.moveTo(startX, startY + 50); // 100, 60
  ctx.bezierCurveTo(startX, startY, startX + 50, startY, startX + 50, startY); // 150, 60
  ctx.lineTo(startX + 370, startY); //
  ctx.bezierCurveTo(startX + 370, startY, startX + 420, startY, startX + 420, startY + 50);
  ctx.lineTo(startX + 420, startY + 220);
  ctx.bezierCurveTo(startX + 420, startY + 270, startX + 370, startY + 270, startX + 370, startY + 270);
  ctx.lineTo(startX + 50, startY + 270);
  ctx.bezierCurveTo(startX + 50, startY + 270, startX, startY + 270, startX, startY + 220);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx, SHADOW_X, SHADOW_Y, SHADOW_COLOR);
  drawCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_STYLE;
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  var text = 'Ура вы победили! Список результатов:';
  var maxWidth = 200;
  ctx.printText(text, CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + 10, maxWidth, LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var saturationNumber = getRandomNumber(0, 100);
    var barColor = 'hsl(240, ' + saturationNumber + '%, 50%)';
    if (names[i] === 'Вы') {
      barColor = PLAYER_COLOR;
    }
    var currentTime = times[i];
    var currentProportion = currentTime / maxTime;
    var currentHeight = BAR_HEIGHT * currentProportion;
    ctx.textAlign = 'left';
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.floor(currentTime), CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_Y + 20 + LINE_HEIGHT * 2 + (BAR_HEIGHT - currentHeight));
    ctx.fillStyle = barColor;
    ctx.fillRect(CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_Y + 20 + LINE_HEIGHT * 3 + (BAR_HEIGHT - currentHeight), BAR_WIDTH, currentHeight);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], CLOUD_X + BAR_GAP * (i + 1) + BAR_WIDTH * i, CLOUD_HEIGHT - LINE_HEIGHT);
  }
};

