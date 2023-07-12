import neoGensoGeneral from './neo/neo_genso.yaml'
import sdm from './neo/sdm.yaml'
import untroddenValley from './neo/untrodden_valley.yaml'
import youkaiMnt from './neo/youkai_mnt.yaml'
import humanVillage from './neo/human_village.yaml'
import forestMagic from './neo/forest_magic.yaml'

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

export const neoGenso: Locations[] = [neoGensoGeneral, sdm, untroddenValley, youkaiMnt, humanVillage, forestMagic]
