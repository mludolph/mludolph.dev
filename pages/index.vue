<template>
  <div v-fragment>
    <section class="container main-container">
      <div class="main-body">
        <div class="columns">
          <div class="column">
            <div class="profile is-flex">
              <div class="image profile-image is-96x96 is-align-self-center">
                <img class="is-rounded" src="images/profile_square.jpg" />
              </div>

              <div class="is-flex is-flex-direction-column">
                <div class="is-size-5">
                  I am
                </div>
                <h1 class="title is-size-3 is-white-space-nowrap">
                  Moritz Ludolph
                </h1>
                <h2 class="subtitle is-size-6 mb-1">
                  M.Sc. student @ TU Berlin
                </h2>
                <social-links></social-links>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container main-container">
      <div class="columns">
        <div class="column is-full">
          <div
            class="post-preview mb-2"
            v-for="(post, i) in posts"
            v-bind:key="i"
          >
            <blog-entry :post="post"></blog-entry>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "blog",
  data() {
    return {};
  },
  async asyncData({ params, $content }) {
    const posts = await $content("posts").fetch();
    return { posts };
  },
};
</script>
<style lang="scss"></style>
