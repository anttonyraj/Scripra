// Script to generate valid extension icons
const fs = require('fs');
const path = require('path');

// Ensure directory exists
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 1x1 Indigo pixel PNG base64 (acts as a completely valid PNG for Chrome)
// Actually let's create a minimal valid PNG
const indigoPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAQKADAAQAAAABAAAAQAAAAABqlwQ0AAABGElEQVR4Ae3XMQ6CQBAF0BnCYmlNqD2B9gjs7byJNxDeQW1p7TQUGDUkK2wT90kmb0q+/5k3M5sZgR4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4CSBbwD7l27g2/m3/wAAAABJRU5ErkJggg==";

const buffer = Buffer.from(indigoPngBase64, 'base64');
fs.writeFileSync(path.join(iconsDir, 'icon16.png'), buffer);
fs.writeFileSync(path.join(iconsDir, 'icon48.png'), buffer);
fs.writeFileSync(path.join(iconsDir, 'icon128.png'), buffer);
console.log("Extension icons generated successfully.");
