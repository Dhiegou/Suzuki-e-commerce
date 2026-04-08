async function checkVstrom() {
  const res = await fetch('https://suzukimotos.com.br/v-strom-650xt');
  const text = await res.text();
  const imgRegex = /https:\/\/suzukimotos\.com\.br\/[^\s\"'\\]+\.(?:png|webp|jpg)/gi;
  const allImgs = [...new Set(text.match(imgRegex))].filter(u => u.includes('storage') && !u.includes('/icons/'));
  console.log(allImgs.join('\n'));
}
checkVstrom();
