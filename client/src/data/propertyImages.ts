/**
 * Bundled property images (SCORM-safe).
 *
 * The partner records and Warm Up mini-scenarios reference property images
 * by a short id (e.g. "photo-1566073771259"). Each id maps to a WebP asset
 * bundled under `assets/properties/` - originally sourced from Unsplash,
 * downloaded, compressed and bundled so the self-contained SCORM package
 * makes NO runtime network call. `resolvePropertyImage` is called at every
 * render site that puts a property image in an <img>. There are no CDN
 * URLs anywhere in the app.
 *
 * 25 ids -> 25 images. To add a new property image:
 * download + compress to WebP here, import it, and add its id below.
 */
import p1455587734955 from '../assets/properties/photo-1455587734955.webp';
import p1499793983690 from '../assets/properties/photo-1499793983690.webp';
import p1502672260266 from '../assets/properties/photo-1502672260266.webp';
import p1502920917128 from '../assets/properties/photo-1502920917128.webp';
import p1510414842594 from '../assets/properties/photo-1510414842594.webp';
import p1512917774080 from '../assets/properties/photo-1512917774080.webp';
import p1520250497591 from '../assets/properties/photo-1520250497591.webp';
import p1522708323590 from '../assets/properties/photo-1522708323590.webp';
import p1533105079780 from '../assets/properties/photo-1533105079780.webp';
import p1540541338287 from '../assets/properties/photo-1540541338287.webp';
import p1542314831 from '../assets/properties/photo-1542314831.webp';
import p1542640244 from '../assets/properties/photo-1542640244.webp';
import p1551882547 from '../assets/properties/photo-1551882547.webp';
import p1551918120 from '../assets/properties/photo-1551918120.webp';
import p1560448204 from '../assets/properties/photo-1560448204.webp';
import p1564501049412 from '../assets/properties/photo-1564501049412.webp';
import p1566073771259 from '../assets/properties/photo-1566073771259.webp';
import p1568084680786 from '../assets/properties/photo-1568084680786.webp';
import p1570214476695 from '../assets/properties/photo-1570214476695.webp';
import p1571003123894 from '../assets/properties/photo-1571003123894.webp';
import p1571896349842 from '../assets/properties/photo-1571896349842.webp';
import p1582719508461 from '../assets/properties/photo-1582719508461.webp';
import p1596436889106 from '../assets/properties/photo-1596436889106.webp';
import p1602002418082 from '../assets/properties/photo-1602002418082.webp';
import p1610641818989 from '../assets/properties/photo-1610641818989.webp';

const byId: Record<string, string> = {
  'photo-1455587734955': p1455587734955,
  'photo-1499793983690': p1499793983690,
  'photo-1502672260266': p1502672260266,
  'photo-1502920917128': p1502920917128,
  'photo-1510414842594': p1510414842594,
  'photo-1512917774080': p1512917774080,
  'photo-1520250497591': p1520250497591,
  'photo-1522708323590': p1522708323590,
  'photo-1533105079780': p1533105079780,
  'photo-1540541338287': p1540541338287,
  'photo-1542314831': p1542314831,
  'photo-1542640244': p1542640244,
  'photo-1551882547': p1551882547,
  'photo-1551918120': p1551918120,
  'photo-1560448204': p1560448204,
  'photo-1564501049412': p1564501049412,
  'photo-1566073771259': p1566073771259,
  'photo-1568084680786': p1568084680786,
  'photo-1570214476695': p1570214476695,
  'photo-1571003123894': p1571003123894,
  'photo-1571896349842': p1571896349842,
  'photo-1582719508461': p1582719508461,
  'photo-1596436889106': p1596436889106,
  'photo-1602002418082': p1602002418082,
  'photo-1610641818989': p1610641818989,
};

/** Returns the bundled asset for a property-image id (or passes through an
 *  already-resolved value). */
export function resolvePropertyImage(id?: string): string | undefined {
  if (!id) return id;
  return byId[id] ?? id;
}
