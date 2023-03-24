<template>
  <div class="box">
    <UiSidebar class="m-2">
      <UiSidebarItem to="/home" name="笔记主页" icon="home" />
      <UiSidebarItem to="/profile" name="笔记发布" icon="user" />
      <UiSidebarItem to="/messages" name="消息通知" icon="envelope" />
      <UiSidebarItem to="/public" name="共享笔记" icon="comment" />
      <UiSidebarItem to="/settings" name="个人配置" icon="cogs" />
    </UiSidebar>
  </div>
</template>

<script>
import UiSidebar from "@/components/ui/sidebar/UiSidebar";
import UiSidebarItem from "@/components/ui/sidebar/UiSidebarItem";

export default {
  name: "TheSidebar",
  components: { UiSidebar, UiSidebarItem },
};
</script>
