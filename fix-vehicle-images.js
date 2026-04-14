import fs from 'fs';
import https from 'https';

const catalogPath = './src/data/catalog.json';
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

let processed = 0;
let updated = 0;
const failed = [];

function getVehicleImage(slug) {
  return new Promise((resolve) => {
    const url = `https://autosvelacruz.es/coches-segunda-mano-y-ocasion-valdemoro-madrid/${slug}/`;

    const request = https.get(url, { timeout: 15000 }, (res) => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
        // Limit data collection to avoid memory issues
        if (data.length > 2000000) {
          request.abort();
        }
      });

      res.on('end', () => {
        try {
          // Look for any vehicle image from autosvelacruz uploads (excluding logo and generic images)
          // Match pattern: /wp-content/uploads/YYYY/MM/[image-filename]
          const matchImages = data.match(/src="(https:\/\/autosvelacruz\.es\/wp-content\/uploads\/202[0-9]\/[0-9]{2}\/([^"]+?\.(jpg|jpeg|png|webp)))"/g);

          if (matchImages && matchImages.length > 0) {
            for (const match of matchImages) {
              const url = match.replace('src="', '').replace('"', '');
              // Skip the logo and generic placeholder images
              if (!url.includes('Velacruz-Logo') && !url.includes('/0.jpeg') && !url.includes('/0.webp') && !url.includes('/0-scaled')) {
                resolve(url);
                return;
              }
            }
          }

          // Fallback: Try to find any image URL in the page
          const fallbackMatch = data.match(/src="(https:\/\/autosvelacruz\.es\/wp-content\/uploads\/([^"]+?\.(jpg|jpeg|png|webp)))"/);
          if (fallbackMatch && fallbackMatch[1] && !fallbackMatch[1].includes('Velacruz-Logo')) {
            resolve(fallbackMatch[1]);
            return;
          }

          resolve(null);
        } catch (e) {
          console.error(`Error parsing for ${slug}:`, e.message);
          resolve(null);
        }
      });
    }).on('error', (err) => {
      resolve(null);
    }).on('timeout', () => {
      request.abort();
      resolve(null);
    });
  });
}

async function fixAllVehicles() {
  console.log(`Starting to extract images for ${catalog.vehicles.length} vehicles...`);
  console.log('This may take several minutes...\n');

  for (let i = 0; i < catalog.vehicles.length; i++) {
    const vehicle = catalog.vehicles[i];
    const currentImage = vehicle.image;

    // Skip vehicles that already have good images (not logo, not generic 0.jpeg/0.webp)
    const isLogo = currentImage.includes('Velacruz-Logo');
    const isGeneric = currentImage.includes('/0.jpeg') || currentImage.includes('/0-scaled') || currentImage.includes('/0.webp');
    const hasGoodImage = currentImage.includes('/uploads/202') && !isGeneric && !isLogo;

    if (hasGoodImage) {
      console.log(`[${i + 1}/${catalog.vehicles.length}] ✓ ${vehicle.name}`);
      processed++;
      continue;
    }

    console.log(`[${i + 1}/${catalog.vehicles.length}] 🔍 ${vehicle.name}...`);

    try {
      const newImage = await getVehicleImage(vehicle.slug);

      if (newImage && newImage !== currentImage) {
        vehicle.image = newImage;
        const filename = newImage.split('/').pop();
        console.log(`   ✓ ${filename}`);
        updated++;
      } else if (!newImage) {
        console.log(`   ⚠ (keeping current)`);
        failed.push(vehicle.slug);
      }
    } catch (e) {
      console.error(`   ✗ ${e.message}`);
      failed.push(vehicle.slug);
    }

    processed++;

    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Save the updated catalog
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));

  console.log(`\n✅ Done!`);
  console.log(`   Processed: ${processed} vehicles`);
  console.log(`   Updated: ${updated} vehicles`);
  if (failed.length > 0) {
    console.log(`   Failed: ${failed.length} vehicles`);
  }
}

fixAllVehicles().catch(console.error);
