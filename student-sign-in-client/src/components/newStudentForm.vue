<template>
    <div> 
    <div class="alert alert-danger" v-if="errors.length > 0">
        
            <li v-for="error in errors" v-bind:key="error"> {{ error }} </li>
    </div>

    <div class="card add-student m-2 p-2">
        <h4 class="card-title">Add new student</h4>

    <div class="form-group">
        <label for="name">Name</label>
                <!-- TODO v-model newStudentName -->
        <input id="name" class="form-control" v-model.trim="newStudentName"> <!--v-model updates the VUE in devtools-->
    </div>
    <div class="form-group">
        <label for="starID">Star ID</label>
                <!-- TODO v-model newStarID -->
        <input id="starID" class="form-control" v-model.trim="newStarID">
    </div>
            <!-- TODO v-on:click event handler -->
        <button class="btn btn-primary" v-on:click="addStudent">Add</button>
    </div>
    
        <!--Template /html here -->
    </div>
</template>

<script> 
export default {
    name: 'NewStudentForm',
    emits: ['student-added'], //document events that this component emits
    data () {
        return {
            newStudentName: '',
            newStarID: '',
            errors: []
        }
    },
    methods: {
        addStudent() {
            this.errors = [] // clears errors array
            if (!this.newStudentName) {
                this.errors.push('Student name must be entered!')
            }

            if (!this.newStarID) {
                this.errors.push('StarID must be entered')
            }

            if (this.errors.length == 0) {
                let student = {name: this.newStudentName, starID: this.newStarID, present: false}  
             // TODO EMIT MESSAGE TO PARENT WITH NEW STUDENT---> APP.VUE
                this.$emit('student-added', student)
                this.newStudentName = ''  // clear the form
                this.newStarID = ''
            }
        }
    }
    // create component here
}
</script>

<style scoped>

</style>