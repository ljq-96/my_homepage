<template>
  <div ref="i" class="calendar card">
    <fluent-design v-slot="param" :width="2" :borderColor="'var(--color)'" :borderSize="50" :backSize="0">
      <div class="cal-title">
        <div>{{ year }}年{{ month + 1 }}月</div>
        <div class="cal-button">
          <fluent-design-item :param="param">
            <div @click="prevMon" class="iconfont light icon-left"></div>
          </fluent-design-item>
          <fluent-design-item :param="param">
            <div @click="nextMon" class="iconfont light icon-right"></div>
          </fluent-design-item>
        </div>
      </div>
      <div class="week">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
      <div class="days">
        <fluent-design-item v-for="(item, index) in days" :key="index" :param="param">
          <div class="day" :class="item.type">
            {{ item.day }}
          </div>
        </fluent-design-item>
      </div>
    </fluent-design>
  </div>
</template>

<script>
import FluentDesign from './FluentDesign'
import FluentDesignItem from './FluentDesignItem'
export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  data() {
    return {
      days: [],
      monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    }
  },
  methods: {
    setMonth() {
      this.days.length = 0
      this.prevMonth = this.month === 0 ? 11 : this.month - 1
      if (this.year % 400 === 0 || (this.year % 4 === 0 && this.year % 100 != 0)) {
        this.monthDays[1] = 29
      } else {
        this.monthDays[1] = 28
      }
      const firstDay = new Date(this.year, this.month, 1).getDay()
      const space = firstDay === 7 ? 0 : firstDay
      const spans = Math.ceil((this.monthDays[this.month] + space) / 7) * 7
      for (let i = 1; i <= this.monthDays[this.month]; i++) {
        this.days.push({
          day: i,
          type: i === this.day ? 'current' : 'current-month'
        })
      }
      for (let i = 0; i < space; i++) {
        this.days.unshift({
          day: this.monthDays[this.prevMonth] - i,
          type: 'other-month'
        })
      }
      let j = 1
      while (this.days.length % 7 !== 0) {
        this.days.push({
          day: j,
          type: 'other-month'
        })
        j++
      }
    },
    nextMon() {
      if (this.month === 11) {
        this.year++
        this.month = 0
      } else {
        this.month++
      }
      this.setMonth()
    },
    prevMon() {
      if (this.month === 0) {
        this.year--
        this.month = 11
      } else {
        this.month--
      }
      this.setMonth()
    }
  },
  created() {
    this.setMonth()
  }
}
</script>

<style scoped>
.calendar {
  padding: 10px 12px;
  margin-bottom: 15px;
}

.cal-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 30px;
  margin-bottom: 10px;
  font-size: 16px;
}

.cal-button {
  width: 90px;
  display: flex;
  justify-content: space-between;
}

.cal-button .iconfont {
  width: 40px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
}

.cal-button .iconfont:hover,
.days > .day:not(.other-month):hover,
.days > .current {
  color: #fff;
  background-color: var(--color);
}

.cal-button .iconfont:active {
  filter: brightness(140%);
}

.calendar .week {
  display: grid;
  grid-template-columns: repeat(7, 32px);
  justify-content: center;
  grid-gap: 2px;
  text-align: center;
  margin-bottom: 6px;
  padding: 0 10px;
  color: var(--color);
}

.days {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 32px);
  grid-auto-rows: 32px;
  place-items: stretch;
  justify-content: center;
  grid-gap: 2px;
}

.days .day {
  text-align: center;
  line-height: 32px;
  transition-property: width, height, margin;
  transition-duration: 0.5s;
  transition-delay: 0s;
}

.calendar .current {
  color: #fff;
  background-color: var(--color) !important;
}

.event-day::after {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  transform: translateY(-18px) rotate(45deg);
  border-radius: 50%;
  background-color: var(--color);
  filter: brightness(140%);
  transition-duration: 0.5s;
  transition-delay: 0.1s;
}

.current-day.event-day::after {
  background-color: #fff;
}

.event-day:hover {
  margin-bottom: 34px;
  transition-delay: 0.1s;
}

.days .event-day:hover::after {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  transform: translateY(-4px) rotate(45deg);
  transition-delay: 0s;
}

.days .other-month {
  color: rgba(0, 0, 0, 0.1);
}

.days .other-month:hover {
  color: var(--color);
}

.holiday {
  display: flex;
  position: absolute;
  left: 11px;
  width: 229px;
  height: 0;
  filter: brightness(140%);
  overflow: hidden;
  background-color: transparent;
  transition-duration: 0.5s;
  transition-delay: 0s;
}

.holiday p {
  width: 100%;
  height: 28px;
  margin-top: 6px;
  border-radius: 2px;
  text-align: left;
  padding-left: 10px;
  font-size: 12px;
  line-height: 28px;
  color: #fff;
  background-color: var(--color);
}

.event-day:hover::after {
  background-color: var(--color);
}

.event-day:hover .holiday {
  height: 34px;
  transition-delay: 0.15s;
}
</style>
