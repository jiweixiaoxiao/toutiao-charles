<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        内容 {{ channel.name }}
      </van-tab>
    </van-tabs>
    <!-- 频道列表 -->
    <!--
      通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      通过 animated 属性可以开启切换标签内容时的转场动画
      通过 swipeable 属性可以开启滑动切换标签页
     -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'

export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditShow: true // 控制编辑频道弹出层的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {
    window.home = this
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        // console.log($data.data.message)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .page-nav-bar{
    background-color: #3296fa;
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
  }
}
</style>
