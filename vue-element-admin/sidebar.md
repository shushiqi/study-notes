## vue-element-admin中的侧边栏菜单
    最近又使用`vue-element-admin`开发了一个后台管理项目，由于是个人独立开发，在项目开发过程中对该项目有了更多了解，也学到了很多东西，这次简单记录下对该项目侧边栏菜单的理解。
- 特点
 如花裤衩大佬本人写的[文章](https://juejin.cn/post/6844903481224986638)中所说的，导航栏最大的特点就是菜单是根据路由表中配置及权限动态生成，这样就省去了写完路由表还要手动写一遍菜单的麻烦事。同时，使用递归组件解决了路由多层嵌套的问题。
- 源码
    - 查看`vue-element-admin`源码
    在这里，`<el-menu>`是`element`导航菜单组件，配置了`element`的一些菜单属性，如`default-active`当前激活菜单的index、`collapse`是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）等，在了`element`[官方文档](https://element.eleme.cn/#/zh-CN/component/menu)中就可以查询到。菜单的重点实现就在封装的`sidebar-item`组件中。
    ```vue
    <!-- index.vue -->
    <template>
        <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
         <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :unique-opened="false"
            :active-text-color="variables.menuActiveText"
            :collapse-transition="false"
            mode="vertical"
        >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
        </el-scrollbar>
        </div>
    </template>
    ```
    - 查看`<sidebar-item>`封装组件
    在这里，item就是传过来的路由信息,`hasOneShowingChild`方法根据路由信息判断是否存在子路由，并将子路由的信息传递给`onlyOneChild`。同时，判断子菜单是否显示，渲染子菜单。
        ```vue
        <template>
            <div v-if="!item.hidden">
            <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
                <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                    <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                        <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
                    </el-menu-item>
                </app-link>
            :base-path="resolvePath(child.path)"
            class="nest-menu"
            />
        </el-submenu>
     </div>
</template>
```