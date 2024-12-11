import { defineStore } from 'pinia'
import { db } from '../firebase/firebase'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'

const defaultSections = [
  {
    title: "Legal and Compliance",
    questions: [
      { id: "1", text: "What type of business entity will we form in Morocco (SARL, SA, etc.)?", answer: "", status: null },
      { id: "2", text: "Who will be the legal representative of the company?", answer: "", status: null },
      { id: "3", text: "How will customer data be stored and protected?", answer: "", status: null },
      { id: "4", text: "Does the platform comply with GDPR or other international data protection standards?", answer: "", status: null },
      { id: "5", text: "Who will draft the terms and conditions for users?", answer: "", status: null },
      { id: "6", text: "How will liability be handled if there are data breaches or system failures?", answer: "", status: null },
      { id: "7", text: "Will there be a formal partnership agreement outlining roles, responsibilities, and equity splits?", answer: "", status: null },
      { id: "8", text: "How is intellectual property ownership distributed among the partners?", answer: "", status: null }
    ]
  },
  {
    title: "Financial and Funding",
    questions: [
      { id: "9", text: "What is the estimated initial capital required to start the business?", answer: "", status: null },
      { id: "10", text: "How much are each of us contributing financially, and how will it affect ownership?", answer: "", status: null },
      { id: "11", text: "How will the SaaS platform generate revenue?", answer: "", status: null },
      { id: "12", text: "What are the expected profit margins?", answer: "", status: null },
      { id: "13", text: "What are the ongoing costs (e.g., server hosting, software maintenance)?", answer: "", status: null },
      { id: "14", text: "How will salaries, marketing expenses, and operational costs be divided?", answer: "", status: null },
      { id: "15", text: "Are we considering external investors or loans?", answer: "", status: null },
      { id: "16", text: "If investors are involved, how much equity are we willing to give up?", answer: "", status: null }
    ]
  },
  {
    title: "Platform Development",
    questions: [
      { id: "17", text: "What features will be prioritized in the MVP?", answer: "", status: null },
      { id: "18", text: "Who is responsible for designing the user interface and user experience?", answer: "", status: null },
      { id: "19", text: "Will we hire a development team or outsource the project?", answer: "", status: null },
      { id: "20", text: "What is the estimated timeline for platform development?", answer: "", status: null },
      { id: "21", text: "Who will be responsible for maintaining and upgrading the platform?", answer: "", status: null },
      { id: "22", text: "How will we ensure uptime and prevent technical failures?", answer: "", status: null }
    ]
  },
  {
    title: "Market and Competition",
    questions: [
      { id: "23", text: "Who are the primary customers?", answer: "", status: null },
      { id: "24", text: "What regions or countries will we target first?", answer: "", status: null },
      { id: "25", text: "Who are the major competitors in the market?", answer: "", status: null },
      { id: "26", text: "How does our product differentiate itself from existing solutions?", answer: "", status: null },
      { id: "27", text: "Have we conducted surveys or focus groups with potential customers?", answer: "", status: null }
    ]
  }
];

export const useQuestionnaireStore = defineStore('questionnaire', {
  state: () => ({
    sections: [],
    loading: false,
    error: null
  }),

  actions: {
    async initializeStore() {
      this.loading = true;
      this.error = null;
      try {
        const querySnapshot = await getDocs(collection(db, "sections"));
        if (querySnapshot.empty) {
          // If no sections exist, create default sections
          for (const section of defaultSections) {
            await addDoc(collection(db, "sections"), section);
          }
          this.sections = defaultSections.map((section, index) => ({
            id: String(index + 1),
            ...section
          }));
        } else {
          this.sections = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        }
      } catch (error) {
        console.error("Error initializing store:", error);
        this.error = "Failed to load questions. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    async addSection(sectionTitle) {
      try {
        const newSection = {
          title: sectionTitle,
          questions: []
        };
        const docRef = await addDoc(collection(db, "sections"), newSection);
        this.sections.push({
          id: docRef.id,
          ...newSection
        });
      } catch (error) {
        console.error("Error adding section:", error);
        this.error = "Failed to add section. Please try again.";
      }
    },

    async updateSection(sectionId, updatedSection) {
      try {
        await updateDoc(doc(db, "sections", sectionId), updatedSection);
        const index = this.sections.findIndex(section => section.id === sectionId);
        if (index !== -1) {
          this.sections[index] = { ...this.sections[index], ...updatedSection };
        }
      } catch (error) {
        console.error("Error updating section:", error);
        this.error = "Failed to update section. Please try again.";
      }
    },

    async deleteSection(sectionId) {
      try {
        await deleteDoc(doc(db, "sections", sectionId));
        this.sections = this.sections.filter(section => section.id !== sectionId);
      } catch (error) {
        console.error("Error deleting section:", error);
        this.error = "Failed to delete section. Please try again.";
      }
    },

    async addQuestion(sectionId, questionText) {
      try {
        const sectionIndex = this.sections.findIndex(section => section.id === sectionId);
        if (sectionIndex !== -1) {
          const newQuestion = {
            id: Date.now().toString(),
            text: questionText,
            answer: '',
            status: null
          };
          this.sections[sectionIndex].questions.push(newQuestion);
          await this.updateSection(sectionId, { questions: this.sections[sectionIndex].questions });
        }
      } catch (error) {
        console.error("Error adding question:", error);
        this.error = "Failed to add question. Please try again.";
      }
    },

    async updateQuestion(sectionId, questionId, updatedQuestion) {
      try {
        const sectionIndex = this.sections.findIndex(section => section.id === sectionId);
        if (sectionIndex !== -1) {
          const questionIndex = this.sections[sectionIndex].questions.findIndex(q => q.id === questionId);
          if (questionIndex !== -1) {
            this.sections[sectionIndex].questions[questionIndex] = {
              ...this.sections[sectionIndex].questions[questionIndex],
              ...updatedQuestion
            };
            await this.updateSection(sectionId, { questions: this.sections[sectionIndex].questions });
          }
        }
      } catch (error) {
        console.error("Error updating question:", error);
        this.error = "Failed to update question. Please try again.";
      }
    },

    async deleteQuestion(sectionId, questionId) {
      try {
        const sectionIndex = this.sections.findIndex(section => section.id === sectionId);
        if (sectionIndex !== -1) {
          this.sections[sectionIndex].questions = this.sections[sectionIndex].questions.filter(q => q.id !== questionId);
          await this.updateSection(sectionId, { questions: this.sections[sectionIndex].questions });
        }
      } catch (error) {
        console.error("Error deleting question:", error);
        this.error = "Failed to delete question. Please try again.";
      }
    }
  }
})
