// San Francisco billboards.
// To change a billboard, drop a new image in images/billboards/ and edit this list.
// Any .svg/.png/.jpg works; it is cover-cropped into each billboard slot.
var SF_BILLBOARDS = [
  "images/billboards/golden_gate.jpg",
  "images/billboards/coit_tower.jpg",
  "images/billboards/church.jpg",
  "images/billboards/painted_ladies.jpg",
  "images/billboards/dolores_park.jpg",
  "images/billboards/city_dusk.jpg",
  "images/billboards/cable_car.jpg",
  "images/billboards/palace_of_fine_arts.jpg",
  "images/billboards/soccer_field.jpg"
];

// Color shown in every billboard slot until its photo has loaded.
var BILLBOARD_PLACEHOLDER = "#8a8a8a";

// Hands back (via callback, immediately) a canvas copy of the spritesheet with every billboard slot painted
// plain gray, so the game can start without waiting for any photo. The photos then load in the background and
// are drawn over the gray slots one by one; the canvas is updated in place, so the game picks them up on its own.
function applyBillboards(sheet, callback) {
  var canvas = document.createElement('canvas');
  canvas.width  = sheet.width;
  canvas.height = sheet.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(sheet, 0, 0);

  ctx.fillStyle = BILLBOARD_PLACEHOLDER;
  SPRITES.BILLBOARDS.forEach(function(slot) {
    ctx.clearRect(slot.x, slot.y, slot.w, slot.h);
    ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
  });
  callback(canvas);

  SF_BILLBOARDS.forEach(function(src, n) {
    var img = new Image();
    img.onload = function() {
      SPRITES.BILLBOARDS.forEach(function(slot, i) {
        if (i % SF_BILLBOARDS.length !== n) return; // this photo belongs in slots n, n+9, ...
        var scale = Math.max(slot.w / img.width, slot.h / img.height); // cover-fit
        var sw = slot.w / scale, sh = slot.h / scale;
        ctx.clearRect(slot.x, slot.y, slot.w, slot.h);
        ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, slot.x, slot.y, slot.w, slot.h);
      });
    };
    img.src = src; // a missing file just leaves its slot gray
  });
}
