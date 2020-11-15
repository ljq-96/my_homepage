<template>
  <div class="q-input">
    <input :class="$parent.error ? 'error' : ''" :type="type" :value="value" @input="onInput" @blur="onBlur" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  inject: ['form'],
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.$parent.$emit('validate')
    },
    onBlur() {
      this.$parent.$emit('blur')
    }
  }
}
</script>

<style scoped>
.q-input,
input {
  width: 100%;
}

input {
  height: 36px;
  padding: 0 10px;
  font-family: FiraCode;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: transparent;
  outline: none;
  transition: 0.4s;
}

input:focus {
  border-color:rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

input.error {
  border-color: #ff7043;
}

input.error:focus {
  box-shadow: 0 0 6px #ff7043;
}
</style>
