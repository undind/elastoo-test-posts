import type { Store } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { IPost } from '@/types/Post'

export const usePagination = ({ store }: { store: Store<'posts', { list: IPost[] }> }) => {
  const router = useRouter()
  const route = useRoute()

  const page = ref(Number(route.query.page) || 1)

  watch(page, (value) => {
    router.push({ name: 'home', query: { page: value } })
  })

  const perPage = 18

  const paginatedData = computed(() =>
    store.$state.list.slice((page.value - 1) * perPage, page.value * perPage)
  )

  return { paginatedData, perPage, page }
}
