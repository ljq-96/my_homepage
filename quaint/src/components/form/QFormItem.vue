<template>
  <div class="q-form-item">
    <label>
      <div class="label" v-if="label" :style="{ width: form.labelWidth }">{{ label }}</div>
      <div class="q-input-wrap">
        <slot></slot>
      </div>
    </label>
    <p v-if="error" :style="{ paddingLeft: form.labelWidth }" class="err-mes">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props: {
    prop: {
      type: String
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      error: ''
    }
  },
  computed: {
    errorPos() {
      return 
    }
  },
  methods: {
    validate() {
      const rule = this.form.rules[this.prop]
      const value = this.form.model[this.prop]
      const schema = new Schema({ [this.prop]: rule })
      return schema.validate({ [this.prop]: value }, err => {
        if (err) {
          this.error = err[0].message
        } else {
          this.error = ''
        }
      })
    }
  },
  created() {
    this.$on('validate', () => {
      this.validate()
    })
  }
}
</script>

<style scoped>
.q-form-item {
  position: relative;
}
.q-form-item label {
  display: flex;
  align-items: center;
}

.q-form-item .label {
  text-align-last: justify;
  margin-right: 10px;
}

.q-form-item .err-mes {
  position: absolute;
  color: #ff7043;
  margin-left: 10px;
  font-size: 12px;
}

.q-form-item .q-input-wrap {
  flex-grow: 1;
}
</style>
