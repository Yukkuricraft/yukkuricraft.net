# Yukkuricraft's Info Page
Can be found at [info.yukkuricraft.net](https://info.yukkuricraft.net)

This is a github hosted page parked on our subdomain.

## Notes
- Do not remove the `dist/CNAME` file. This is necessary to set the Github pages CNAME so we can serve it over info.yc. The rest of the files are built into `dist/` via Github Action workflows using `src/`
- Workflow is defined in `.github/workflows/main.yml`
- Workflow deploys to branch `gh-pages` if commit is pushed to `master`.
- Workflow deploys to branch `gh-pages-dev` if commit is pushed to `dev`.

## How to add an announcement
1. Create a markdown (`.md`) file with a fitting filename in `src/pages/announcements`
2. Write your announcement using normal markdown
3. Add the frontmatter.

   That's the stuff at the top of the file starting and ending with `---` on it's own line.
   Everything between those two lines is 
   [YAML](https://rollout.io/blog/yaml-tutorial-everything-you-need-get-started/). 
   There are 3 required fields. 
   * `title`: The title of your post. Do not include a heading in the announcement itself.
   * `time`: When the post was created. This is an ISO-8601 date. Get the current 
     ISO date [here](https://greenwichmeantime.com/articles/clocks/iso/).
   * `poster`: This is you.
   
   You should also add these fields, but they are not required.
   * `excerpt`: A summary/excerpt of the post that users see before they click on the post itself.
   * **NOT YET IMPLEMENTED** `comments`: If you want to allow comments on the announcements,
     mark this as true. A post will automatically be created on the forums with the content
     of this post. A comment field will appear under the post.
     
   Here is an example of a valid frontmatter:
   ```md
   ---
   title: 'PSA: Addressing a Change in Standards'
   time: '2020-07-17T19:03:00Z'
   poster: Teshno
   excerpt: Our recent internal workings amongst Staff have raised our standards, both for ourselves and for the community.
   ---
   ```

4. Check that the name you wrote in the `poster` field of the frontmatter 
   is also in `src/pages/announcements/posters.yaml` and that the avatar is correct. 
   The avatar can be found in `src/images/avatars`. If it's not present/correct, 
   add/correct it.
6. Add your post's filename to the top of the list found 
   in `src/pages/announcements/announcementList.yaml`. If you want a different slug 
   than the filename for your announcement, specify your desired slug as another field `slug`.
7. Congrats on posting your announcement.
