<template>
  <section class="main-section">
    <div class="main-body">
      <h3 class="title">
        ai
      </h3>
      <div class="columns is-multiline">
        <div
          class="column is-one-third"
          v-for="(entry, i) of entries"
          v-bind:key="i"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-2by1">
                <img v-if="entry.img" :src="entry.img" :alt="entry.title" />
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-4">{{ entry.title }}</p>
              <p
                v-if="entry.subtitle"
                class="subtitle is-6 has-text-grey has-text-weight-light"
              >
                {{ entry.subtitle }}
              </p>

              <div class="content">
                <div class="tags are-normal">
                  <span
                    v-for="(tag, i2) in entry.tags"
                    v-bind:key="i2"
                    class="tag"
                    >{{ tag }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ai",
  data() {
    return {
      entries: [
        {
          title: "Statistics Primer",
          subtitle: "Probabilities, Estimation Theory & more",
          tags: ["Statistics"],
        },
        {
          title: "Principal Component Analysis",
          subtitle: "PCA, Online-PCA & Kernel PCA",
          tags: ["Machine Learning", "PCA", "Unsupervised Learning"],
        },
        {
          title: "Independent Component Analysis",
          subtitle: "ICA, InfoMax, FastICA",
          tags: [
            "Machine Learning",
            "Blind Source Seperation",
            "Unsupervised Learning",
          ],
        },
        {
          title: "Stochastic Optimization",
          subtitle: "Simulated Annealing & Mean-Field Annealing",
          tags: ["Machine Learning", "Optimization", "Unsupervised Learning"],
        },
        {
          title: "Clustering",
          subtitle: "K-Means & Pairwise Clustering",
          tags: ["Machine Learning", "Clustering", "Unsupervised Learning"],
        },
        {
          title: "Embeddings",
          subtitle: "Self Organizing Maps, LLE, t-SNE",
          tags: [
            "Machine Learning",
            "Embeddings",
            "Visualization",
            "Unsupervised Learning",
          ],
        },
        {
          title: "Density Estimation",
          subtitle: "KDE, GMMs & EM-Algorithms",
          tags: ["Machine Learning"],
        },
        {
          title: "Hidden Markov Models",
          tags: ["Machine Learning"],
        },
      ],
    };
  },
};
</script>
