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
              :key="col.title"
              :style="{ textAlign: col.align }"
            >
              {{ col.title }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbody" :style="{ height: height }">
      <table cellspacing="0" cellpadding="0">
        <tbody ref="tbody">
          <tr v-for="(row, index) in dataSource" :key="row._id">
            <td
              v-for="col in columns"
              :key="col.title"
              :style="{ textAlign: col.align }"
            >
              <slot :row="row" :index="index" :name="col.key">
                {{
                  col.filter
                    ? col.filter({
                        value: row[col.key],
                        index: index
                      })
                    : row[col.key]
                }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    height: {
      type: String
    }
  },
  data() {
    return {
      tdWidth: []
    }
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

<style scoped>
.q-table {
  width: 100%;
  padding: 10px;
  background-color: #fff;
}

.q-table table {
  width: 100%;
  border-collapse: collapse;
}

.q-table thead {
  font-weight: bold;
  text-align: left;
  background-color: var(--background);
}

.q-table .tbody {
  overflow: auto;
}

.q-table .tbody::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.q-table .tbody::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: var(--divider);
}

.q-table .tbody::-webkit-scrollbar-thumb:hover {
  background-color: var(--color);
}

.q-table td,
.q-table th {
  vertical-align: middle;
  padding: 10px 20px;
}

.q-table tr {
  border-bottom: 1px solid var(--divider);
}

.q-table tbody tr:hover {
  background-color: var(--background);
}
</style>
