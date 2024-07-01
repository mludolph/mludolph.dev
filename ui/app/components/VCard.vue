<template>
  <div class="flex flex-col md:flex-row md:w-content items-center">
    <img class="w-32 h-32 mb-4 mr-0 md:mr-4 md:mb-0 select-none rounded-full" src="/images/profile_square.jpg"
      alt="Moritz Ludolph Profile Image" />

    <div class="flex flex-col">
      <div class="text-lg text-gray-800 dark:text-gray-300">Hi! I'm</div>
      <h1 class="
          text-3xl text-gray-800
          dark:text-gray-300
          whitespace-no-wrap
          leading-none
        ">
        Moritz Ludolph
      </h1>
      <h2 class="text-base text-gray-800 dark:text-gray-300 font-sans">
        M.Sc. @ TU Berlin
      </h2>
      <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
        Machine Learning - Software Engineering
      </div>
      <social-links></social-links>
    </div>
  </div>
</template>
