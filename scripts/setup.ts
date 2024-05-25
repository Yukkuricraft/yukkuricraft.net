import { makeAnnouncementList } from './makeAnnouncementList'
import { makeSitemap } from './makeSitemap'
import { processImages } from './processImages'
import { processMarkdownFiles } from './renderMarkdownContent'

makeAnnouncementList()
makeSitemap()
processImages()
processMarkdownFiles()
