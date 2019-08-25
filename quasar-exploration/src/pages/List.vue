<template>
  <q-page padding>
    <div class="flex flex-center">
      
      <q-list bordered>
        <q-item clickable v-ripple  v-for="post in posts" @click="$emit('list-item-clicked', post.data.title, post.data.thumbnail)"
          :key="post.data.id">
          <q-item-section avatar>
            <q-avatar>
              <img :src="post.data.thumbnail"  />
            </q-avatar>
          </q-item-section>
          <q-item-section>{{post.data.title}}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>

export default {
  
  name: "List",
  props: {
    posts: Array
  },
  watch: {
    posts: function(val, oldVal) {
      console.log("posts", val,'oldVal',oldVal);
    }
  }
};
</script>

<style>
</style>
