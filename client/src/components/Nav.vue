<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
    :render-content="rendrContent"></el-tree>
</template>

<script>
import axios from '../axios';

export default {
  name: 'Nav',
  data() {
      return {
        data: [],
        defaultProps: {
          children: 'child',
          label: 'name'
        }
      };
    },
    created() {
      this.getData();
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },

      rendrContent(h, {node}) {
        return (
          <span class="custom-tree-node">
            <span>{ node.label }</span>
            <span>
              <el-button size="mini" type="text">{node.total}</el-button>
            </span>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
