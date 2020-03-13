<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        mode="vertical"
        background-color="#E8EAEC"
        text-color="#999999"
        active-text-color="#111111"
        unique-opened
      
      >
        <!-- <sidebar-item v-for="menu in menuList" :key="menu.path" :item="menu" /> -->
        <el-menu-item v-for="(item, index) in menuList" :key="index">
          <router-link :to="item.path"> <i :class="item.meta.icon"></i> {{item.meta.title}}</router-link>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from "./SidebarItem";
export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    menuList: Array
  },
  data() {
    return {
      activePath: ""
    };
  },
  created() {
    // if (this.$route.meta.hid) {
    //   this.activePath = this.$route.matched
    //     ? this.$route.matched[1].path
    //     : this.$route.path;
    // } else {
    //   this.activePath = this.$route.path;
    // }
  },
  watch: {
    // $route(to, from) {
    //   if (to.meta.hid) {
    //     this.activePath = to.matched ? to.matched[1].path : to.path;
    //   } else {
    //     this.activePath = to.path;
    //   }
    // }
  }
};
</script>
<style lang="scss">
.sidebar-container {
  transition: width 0.28s;
  width: 180px !important;
  height: 100%;
  font-size: 0px;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
// .sidebar-container .fa {
//   display: inline-block;
//   width: 14px !important;
//   font-size: 16px;
//   margin-right: 5px;
//   vertical-align: baseline;
// }
 .sidebar-container .horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out,
    0s padding-right ease-in-out;
}
.sidebar-container .el-scrollbar {
  height: 100%;
}
.el-scrollbar .scrollbar-wrapper {
  overflow-x: hidden !important;
}
.sidebar-container .el-scrollbar__view {
  height: 100%;
}
.sidebar-container .el-scrollbar__bar.is-vertical {
  right: 0px;
}
.sidebar-container .is-horizontal {
  display: none;
}
.sidebar-container a {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  color: #909399;
  text-decoration: none;
}
.sidebar-container .el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
.sidebar-container .is-active > .el-submenu__title {
  color: #f4f4f5 !important;
}
.sidebar-container {
  .el-menu-item {
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    
  }
  .router-link-active{
    color: #333;
    i{
      color: #333;
    }
  }
  .router-link-active:after {
    position: absolute;
    content: "";
    width: 4px;
    height: 25px;
    background: #111111;
    right: 0px;
    top: 4px;
    bottom: 0px;
    margin: auto 0;
  }
  // .el-menu-item.is-active {
  //   position: relative;
  // }
  // .el-menu-item.is-active:after {
  //   position: absolute;
  //   content: "";
  //   width: 4px;
  //   height: 25px;
  //   background: #111111;
  //   right: 0px;
  //   top: 0px;
  //   bottom: 0px;
  //   margin: auto 0;
  // }
}
// .el-submenu.is-active .el-submenu__title,
// .el-submenu.is-active .el-submenu__title i {
//   color: #333333 !important;
// }
// .el-menu{
//   border: none;
//   height: 100%;
//   width: 100% !important;
// }
</style>
