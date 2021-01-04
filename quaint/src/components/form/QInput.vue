<template>
  <div class="q-input">
    <slot name="left"></slot>
    <input
      :class="$parent.error ? 'error' : ''"
      :type="type"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      v-bind="$attrs"
    />
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  // inject: ['form'],
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
.q-input {
  display: flex;
}

.q-input input {
  height: 36px;
  padding: 0 10px;
  font-family: FiraCode;
  border: 1px solid var(--colorLum2);
  border-radius: 2px;
  background: transparent;
  outline: none;
  transition: 0.4s;
}

.q-input input:focus {
  border-color: var(--colorLum2);
  box-shadow: 0 0 0 2px var(--colorLum1);
}

.q-input input.error {
  border-color: #ff7043;
}

.q-input input.error:focus {
  box-shadow: 0 0 6px #ff7043;
}

.q-input :last-child:not(input) {
  height: 36px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: -1px;
  cursor: pointer;
}

.q-input :first-child:not(input) {
  position: relative;
  height: 36px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: -1px;
  z-index: 10;
  cursor: pointer;
}
</style>
