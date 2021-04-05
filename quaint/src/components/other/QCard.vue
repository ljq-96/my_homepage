<template>
  <div
    :style="{
      borderTopWidth: headLine ? '3px' : '1px',
      borderTopColor: headLine ? headLine : '1'
    }"
    class="q-card"
  >
    <div :style="{ alignItems: align }" class="q-card-title">
      <div>
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="extra"></slot>
      </div>
    </div>
    <div
      :style="{ height: height, overflow: height ? 'auto' : '' }"
      class="q-card-content scroll-bar"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headLine: {
      type: String
    },
    align: {
      type: String
    },
    height: {
      type: String
    }
  }
}
</script>

<style scoped>
.q-card {
  padding: 0 15px;
  background-color: #fff;
  border: 1px solid var(--divider);
  border-radius: 4px;
}

.q-card-title {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  color: var(--content);
  border-bottom: 1px solid var(--divider);
}

.q-card-title > div:last-child {
  color: var(--disabled);
}

.q-card-content {
  padding: 15px 0;
  scroll-behavior: smooth;
}
</style>
