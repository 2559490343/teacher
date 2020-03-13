<template>
  <div v-if="!item.hidden && item.children">
    <template v-if="hasChild(item.children)">
      <el-menu-item :index="item.path">
        <i class="fa" :class="item.meta.icon"></i>
        {{item.meta.title}}
      </el-menu-item>
    </template>

    <el-submenu v-else :index="item.path">
      <template slot="title">
        {{item.meta.title}}
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :item="child"
          :key="child.path"/>
        <el-menu-item v-else :key="child.path" :index="child.path">
          {{child.meta.title}}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasChild(child) {
        if (child.length === 0) return true;

        let len = 0;
        child.forEach(function (item) {
          if (!item.hidden) {
            len += 1;
          }
        });

        if (len === 0) return true;

        return false;
      },
      hasChildPath(child) {
        let path = '';
        child.children.forEach(function (item) {
          if (!item.hidden) {
            path = item.path;
          }
        })
        return path;
      }
    }
  }
</script>
