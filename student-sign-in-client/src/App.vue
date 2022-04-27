<template id="template">
      <new-student-form 
      v-on:student-added="newStudentAdded">
      </new-student-form>

      <student-table 
      v-bind:students="students" 
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
      </student-table>

      <student-message
      v-bind:student="mostRecentStudent">
      </student-message>

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
  methods: {
    newStudentAdded(student) {
      this.students.push(student)
      this.students.sort(function(s1, s2) {
        return s1.name.toLowerCase() < s2.name.toLowerCase() ? -1 : 1
      })
    },
    studentArrivedOrLeft(student, present) {
      // Found STUDENT in array of STUDENTS
      // updated present attribute 

      let updateStudent = this.students.find( function(s) {
        if (s.name === student.name && s.starID === student.starID){
          return true
        }
      })

      //console.log(updateStudent)
        if (updateStudent) {
        updateStudent.present = present
        this.mostRecentStudent = updateStudent
      }
    },
    studentDeleted(student) { //filter returns a new array of all students that return true
      this.students=this.students.filter( function(s){  // rename student deleted
        if (s != student) {
          return true
        }
      })

      // CLEAR WELCOME AND GOODBYE MESSAGE
    this.mostRecentStudent = {}
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
</style>

  

