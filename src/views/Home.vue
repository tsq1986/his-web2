<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <h3>东软云医院HIS系统</h3>
        <el-dropdown>
        <span class="el-dropdown-link">
        ROOT<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item class="hidden-menu">隐藏菜单</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu router>
            <el-submenu :key="index" :index="index+''" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden">
              <template slot="title">{{item.meta.title}}</template>
              <el-menu-item @click="addTab(child.meta.title)" :index="child.path" v-for="(child,i) in item.children" v-if="!child.hidden">{{child.meta.title}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-tabs @tab-click="tabRouter" v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item, index) in editableTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
                    :path="item.path">

            </el-tab-pane>
          </el-tabs>
          <div>
            <h3>欢迎登录东软云HIS医疗系统</h3>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


export default {
  name: 'home',
  data() {
    return {
      editableTabsValue: '0',
      editableTabs: [],
      tabIndex: 0
    }
  },
  methods: {
    tabRouter(data) {
      this.$router.push(data.$attrs.path);
    },
    addTab(title) {
      for (let i in this.editableTabs) {
        if (this.editableTabs[i].title == title) {
          this.editableTabsValue = this.editableTabs[i].name;
          return;
        }
      }
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: title,
        name: newTabName,
        path:this.$route.path
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push(nextTab.path);
            }else{
              this.$router.push('/home');
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);

    }
  }

}
</script>
<style scoped>
  .header {
    color:white;
    background: #409EFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-dropdown-link {
    color:white;
  }
  .hidden-menu {
    color:#409EFF;
  }

</style>
