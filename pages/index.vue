<template>
  <section class="main-section">
    <div class="main-body">
      <div class="columns">
        <div class="column is-narrow is-vcentered">
          <figure class="d-inline-block">
            <p class="image is-96x96">
              <img
                class="is-rounded"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </p>
          </figure>
        </div>
        <div class="column is-narrow">
          <p class="title is-3">
            Moritz Ludolph
          </p>
          <p class="subtitle is-5 mb-3">
            MSc student @ TU Berlin
          </p>
          <div class="d-inline-block">
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" href="https://twitter.com/mludolph">
                  <span class="icon is-small has-text-dark contact-icon"
                    ><i class="mdi mdi-16px mdi-twitter"></i
                  ></span>
                </a>
                <a class="level-item" href="https://github.com/mludolph">
                  <span class="icon is-small has-text-dark contact-icon"
                    ><i class="mdi mdi-16px mdi-github"></i
                  ></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small has-text-dark contact-icon"
                    ><i class="mdi mdi-16px mdi-linkedin"></i
                  ></span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          Hi, I'm a current MSc student in Computer Science studying at TU
          Berlin.
        </div>
        <div class="column"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Me",
};
</script>
