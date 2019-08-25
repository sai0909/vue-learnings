<template>
  <q-page padding>
    <q-dialog
      v-model="isOpen"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" @click="checkOpen">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Preview Dialog</div>
        </q-card-section>

        <q-card-section>
          <div class="row justify-center">
            <div class="col col-6">
              <div class="row q-col-gutter-md">
                <div class="col col-md-5">
                  <q-img
                  :src="dialogValues.imageUrl"
                    spinner-color="white"
                    :ratio="1"
                    style="height: 280px; max-width: 300px"
                    placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                  />
                </div>
                <div class="col col-md-7" padding>
                  <p>{{dialogValues.title}}</p>
                </div>
              </div>
            </div>

            <div class="col col-6"></div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    console.log('from dialog',this.isOpen)
    return {
      maximizedToggle: true,
     
    };
  },
  props: ['isOpen','dialogValues'],
  methods:{
    checkOpen : function() {
      console.log('inside checkOpen');
      this.$emit('close-dialog',false)
    }
  },
  watch:{
    isOpen:function(val,oldVal) {
    console.log('prev',val,'next',oldVal ,this.dialogValues)
  }}
};
</script>

<style>
</style>
