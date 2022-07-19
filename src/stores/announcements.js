import Vue from 'vue'

import announcementList from '../../content/announcements/announcementList.yaml'
import { removeExtension } from '../files'

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    postsByName: {},
    postsLoaded: 0,
    loadingPosts: false,
    waiters: [],
  }),
  mutations: {
    startLoading(state) {
      state.loadingPosts = true
    },
    registerWaiter(state, { resolve }) {
      state.waiters.push(resolve)
    },
    addEmptyPost(state) {
      state.posts.push(null)
    },
    loadedPost(state, { idx, content, name }) {
      Vue.set(state.posts, idx, content)
      Vue.set(state.postsByName, name, content.post)
    },
    addNamedPost(state, { name, post }) {
      Vue.set(state.postsByName, name, post)
    },
    endLoading(state) {
      state.postsLoaded = state.posts.length
      state.loadingPosts = false
      for (const waiter of state.waiters) {
        waiter()
      }
      state.waiters = []
    },
  },
  actions: {
    async loadPost({ state, commit }, { name }) {
      if (name in state.postsByName) {
        return
      }
      name = removeExtension(name, '.md')

      const post = (await import(/* webpackChunkName: "announcement" */ `../../content/announcements/${name}.md`))
        .default

      commit({ type: 'addNamedPost', name, post: { attributes: post.attributes } })
    },
    async loadPosts({ state, commit }, payload) {
      const maxPosts = announcementList.posts.length
      if (state.posts.length === maxPosts || state.loadingPosts) {
        await new Promise((resolve) => commit({ type: 'registerWaiter', resolve }))
        return
      }

      commit('startLoading')
      const newPostCount = Math.min(state.postsLoaded + (payload?.amount ?? 5), maxPosts)

      while (state.posts.length < newPostCount) {
        commit('addEmptyPost')
      }

      const currentPostsLoaded = state.postsLoaded
      for (const [idx, postObj] of announcementList.posts.slice(currentPostsLoaded, newPostCount).entries()) {
        const name = removeExtension(postObj.file, '.md')
        const post = (await import(/* webpackChunkName: "announcement" */ `../../content/announcements/${name}.md`))
          .default

        commit({
          type: 'loadedPost',
          idx: currentPostsLoaded + idx,
          name,
          content: { post: { attributes: post.attributes }, slug: post.slug ?? name },
        })
      }

      commit('endLoading')

      return state.postsLoaded
    },
  },
}
