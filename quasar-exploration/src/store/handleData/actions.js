/*
export function someAction (context) {
}
*/
import axios from "axios";
export function loadData({commit}){
    return axios
      .get("https://www.reddit.com/r/aww.json?raw_json=1")
      .then(response => {
        let posts = response.data.data.children;
        commit({
          type: 'SET_POSTS',
          posts: posts,
          loading: false
        })
      })
      .catch(() => {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem"
        });
      
      });


  }
