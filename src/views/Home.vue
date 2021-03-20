<template>
  <div class="home">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <SearchInput 
            v-model='searchText'
            :loading='loading'
            @keydown.enter="updateSearchTextInput"
            @change="updateSearchTextInput"
          >
            <v-icon
              @click="clearSearchText"
              v-if="searchText"
              slot="append"
            >
              mdi-close
            </v-icon>
          </SearchInput>
        </v-col>
      </v-row>
    </v-container>
    <DataTable />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchInput from '@/components/SearchInput.vue'
import DataTable from '@/components/DataTable.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    SearchInput,
    DataTable,
  },
  data() {
    return {
      searchText: this.$route.query.text || '',
      loading: false,
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      async handler(newVal, oldVal) {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
        await this.updateSearchText(newVal.text)
        await this.updatePaginationOptions({
          page: +newVal.page,
          itemsPerPage: +newVal.itemsPerPage,
        })
        await this.getDataFromApiByUpdatedConfig()
      },
    }
  },
  computed: {
    ...mapState(['searchConfig']),
  },
  methods: {
    ...mapActions([
      'updateSearchText',
      'updatePaginationOptions',
      'getDataFromApi',
    ]),
    async getDataFromApiByUpdatedConfig() {
      try {
        this.loading = true
        await this.getDataFromApi()
      }
      catch (error) {}
      finally { this.loading = false }
    },
    async updateSearchTextInput() {
      if (this.searchText.length && !this.searchText.trim()) return

      try {
        const query = {
          ...this.$route.query,
          text: this.searchText,
          page: 1,
        }

      if (!query.text) delete query.text

      await this.$router.replace({ query })
      } catch (error) {}
    },
    clearSearchText() {
      this.searchText = ''
      this.updateSearchTextInput()
    },
  },
}
</script>
