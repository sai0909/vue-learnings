/*
export function someMutation (state) {
}
*/

export function SET_POSTS(state, payload) {
    state.posts = payload.posts;
    state.loading = payload.loading;
  }
