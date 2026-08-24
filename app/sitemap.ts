import type { MetadataRoute } from 'next'
import { cities, guides } from '@/lib/bolig-data'
export default function sitemap(): MetadataRoute.Sitemap { const base='https://bolig.no'; return [{url:base,priority:1},{url:`${base}/guider`,priority:.7},{url:`${base}/bolig/eksempelgata-12`,priority:.8},...guides.map(g=>({url:`${base}/guider/${g.slug}`,priority:.6})),...cities.map(c=>({url:`${base}/selge-bolig-selv/${c.toLowerCase()}`,priority:.5}))].map(x=>({...x,lastModified:new Date(),changeFrequency:'weekly' as const})) }
