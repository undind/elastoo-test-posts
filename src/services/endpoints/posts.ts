import axiosInstance from '@/services/request'

import type { IPost } from '@/types/Post'

export const getPosts = (): Promise<IPost[]> => {
  return axiosInstance.get('/posts')
}

export const getPost = (id: number): Promise<IPost> => {
  return axiosInstance.get(`/posts/${id}`)
}

export const createPost = (payload: Partial<IPost>) => {
  return axiosInstance.post('posts', payload)
}

export const editPost = (id: number, payload: IPost) => {
  return axiosInstance.put(`/posts/${id}`, payload)
}

export const deletePost = (id: number) => {
  return axiosInstance.delete(`/posts/${id}`)
}
