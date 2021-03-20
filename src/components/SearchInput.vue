<template>
<v-text-field
  v-model='inputValue'
  :loading='loading'
  :disabled='disabled'
  v-on="$listeners"
  label='Пошук...'
>
  <slot
    slot="prepend"
    name="prepend"
  />
  <slot
    slot="append"
    name="append"
  />
</v-text-field>
</template>

<script>
export default {
    name: 'SearchInput',
    props: {
      value: String,
      loading: Boolean,
    },
    data() {
      return {
        inputValue: '',
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
        immediate: true,
        handler(newValue, oldValue) {
          if (newValue === oldValue) return
          this.$emit('input', newValue)
        },
      },
    },
    computed: {
      disabled() {
        return Boolean(this.loading)
      },
    },
}
</script>