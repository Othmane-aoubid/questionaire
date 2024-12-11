<template>
  <div
    class="bg-white shadow-sm rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-md"
  >
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div class="flex-grow mb-4 sm:mb-0 sm:mr-4">
        <p class="text-lg font-medium text-gray-900 mb-2">
          {{ question.text }}
        </p>
        <input
          v-model="localAnswer"
          @input="updateAnswer"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          placeholder="Your answer"
        />
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="updateStatus('good')"
          :class="[
            'p-2 rounded-full transition-all duration-300',
            localStatus === 'good'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-green-100',
          ]"
        >
          <font-awesome-icon icon="check" />
        </button>
        <button
          @click="updateStatus('bad')"
          :class="[
            'p-2 rounded-full transition-all duration-300',
            localStatus === 'bad'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-red-100',
          ]"
        >
          <font-awesome-icon icon="times" />
        </button>
        <button
          @click="editQuestion"
          class="p-2 rounded-full bg-gray-200 text-indigo-600 hover:bg-indigo-100 transition-all duration-300"
        >
          <font-awesome-icon icon="pencil" />
        </button>
        <button
          @click="deleteQuestion"
          class="p-2 rounded-full bg-gray-200 text-red-600 hover:bg-red-100 transition-all duration-300"
        >
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  emits: ["update-question", "delete-question"],
  setup(props, { emit }) {
    const localAnswer = ref(props.question.answer);
    const localStatus = ref(props.question.status);

    watch(localAnswer, (newAnswer) => {
      updateQuestion({ answer: newAnswer });
    });

    const updateAnswer = () => {
      updateQuestion({ answer: localAnswer.value });
    };

    const updateStatus = (newStatus) => {
      localStatus.value = newStatus;
      updateQuestion({ status: newStatus });
    };

    const updateQuestion = (updates) => {
      emit("update-question", props.question.id, updates);
    };

    const editQuestion = () => {
      const newText = prompt("Edit question:", props.question.text);
      if (newText && newText !== props.question.text) {
        updateQuestion({ text: newText });
      }
    };

    const deleteQuestion = () => {
      emit("delete-question", props.question.id);
    };

    return {
      localAnswer,
      localStatus,
      updateAnswer,
      updateStatus,
      editQuestion,
      deleteQuestion,
    };
  },
};
</script>
