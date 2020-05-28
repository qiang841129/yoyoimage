<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="clickNav"
          :render-content="renderNav">
        </el-tree>
      </el-aside>
      <div id="detail_main" ref="detail_main">
        <div id="detail_nav" v-if="detail_cnt > 0">
          <el-radio-group
            v-model="detail_list_style"
            size="mini"
            @change="changeStyle">
            <el-radio-button label="小"></el-radio-button>
            <el-radio-button label="中"></el-radio-button>
            <el-radio-button label="大"></el-radio-button>
          </el-radio-group>

          <el-dropdown @command="chgSortType">
            <span class="el-dropdown-link">
              {{ sort_type }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="修改时间">修改时间</el-dropdown-item>
              <el-dropdown-item command="名称">名称</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div id="detail_content" v-if="detail_cnt > 0">
          <div class="header">
            <h2>{{ detail_name }}</h2>
            <span>共 {{ detail_cnt }} 项</span>
          </div>
          <el-row v-for="(row, idx) in detail_imgs" :key="idx" :gutter="20">
            <el-col :span="detail_col_span" v-for="(item, idx) in row" :key="idx">
              <el-image
                fit="cover"
                :src="item"
                :preview-src-list="detail_big_imgs"
                :style="{height: detail_img_height + 'px'}"></el-image>
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
      detail_list_style: '大',

      detail_name: '',
      detail_cnt: 0,
      detail_imgs: [],
      detail_data: null,
      detail_big_imgs: [],
      detail_col_span: 0,
      detail_img_height: 0,

      sort_type: '修改时间'
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    var _this = this;
    window.onresize = function() {
      _this.changeStyle(_this.detail_list_style);
    }
  },
  methods: {
    clickNav(data) {
      this.detail_cnt = data.imgs.length;
      this.detail_name = data.name;
      this.detail_data = data;
      this.setDetailImgs(this.detail_list_style);
    },

    chgSortType(sort_type) {
      this.sort_type = sort_type;
      this.setDetailImgs(this.detail_list_style);
    },

    renderNav(h, {node}) {
      return (
        <span class="custom-tree-node">
          <span>{ node.data.name }</span>
          <span class="tips">{ node.data.total }</span>
        </span>
      );
    },

    changeStyle(style) {
      this.detail_list_style = style;
      this.setDetailImgs(style);
    },

    setDetailImgs(style) {
      this.detail_imgs = [];
      this.detail_big_imgs = [];
      var imgs = this.detail_data.imgs;
      var col_cnt = {'小': 8, '中': 6, '大': 4}[style];
      var row_cnt = Math.ceil(imgs.length / col_cnt);

      // 排序
      if (this.sort_type == '名称') {
        imgs = imgs.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      } else {
        imgs = imgs.sort(function(a, b) {
          return b.mtime - a.mtime;
        })
      }

      this.detail_img_height = parseInt(window.getComputedStyle(this.$refs.detail_main).width) / col_cnt;
      this.detail_col_span = 24 / col_cnt;
      for (var r = 0; r < row_cnt; ++r) {
        var t = [];
        for (var c = 0; c < col_cnt; ++c) {
          var img = imgs[r * col_cnt + c];
          if (img !== undefined) {
            var img_url = '/img/?path=' + this.detail_data.path + '/' + img.name;
            t.push(img_url);
            this.detail_big_imgs.push(img_url);
          } else {
            break;
          }
        }
        if (t.length > 0) {
          this.detail_imgs.push(t);
        } else {
          break;
        }
      }
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
  height: calc(100vh - 28px);
}
#app>.el-container {
  height: 100%;
}
.el-aside {
  border-right: 1px solid #efefef;
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
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
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
#detail_nav .el-dropdown {
  float: right;
}
</style>
