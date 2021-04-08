<template>
  <div class="q-table">
    <div class="thead">
      <table cellspacing="0" cellpadding="0">
        <colgroup>
          <col v-for="(item, index) in tdWidth" :key="index" :width="item" />
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.label"
              :style="{ textAlign: col.align }"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      class="tbody"
      :style="{ height: height, overflow: height ? 'auto' : '' }"
    >
      <table cellspacing="0" cellpadding="0">
        <tbody ref="tbody">
          <tr v-for="(row, index) in data" :key="row._id">
            <td
              v-for="col in columns"
              :key="col.prop"
              :style="{ textAlign: col.align }"
            >
              <!-- <slot :row="row" :index="index">
                {{
                  col.formatter
                    ? col.formatter({
                        value: row[col.prop],
                        index: index
                      })
                    : row[col.prop]
                }}
              </slot> -->
              <template v-if="col.slot">
                <component :is="col.slot"></component>
              </template>
              <!-- <slot :index="index"></slot> -->
              <template>
                {{
                  col.formatter
                    ? col.formatter({
                        value: row[col.prop],
                        index: index
                      })
                    : row[col.prop]
                }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QTableE',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: String
    }
  },
  data() {
    return {
      columns: [],
      tdWidth: []
    }
  },
  provide() {
    return {
      tableData: this
    }
  },
  computed: {
    slot() {
      return this.data
    }
  },
  mounted() {
    console.log(this)
    this.columns = this.$children.map(item => {
      return {
        prop: item.prop,
        label: item.label,
        formatter: item.formatter,
        slot: item.$slots.default.child.$children.length
          ? item.$slots.default.child.$children[0]
          : ''
      }
    })
    console.log(this.columns)
  },
  watch: {
    dataSource(newValue, oldValue) {
      this.$nextTick(() => {
        const tds = this.$refs.tbody.getElementsByTagName('td')
        const tdWidth = []
        for (let i = 0; i < this.columns.length; i++) {
          tdWidth.push(tds[i].offsetWidth)
        }
        this.tdWidth = tdWidth
      })
    }
  }
}
</script>

<style scoped></style>
