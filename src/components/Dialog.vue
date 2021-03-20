<template>
<v-dialog v-model="inputValue" width="500">
    <v-card>
    <v-card-title class="headline grey lighten-2">
        Package Information
    </v-card-title>

    <v-card-text v-if="dialogData">
        <div class="package-description">
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
        <v-divider></v-divider>
        <h3>{{ authorName }}</h3>
        <p>
            <a :href="`{{ author.url }}`">Github</a>
        </p>
        <v-divider></v-divider>
        <h3>Keywords</h3>
        <v-chip
            class="ma-2"
            color="indigo"
            text-color="white"
            v-for="(keyword, index) of dialogData.package.keywords"
            :key="index"
            >{{ keyword }}</v-chip
        >
        <v-divider></v-divider>
        <h3>Maintainers</h3>

        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    Username
                </th>
                <th class="text-left">
                    Email
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(maintainer, key) of dialogData.package.maintainers"
                :key="key"
                >
                <td>{{ maintainer.username }}</td>
                <td>{{ maintainer.email }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-divider></v-divider>
        <h3>Publisher</h3>
        <p>{{ dialogData.package.publisher.username }}</p>
        </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="inputValue = false">
        Close
        </v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: 'Dialog',
    props: {
        value: {
            type: Boolean,
        },
        dialogData: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        return {
            inputValue: false,
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newValue, oldValue) {
                if (newValue !== oldValue) this.inputValue = newValue
            },
        },
        inputValue: {
            handler(value) {
                this.$emit('input', value)
            }
        },
    },

    computed: {
        name() {
            return this.dialogData.package?.name || ''
        },
        description() {
            return this.dialogData.package?.description || ''
        },
        author() {
            return this.dialogData.package.author
        },
        authorName() {
            return this.dialogData.package.author?.name || ''
        },
    },
}
</script>

<style lang="scss" scoped>
.package-description {
  h3 {
    margin-top: 16px;
  }
}
</style>