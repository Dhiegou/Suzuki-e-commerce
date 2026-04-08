const urls = [
  'https://suzukimotos.com.br/hayabusa',
  'https://suzukimotos.com.br/v-strom-650xt',
  'https://suzukimotos.com.br/katana',
  'https://suzukimotos.com.br/gsx-r1000r'
];

async function getImages() {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const regex = /https:\/\/suzukimotos\.com\.br\/storage\/images\/uploads\/modelos\/(?:cores\/)?[^\s\"']+\.png/g;
      const matches = [...new Set(text.match(regex) || [])];
      console.log(`\nURL: ${url}`);
      console.log(matches.slice(0, 3).join('\n'));
    } catch(e) {
      console.error('Error fetching', url);
    }
  }
}
getImages();
