import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import fm from 'front-matter'

export function makeAnnouncementList() {
  const announcementListData = glob
    .sync('./content/announcements/**/*.md')
    .map((match) => {
      const relMatch = path.relative('./content/announcements', match)
      const parts = relMatch.split(path.sep)

      const year = parseInt(parts[0])
      const month = parseInt(parts[1])

      if (parts.length !== 3) {
        throw Error(`Unsorted announcement ${match}`)
      }

      if (!year || !month) {
        throw Error(`Wrongly formatted year or month folder for announcement ${match}`)
      }

      if (year < 2020 || year > 2050) {
        throw Error('Year outside accepted range. Either you are a time traveler, or you gave the wrong year')
      }

      if (month <= 0 || month > 12) {
        throw Error('Month outside range 01-12')
      }

      const announcement = fs.readFileSync(match, { encoding: 'utf-8' })
      const data: {
        title?: string
        time?: string
        poster?: string
      } = fm(announcement).attributes

      if (!data.title || !data.time || !data.poster) {
        throw Error(`Missing required frontmatter data for ${match}`)
      }

      const announcementDate = new Date(data.time)

      if (announcementDate.getUTCFullYear() !== year || announcementDate.getUTCMonth() + 1 !== month) {
        throw Error('Date in announcement post and folders do not agree')
      }

      const posixRelMatch = path.posix.join(...parts)

      return { file: posixRelMatch, ...data }
    })
    .sort((a, b) => Date.parse(b.time) - Date.parse(a.time))

  fs.mkdirSync('./generated', { recursive: true })
  fs.writeFileSync('./generated/announcementList.json', JSON.stringify(announcementListData))
}
