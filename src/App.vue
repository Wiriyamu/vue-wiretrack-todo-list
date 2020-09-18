<template>
  <div id="app" class="todo">
    <div class="todo__container">
      <h1 class="todo__title">Wiretrack</h1>
      <h2 class="todo__subtitle">VWTL 💎</h2>
      <p class="todo__description">Vue Wiretrack Todo List</p>

      <div class="todo__searchBox">
        <vs-input
          v-model="search"
          label="Encontre a tarefa ou tag que deseja"
          primary
        />
        <vs-button @click="hideFormTasks = true"
          >Adicione uma nova tarefa</vs-button
        >
      </div>

      <form v-if="hideFormTasks" class="todo__box" @submit.prevent>
        <h1>Tudo Pronto! Vamos começar com as tarefas...</h1>
        <div class="todo__box">
          <vs-input
            label="Adicione uma nova tarefa ✔️"
            v-model="task.title"
            success
          />
        </div>

        <div class="todo__tagBox">
          <vs-input
            label="Se desejar, adicione algumas tags 🏷️"
            v-model="task.tags"
            success
          />
        </div>
        <div class="todo__box">
          <v-notification />
        </div>

        <div style="margin-top: 0.625rem">
          <vs-button @click="createTask" success>Criar Tarefa</vs-button>
        </div>
      </form>

      <div class="todo__box">
        <h1>Minha Lista de Tarefas</h1>
        <template v-if="tasks.length">
          <li
            class="todo__item"
            v-for="(task, index) in filteredTags"
            :key="index"
          >
            <div>
              <h2 :class="{ todo__done: task.done }">{{ task.title }}</h2>
              <p style="color: green">{{ task.tags }}</p>

              <vs-checkbox v-model="task.done" success>
                Tarefa Concluida?
              </vs-checkbox>
            </div>

            <div>
              <vs-button @click="removeTask(task)" danger
                >Excluir Tarefa</vs-button
              >
            </div>
          </li>
        </template>
        <p v-else class="todo__empty">Nenhuma Tarefa Foi Adicionada 😢</p>
      </div>
    </div>
  </div>
</template>

<script>
import VNotification from '@/components/VNotification'
export default {
  name: 'App',
  components: { VNotification },
  data: () => ({
    search: '',
    hideFormTasks: false,
    task: {
      title: '',
      tags: ''
    },
    tasks: []
  }),
  methods: {
    clearTask() {
      ;(this.task.title = ''), (this.task.tags = '')
    },
    createTask() {
      if (this.task.title === '') {
        alert(
          `Não é possível criar uma nova tarefa sem um título. Por favor, insira um título para completarmos sua tarefa.`
        )
      } else {
        const sameName = t => t.title === this.task.title
        const reallyNew = this.tasks.filter(sameName).length == 0

        if (!reallyNew) {
          alert('Você já adicionou esse tarefa!')
        } else {
          this.tasks.push({
            title: this.task.title,
            tags: this.task.tags,
            done: false
          })
          this.clearTask()
        }
      }
    },

    removeTask(task) {
      const taskIndex = this.tasks.indexOf(task)
      this.tasks.splice(taskIndex, 1)
    }
  },
  watch: {
    tasks: {
      deep: true,
      handler() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
      }
    }
  },
  computed: {
    filteredTags() {
      return this.tasks.filter(task => {
        const filterTitle = task.title.toLowerCase().match(this.search)
        const filterTags = task.tags.toLowerCase().match(this.search)
        return filterTitle || filterTags
      })
    }
  },
  created() {
    const json = localStorage.getItem('tasks')
    const array = JSON.parse(json)
    this.tasks = Array.isArray(array) ? array : []
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/app.scss';
.todo {
  width: 100%;

  &__container {
    @include container;
  }

  &__title {
    margin: 2rem;
    text-align: center;
  }

  &__searchBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }

  &__box {
    margin-top: 2rem;
  }

  &__tagBox {
    display: flex;
    margin-top: 2rem;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    max-width: 70rem;
    margin: 0.625rem 0;
    padding: 1.5rem 0.625rem;
    border-radius: 5px;
    background-color: $colorSupport;
    color: $colorBase;
  }

  &__info {
    display: flex;
  }

  &__empty {
    margin: 0.625rem 0;
  }

  &__done {
    text-decoration: line-through;
  }
}
</style>
