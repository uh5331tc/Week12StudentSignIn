<template id="template">
  <div>
      <new-student-form 
      v-on:student-added="newStudentAdded">
      </new-student-form>

      <student-table 
      v-bind:students="students" 
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
      </student-table>

      <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>
import newStudentForm from './components/newStudentForm.vue'
import studentMessage from './components/studentMessage.vue'
import studentTable from './components/studentTable.vue'


export default {
  name: 'App',
  components: {
    newStudentForm, 
    studentMessage,
    studentTable
  },
  data() {
    return {
      students: [],
      mostRecentStudent: []
    }
  },
  mounted() {  // load all students - make request to API
    this.updateStudents()
  },
  methods: {
    updateStudents(){
      this.$student_api.getAllStudents().then(students => {
        this.students = students
      })
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then ( () => {
        this.updateStudents()
      })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present // update present value
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      })
   },
    studentDeleted(student) { 
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {} // clears welcome/goodbye messages
      })
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
</style>

  

