<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:pxlg">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link 
              to="/" 
              class="flex items-center space-x-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              <font-awesome-icon icon="clipboard-check" class="text-indigo-600" />
              <span>SaaS Questionnaire</span>
            </router-link>
          </div>

          <!-- Burger Menu for Small Screens -->
          <div class="flex items-center sm:hidden">
            <button 
              @click="toggleMenu" 
              class="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <svg 
                class="w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16m-7 6h7" 
                />
              </svg>
            </button>
          </div>

          <!-- Menu Items -->
          <div 
            :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}" 
            class="absolute top-16 left-0 w-full bg-white shadow-lg sm:relative sm:top-0 sm:w-auto sm:flex items-center space-x-4"
          >
            <router-link 
              to="/" 
              class="block px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-md transition-colors duration-300 sm:inline-block"
              active-class="text-indigo-600"
            >
              Home
            </router-link>
            <router-link 
              to="/questionnaire" 
              class="block px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-md transition-colors duration-300 sm:inline-block"
              active-class="text-indigo-600"
            >
              Questionnaire
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view v-slot="{ Component }">
        <transition 
          name="page" 
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
