<template>
    <div> 
        <div v-if="student.name">

            <div class="alert alert-info" role="alert" v-if="student.present">
                Welcome, {{ student.name }}
            </div>     

            <div class="alert alert-success" role="alert" v-else>
                Goodbye, {{student.name}}. See you later!
            </div>

        </div>        
        <!--Template /html here -->
    </div>
</template>

<script> 
export default {
    name: 'studentMessage',
    props: {
        student: Object // created component here
    }
    
}
</script>

<style scoped>

</style>