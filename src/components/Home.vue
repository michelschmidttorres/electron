<template>
  <v-container fluid>
      <v-form>
          <v-file-input 
              label="Selecionando as Legendas"
              prepend-icon="mdi-message-text"
              append-outer-icon="mdi-send"
              outlined
              multiple 
              chips 
              v-model="files" 
              @click:append-outer="processSubtitles" />
      </v-form>

    <div class="pills">
      <Pill
        v-for="word in groupedWords"
        :key="word.name"
        :name="word.name"
        :amount="word.amount"
      />
    </div>
  </v-container>
</template>

<script>
import { ipcRenderer } from 'electron'
import Pill from "./Pill";

export default {
  components: { Pill },
  data: function () {
    return {
      file: [],  
      groupedWords: [],
    };
  },
  methods: {
      processSubtitles() {
          console.log(this.files)
          try {
            const paths = this.files.map(f => f.path)
            ipcRenderer.send('process-subtitles', paths)
          }
          catch(e) {
            console.log(e)
          }
          
          try {
              ipcRenderer.on('process-subtitles', (event, resp) => {
              this.groupedWords = resp
          })
            
          } catch (error) {
            console.log(error)
          }
      }
  }
};
</script>

<style>
.pills {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>