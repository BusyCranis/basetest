<template>
<div class="Home">

  <v-text-field
    v-model="newtasktitle"
    @click:append="addtask"
    @keyup.enter="addtask"
    class="pa-3"
    outlined
    label="add task"
    append-icon="mdi-plus"
    hide-details
    clearable
   >
  </v-text-field>

<v-list
class="pt-0"   
  flat
> 

<div  
v-for="task in tasks"
:key="task.id"  
>
  <v-list-item    
  @click="donetask(task.id)"
  :class="{ 'blue' : task.done }"
  >
   <template v-slot:default>
      <v-list-item-action>
        <v-checkbox
          :input-value="task.done"
          color="primary"
        >
      </v-checkbox>
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title> {{ task.title }} </v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>   
      <v-btn          
      @click.stop="deletetask(task.id)"            
      icon
      >
       <v-icon color="grey lighten-1">mdi-information</v-icon>
      </v-btn>
    </v-list-item-action>
   </template>
  </v-list-item>
                
<v-divider> </v-divider>

</div>     
</v-list>
  
</div>
</template>

<script>
// @ is an alias to /src



import { createUser } from '@/firebase'
import { reactive } from 'vue'




export default {
  setup() {
    const form = reactive({ name: '', email: ''})

    const onSubmit = async () => {
      await createUser({ ...form })
      form.name = ''
      form.email = ''
    }


    return { form, onSubmit }

  },
  




  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'wake up',
          done: false        
        },
       {
          id: 2,
          title: '게임2',
          done: false   
        },
           {
          id: 3,
          title: '게임3',
          done: false   
        },
      ],
      newtasktitle: ''
    }
  },
  methods: {
    donetask(id) {
      let task = this.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deletetask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },
    addtask() {
      let newtask = {
        id: Date.now(),
        title: this.newtasktitle,
        done: false
      }
      this.tasks.push(newtask)
      this.newtasktitle = ''
    }

  },





  components: {
   
  }
}
</script>
