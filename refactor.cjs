const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');

const components = [
  "AdventuresSection",
  "BrandsMarquee",
  "CartSidebar",
  "ConsorcioSection",
  "Footer",
  "Header",
  "HeroSection",
  "LaunchesSection",
  "ProductGrid",
  "ServicesSection",
  "StatsBar",
  "SuzukiLogo"
];

components.forEach(comp => {
  const compDir = path.join(componentsDir, comp);
  const oldFilePath = path.join(componentsDir, `${comp}.tsx`);
  const newFilePath = path.join(compDir, `${comp}.tsx`);
  const indexFilePath = path.join(compDir, `index.ts`);

  if (fs.existsSync(oldFilePath)) {
    // Create directory
    if (!fs.existsSync(compDir)) {
      fs.mkdirSync(compDir);
    }

    // Read content before moving
    let content = fs.readFileSync(oldFilePath, 'utf-8');

    // Fix imports logic: 
    // '../' becomes '../../' (e.g. '../data/' -> '../../data/')
    // './' becomes '../' (e.g. './SuzukiLogo' -> '../SuzukiLogo')

    // Simple regex for import paths starting with '../' or './'
    content = content.replace(/from\s+['"](\.\.\/.*?)['"]/g, "from '../../$1'".replace('../../..', '../..'));
    content = content.replace(/from\s+['"](\.\/.*?)['"]/g, "from '.$1'".replace('././', '../'));

    // Manual precision for ./ and ../
    const exactSubstitutions = [
      { from: /from '\.\.\//g, to: "from '../../" },
      { from: /from '\.\//g, to: "from '../" },
    ];
    let newContent = fs.readFileSync(oldFilePath, 'utf-8');
    exactSubstitutions.forEach(sub => {
       newContent = newContent.replace(sub.from, sub.to);
    });

    // Write file to new dir
    fs.writeFileSync(newFilePath, newContent);
    // Delete legacy file
    fs.unlinkSync(oldFilePath);

    // Write index.ts
    const indexContent = `export { default } from './${comp}';\n`;
    fs.writeFileSync(indexFilePath, indexContent);
    
    console.log(`Successfully migrated ${comp}`);
  }
});
