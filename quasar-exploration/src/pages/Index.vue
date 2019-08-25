  <template>
  <q-page padding>
    <List :posts="handleData.posts" @list-item-clicked="(image, title) => openDialog(image, title)" />
    <Dialog :isOpen=showDialog :dialogValues=dialogValues @close-dialog="updateDialog"/>
  </q-page>
</template>

  <style></style>

  <script>
import { mapState } from "vuex";
import List from "./list.vue";
import Dialog from "./Dialog.vue";

export default {
  name: "PageIndex",
  components: {
    List,
    Dialog
  },

  // computed: {
  //   posts: function() {
  //     console.log("State is", this.$store.state);
  //     return this.$store.state.handleData.posts
  //   }
  // },
  data: function () {
    return {
      showDialog: false,
      dialogValues:{
        title:"",
        imageUrl:""
      }
    }    
  },
  computed:{ ...mapState(["handleData"])},
  watch: {
    posts: function(prev, next) {
      console.log("Inside index posts is", next); 
    }
  },
  mounted() {
    this.$store.dispatch("handleData/loadData");
  },
  methods: {
    openDialog(title,image) {
      
      this.dialogValues.imageUrl = image;
      this.dialogValues.title = title;
      this.showDialog = !this.showDialog;
      console.log('show dialog',this.showDialog)
      
    },
    updateDialog($event){
      console.log('event emitted',$event);
      this.showDialog = $event;
    }
  }
};
</script>
