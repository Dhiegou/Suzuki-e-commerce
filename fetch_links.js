async function getLinks() {
  const res = await fetch("https://suzukimotos.com.br/");
  const text = await res.text();
  const links = new Set();
  const regex = /href="([^"]+)"/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
      if (m[1].includes('suzuki') || m[1].startsWith('/')) links.add(m[1]);
  }
  console.log([...links].join('\n'));
}
getLinks();
