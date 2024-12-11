<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Welcome to SaaS Questionnaire
        </h1>
        <p class="mt-2 text-center text-xl text-gray-600">
          Shape your SaaS business strategy with our comprehensive questionnaire
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <router-link
          to="/questionnaire"
          class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Questionnaire
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

