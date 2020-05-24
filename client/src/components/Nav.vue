<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
    :render-content="rendrContent"></el-tree>
</template>

<script>
export default {
  name: 'Nav',
  data() {
      return {
        data: [{
          label: '一级 1',
          total: 1,
          children: [{
            label: '二级 1-1',
            total: 1,
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          total: 1,
          children: [{
            label: '二级 2-1',
            total: 1,
            children: [{
              total: 1,
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
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
        )
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
