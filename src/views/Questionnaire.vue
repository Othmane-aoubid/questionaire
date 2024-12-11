<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
          SaaS Business Questionnaire
        </h1>
        <p class="text-lg text-gray-600">
          Answer these key questions to shape your SaaS business strategy
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="store.error"
        class="bg-red-50 border-l-4 border-red-400 p-4 mb-8"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <font-awesome-icon
              icon="exclamation-circle"
              class="h-5 w-5 text-red-400"
            />
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              {{ store.error }}
            </p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-else class="space-y-8">
        <div
          v-for="section in store.sections"
          :key="section.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
        >
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h2 class="text-2xl font-bold text-white">{{ section.title }}</h2>
          </div>

          <div class="p-6 space-y-6">
            <div
              v-for="question in section.questions"
              :key="question.id"
              class="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:bg-gray-100"
            >
              <div class="flex flex-col space-y-4">
                <p class="text-lg font-medium text-gray-900">
                  {{ question.text }}
                </p>
                <div
                  class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0"
                >
                  <input
                    v-model="question.answer"
                    @input="
                      updateQuestion(section.id, question.id, {
                        answer: question.answer,
                      })
                    "
                    type="text"
                    class="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    :placeholder="'Your answer for ' + question.text"
                  />
                  <div class="flex items-center space-x-2">
                    <button
                      @click="
                        updateQuestionStatus(section.id, question.id, 'good')
                      "
                      :class="[
                        'p-2 rounded-full transition-all duration-300',
                        question.status === 'good'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-green-100',
                      ]"
                    >
                      <font-awesome-icon icon="check" />
                    </button>
                    <button
                      @click="
                        updateQuestionStatus(section.id, question.id, 'bad')
                      "
                      :class="[
                        'p-2 rounded-full transition-all duration-300',
                        question.status === 'bad'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-red-100',
                      ]"
                    >
                      <font-awesome-icon icon="times" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8">
          <button
            @click="addSection"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transition-all duration-300"
          >
            <font-awesome-icon icon="plus" class="mr-2" />
            Add New Section
          </button>
          <button
            @click="submitQuestionnaire"
            class="inline-flex items-center ml-5 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transition-all duration-300"
          >
            <font-awesome-icon icon="save" class="mr-2" />
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useQuestionnaireStore } from "../stores/questionnaire";

export default {
  name: "Questionnaire",
  setup() {
    const store = useQuestionnaireStore();

    onMounted(async () => {
      await store.initializeStore();
    });

    const updateQuestionStatus = async (sectionId, questionId, status) => {
      const section = store.sections.find((s) => s.id === sectionId);
      if (section) {
        const question = section.questions.find((q) => q.id === questionId);
        if (question) {
          const newStatus = question.status === status ? null : status;
          await store.updateQuestion(sectionId, questionId, {
            status: newStatus,
          });
        }
      }
    };

    const updateQuestion = async (sectionId, questionId, updates) => {
      await store.updateQuestion(sectionId, questionId, updates);
    };

    const addSection = () => {
      const title = prompt("Enter section title:");
      if (title) {
        store.addSection(title);
      }
    };

    const submitQuestionnaire = async () => {
      try {
        store.loading = true;
        store.error = null;

        // Update each section in the database
        for (const section of store.sections) {
          await store.updateSection(section.id, { ...section });
        }

        alert("Questionnaire submitted successfully!");
      } catch (error) {
        console.error("Error submitting questionnaire:", error);
        store.error = "Failed to submit the questionnaire. Please try again.";
      } finally {
        store.loading = false;
      }
    };

    return {
      store,
      updateQuestionStatus,
      updateQuestion,
      addSection,
      submitQuestionnaire
    };
  },
};
</script>
