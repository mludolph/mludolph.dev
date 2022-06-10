<template>
  <section class="toc">
    <h2 class="text-xl font-semibold mb-2">Content</h2>
    <div id="toc" class="mb-4">
      <ul>
        <li
          v-for="link of toc"
          :key="link.id"
          :class="{ 'ml-2': link.depth === 2, 'ml-4': link.depth === 3 }"
        >
          <NuxtLink :to="`#${link.id}`" class="text-indigo-400 hover:opacity-50">{{
            link.text
          }}</NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: ["toc"],
};
</script>
