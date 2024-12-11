<template>
  <div
    class="bg-white shadow-lg rounded-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl"
  >
    <div
      class="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 flex justify-between items-center"
    >
      <h2 class="text-2xl font-bold text-white">{{ section.title }}</h2>
      <div class="flex space-x-2">
        <button
          @click="editSection"
          class="text-white hover:text-indigo-200 transition-colors duration-300"
        >
          <font-awesome-icon icon="pencil" />
        </button>
        <button
          @click="$emit('delete-section', section.id)"
          class="text-white hover:text-red-200 transition-colors duration-300"
        >
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>
    <div class="p-6">
      <ul class="space-y-4">
        <li v-for="question in section.questions" :key="question.id">
          <Question
            :question="question"
            @update-question="updateQuestion"
            @delete-question="deleteQuestion"
          />
        </li>
      </ul>
    </div>
    <div class="px-6 py-4 bg-gray-50 flex justify-end">
      <button
        @click="addQuestion"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
      >
        <font-awesome-icon icon="plus" class="mr-2" />
        Add Question
      </button>
    </div>
  </div>
</template>

<script>
import { useQuestionnaireStore } from "../stores/questionnaire";
import Question from "./Question.vue";

export default {
  name: "Section",
  components: {
    Question,
  },
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useQuestionnaireStore();

    const editSection = () => {
      const newTitle = prompt("Enter new section title:", props.section.title);
      if (newTitle && newTitle !== props.section.title) {
        emit("update-section", props.section.id, { title: newTitle });
      }
    };

    const addQuestion = () => {
      const questionText = prompt("Enter question:");
      if (questionText) {
        emit("add-question", props.section.id, questionText);
      }
    };

    const updateQuestion = async (questionId, updatedQuestion) => {
      await store.updateQuestion(props.section.id, questionId, updatedQuestion);
    };

    const deleteQuestion = async (questionId) => {
      if (confirm("Are you sure you want to delete this question?")) {
        await store.deleteQuestion(props.section.id, questionId);
      }
    };

    return {
      editSection,
      addQuestion,
      updateQuestion,
      deleteQuestion,
    };
  },
};
</script>
