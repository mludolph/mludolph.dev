<template>
  <div class="flex flex-col sm:flex-row sm:w-content items-center">
    <img
      class="w-24 h-24 mb-4 mr-0 sm:mr-4 sm:mb-0 select-none rounded-full"
      src="images/profile_square.jpg"
      alt="Profile Image"
    />

    <div class="flex flex-col">
      <div class="text-lg font-secondary text-gray-800 dark:text-gray-300">
        Hi! I'm
      </div>
      <h1
        class="text-3xl text-gray-800 dark:text-gray-300 font-secondary whitespace-no-wrap leading-none"
      >
        Moritz Ludolph
      </h1>
      <h2 class="text-base text-gray-800 dark:text-gray-300 font-sans">
        M.Sc. student @ TU Berlin
      </h2>
      <div class="text-xs text-gray-600 dark:text-gray-400 font-secondary mb-1">
        Machine Learning - Software Engineering
      </div>
      <social-links></social-links>
    </div>
  </div>
</template>