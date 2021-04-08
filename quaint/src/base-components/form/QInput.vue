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
      spellcheck="false"
    />
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'QInput',
  inheritAttrs: false,
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
  width: 100%;
  height: 36px;
  padding: 0 10px;
  font-family: FiraCode;
  border: 1px solid var(--colorLum3);
  border-radius: 2px;
  background: transparent;
  outline: none;
  transition: 0.4s;
}

.q-input input:focus {
  border-color: var(--colorLum4);
  box-shadow: 0 0 0 3px var(--colorLum2);
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
