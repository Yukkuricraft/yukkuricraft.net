(async () => {
  (await import('./makeAnnouncementList')).makeAnnouncementList();
  (await import('./makeSitemap')).makeSitemap();
  (await import('./processImages')).processImages();
  (await import('./renderMarkdownContent')).processMarkdownFiles();
})()
