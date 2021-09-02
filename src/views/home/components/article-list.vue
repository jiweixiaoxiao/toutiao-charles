<template>
<div class="article-list">
  <van-pull-refresh
    v-model="isreFreshLoading"
    :success-text="refreshSuccessText"
    :success-duration="1500"
    @refresh="onRefresh"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
<!--      <article-item
        v-for="(article, index) in list"
        :key="index"
        :article="article"
      />-->
       <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {},
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      console.log('-------------------')
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })

      const { results } = data.data
      this.list.push(...results)
      console.log(this.list)
      this.loading = false
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，将 finished 设置为 true，不再 load 加载更多了
        this.finished = true
      }
    },

    onRefresh () {
      console.log('onRefresh')
    }
  }
}
</script>

<style scoped>

</style>
