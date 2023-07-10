export interface LocationImage {
  name: string
  title?: string
  description?: string
  image_taken_by?: string
}

export interface Location {
  displayName: string
  menuName: string
  description?: string
  images?: LocationImage[]
  // eslint-disable-next-line no-use-before-define
  sublocations: Locations
}
export type Locations = {[k: string]: Location}


export const neo = {
  neo_genso: () => import('./neo/neo_genso.yaml') as unknown as Promise<{default: Locations}>,
  sdm: () => import('./neo/sdm.yaml') as unknown as Promise<{default: Locations}>,
  untrodden_valley: () => import('./neo/untrodden_valley.yaml') as unknown as Promise<{default: Locations}>,
  youkai_mnt: () => import('./neo/youkai_mnt.yaml') as unknown as Promise<{default: Locations}>,
  human_village: () => import('./neo/human_village.yaml') as unknown as Promise<{default: Locations}>,
  forest_magic: () => import('./neo/forest_magic.yaml') as unknown as Promise<{default: Locations}>,
}

export default [neo.neo_genso, neo.sdm, neo.untrodden_valley, neo.youkai_mnt, neo.human_village, neo.forest_magic]
