<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          @click:row="handleRowClick"
          :options.sync="options"
          :headers="headers"
          :items="packages"
          :items-per-page="itemsPerPage"
          :server-items-length="totalPackages"
          :footer-props="{
            showFirstLastPage: true,
            
          }"
          item-key="package.name"
          class="elevation-1"
        />       
        <Dialog
          v-model="dialog"
          :dialogData='selectedRow'
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Dialog from '@/components/Dialog.vue'

  export default {
    name: 'DataTable',
    components: { Dialog },

    data() {
      return {
        dialog: false,
        tableOptions: {},
        selectedRow: null,
        headers: [
          {
            text: 'Package Name',
            sortable: false,
            value: 'package.name',
          },
          {
            text: 'Description',
            sortable: false,
            value: 'package.description',
            },
        ],
      }
    },

    watch: {
      tableOptions: {
        immediate: true,
        deep: true,
        async handler(value) {
          if (!Object.keys(value).length) return
          try {
            const query = {
              page: value.page,
              itemsPerPage: value.itemsPerPage,
            }
            await this.$router.replace({ query: { ...this.$route.query, ...query }})
          } catch (error) {}
        },
      },
    },

    computed: {
      ...mapState(['searchConfig', 'packages', 'totalPackages']),
      itemsPerPage() {
        return this.searchConfig.itemsPerPage
      },
      options: {
        get() {
          const { page = 1, itemsPerPage = 10 } = this.$route.query
          return {
            ...this.tableOptions,
            page: page ? +page : this.searchConfig.pagination.pa,
            itemsPerPage: itemsPerPage ? +itemsPerPage : this.searchConfig.pagination.itemsPerPage,
          }
        },
        set(value) {
          this.tableOptions = value
        },
      },
    },

    methods: {
      handleRowClick(value) {
        this.dialog = true
        this.selectedRow = value
      },
    },
  }
</script>
