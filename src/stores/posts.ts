import { defineStore } from 'pinia'

import { getPost, getPosts } from '@/services/endpoints/posts'

import type { IPost } from '@/types/Post'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    list: [] as IPost[],
    viewPost: {} as IPost
  }),
  actions: {
    async fetchAllPosts() {
      try {
        this.list = await getPosts()
      } catch (error) {
        return error
      }
    },
    async fetchPost(id: number) {
      try {
        this.viewPost = await getPost(id)
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    removePost(id: number) {
      this.list = this.list?.filter((item) => item.id !== id)
    }
  },
  getters: {
    getList(state) {
      return state.list
    },
    getViewPost(state) {
      return state.viewPost
    }
  }
})
