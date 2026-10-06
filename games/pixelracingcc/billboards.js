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

// Returns (via callback) a canvas copy of the spritesheet with every billboard slot
// replaced by one of SF_BILLBOARDS (cycling through the list).
function applyBillboards(sheet, callback) {
  var canvas = document.createElement('canvas');
  canvas.width  = sheet.width;
  canvas.height = sheet.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(sheet, 0, 0);

  var count = SF_BILLBOARDS.length, imgs = [];
  SF_BILLBOARDS.forEach(function(src, n) {
    var img = new Image();
    var done = function() {
      if (--count == 0) {
        SPRITES.BILLBOARDS.forEach(function(slot, i) {
          var pic = imgs[i % imgs.length];
          if (!pic || !pic.width) return;
          var scale = Math.max(slot.w / pic.width, slot.h / pic.height); // cover-fit
          var sw = slot.w / scale, sh = slot.h / scale;
          ctx.clearRect(slot.x, slot.y, slot.w, slot.h);
          ctx.drawImage(pic, (pic.width - sw) / 2, (pic.height - sh) / 2, sw, sh, slot.x, slot.y, slot.w, slot.h);
        });
        callback(canvas);
      }
    };
    img.onload = done;
    img.onerror = done; // a missing file keeps the original billboard
    img.src = src;
    imgs[n] = img;
  });
}
