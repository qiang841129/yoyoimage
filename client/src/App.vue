<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :render-content="rendrContent">
        </el-tree>
      </el-aside>
      <div id="detail_main">
        <div id="detail_nav">
          <el-radio-group v-model="detail_list_style" disabled size="mini">
            <el-radio-button label="小"></el-radio-button>
            <el-radio-button label="中"></el-radio-button>
            <el-radio-button label="大"></el-radio-button>
            <el-radio-button label="最大"></el-radio-button>
          </el-radio-group>
        </div>
        <div id="detail_content" v-if="detail_cnt > 0">
          <div class="header">
            <h2>{{ detail_name }}</h2>
            <span>共 {{ detail_cnt }} 项</span>
          </div>
          <el-row>
            <el-col :span="6" v-for="item in detail_imgs" :key="item">
              <el-image
                fit="cover"
                :src="item"
                :preview-src-list="detail_imgs"></el-image>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
//import Nav from '@/components/Nav.vue'
import axios from './axios';

export default {
  name: 'App',
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'child',
        label: 'name',
        total: 'total',
      },
      detail_list_style: '最大',

      detail_name: '',
      detail_cnt: 0,
      detail_imgs: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleNodeClick(data) {
      this.detail_cnt = data.imgs.length;
      this.detail_name = data.name;
      this.detail_imgs = [];
      for (var i = 0; i < data.imgs.length; ++i) {
        this.detail_imgs.push('http://localhost:3000/img/?path=' + data.path + '/' + data.imgs[i]);
      }
    },

    rendrContent(h, {node}) {
      return (
        <span class="custom-tree-node">
          <span>{ node.data.name }</span>
          <span class="tips">{ node.data.total }</span>
        </span>
      );
    },

    getData() {
      axios.imageList()
        .then((res) => {
          if (res.data.status == 0) {
            this.data = res.data.imgs;
          }
        });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-node .tips {
  float: right;
}
#detail_main {
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;
}
#detail_nav {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
}
#detail_nav .el-radio-group {
  float: left;
}
#detail_content {
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  margin-top: 4px;
  overflow: hidden;
}
#detail_content .header {
  width: 100%;
  overflow: hidden;
}
#detail_content .header h2 {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  float: left;
  margin: 0;
  padding: 0;
  margin-right: 8px;
  font-weight: 400;
}
#detail_content .header span {
  display: inline-block;
  float: left;
  height: 16px;
  line-height: 16px;
  margin-top: 8px;
  font-size: 12px;
  vertical-align: bottom;
}
.el-col .el-image {
  display: block;
  width: 100%;
  height: 158px;
  overflow: hidden;
}
.el-col .el-image img {
  margin-right: 4px;
  margin-bottom: 4px;
}
</style>
