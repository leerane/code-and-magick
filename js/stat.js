'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_X = CLOUD_X + 10;
var SHADOW_Y = CLOUD_Y + 10;
var CLOUD_COLOR = '#ffffff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
};

function drawShape(ctx, startX, startY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY + 50); // 100, 60
  ctx.bezierCurveTo(startX, startY, startX + 50, startY, startX + 50, startY); // 150, 60
  ctx.lineTo(startX + 350, startY); //
  ctx.bezierCurveTo(startX + 350, startY, startX + 420, startY, startX + 420, startY + 50);
  ctx.lineTo(startX + 420, startY + )
  /*ctx.bezierCurveTo(startX + 100, startY + 100, startX + 150, startY + 100, startX + 150, startY + 70);
  ctx.bezierCurveTo(startX + 280, startY + 70, startX + 230, startY + 40, startX + 210, startY + 20);
  ctx.bezierCurveTo(startX + 400, startY - 40, startX + 210, startY - 50, startX + 160, startY - 30);
  ctx.bezierCurveTo(startX + 150, startY - 75, startX + 80, startY - 60, startX + 70, startY - 30);
  ctx.bezierCurveTo(startX + 30, startY - 75, startX - 10, startY - 60, startX, startY);*/
  ctx.closePath();
  ctx.stroke();
};

var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;

ctx.strokeStyle = 'white';
ctx.fillStyle = 'red';
ctx.fillRect(100, 10, 700, 300);
drawShape(ctx, 100, 10);
