<template>
  <div class="weather items">
    <div v-if="now && forecast && air" class="now">
      <div class="now-weather">{{ now.text }}</div>
      <div class="now-main">
        <span class="now-tmp">{{ now.temp }}</span>
        <ul class="now-range">
          <li>{{ forecast[0].tempMax }}</li>
          <li>{{ forecast[0].tempMin }}</li>
        </ul>
        <ul class="other-icon">
          <li class="weatherfont">&#xe61d;</li>
          <li class="weatherfont">&#xe673;</li>
        </ul>
        <ul class="now-other">
          <li>{{ now.windDir }} {{ now.windScale }}km/h</li>
          <li>空气质量 {{ air.aqi }}</li>
        </ul>
      </div>
    </div>
    <div v-if="now && forecast" class="forecast">
      <div v-for="(item, index) in forecast" :key="item.fxDate" class="forecast-item">
        <div class="forecast-name">{{ dayName[index] }}天</div>
        <div class="forecast-weather">
          <div class="weatherfont" v-html="icon[item.iconDay]"></div>
          <ul>
            <li>{{ item.tempMax }}</li>
            <li>{{ item.tempMin }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="{ onfocus: isOnSearch }" class="city">
      <input @input="focus" @focus="focus" v-model="city" type="text" spellcheck="false" />
      <!-- <span v-show="isOnSearch" @click="close" class="iconfont">&#xe62f;</span> -->
      <div v-if="cityList" class="city-list">
        <span v-for="item in cityList" @click="changeCity(item)" :key="item.id">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: window.localStorage.getItem('city') || '辛集',
      cityId: window.localStorage.getItem('cityId') || '101090114',
      now: null,
      forecast: null,
      air: null,
      dayName: '今明后',
      cityList: null,
      isOnSearch: false,
      key: 'da6c83c093344cab9b9132ef6308690a',
      icon: {
        100: '&#xe607;',
        101: '&#xe62c;',
        102: '&#xe62c;',
        103: '&#xe62c;',
        104: '&#xe62d;',
        200: '&#xe63d;',
        201: '&#xe607;',
        202: '&#xe63d;',
        203: '&#xe63d;',
        204: '&#xe63d;',
        205: '&#xe63c;',
        206: '&#xe63c;',
        207: '&#xe63c;',
        208: '&#xe63c;',
        209: '&#xe63c;',
        210: '&#xe63c;',
        211: '&#xe63c;',
        212: '&#xe63c;',
        213: '&#xe63c;',
        300: '&#xe62e;',
        301: '&#xe631;',
        302: '&#xe633;',
        303: '&#xe632;',
        304: '&#xe636;',
        305: '&#xe62a;',
        306: '&#xe62f;',
        307: '&#xe62b;',
        308: '&#xe63a;',
        309: '&#xe62a;',
        310: '&#xe632;',
        311: '&#xe632;',
        312: '&#xe632;',
        313: '&#xe63a;',
        314: '&#xe62a;',
        315: '&#xe62f;',
        316: '&#xe62b;',
        317: '&#xe633;',
        318: '&#xe632;',
        399: '&#xe62f;',
        300: '&#xe62e;',
        400: '&#xe634;',
        401: '&#xe634;',
        402: '&#xe634;',
        403: '&#xe637;',
        404: '&#xe636;',
        405: '&#xe641;',
        406: '&#xe641;',
        407: '&#xe635;',
        408: '&#xe634;',
        409: '&#xe637;',
        410: '&#xe636;',
        499: '&#xe637;',
        500: '&#xe638;',
        501: '&#xe640;',
        502: '&#xe642;',
        503: '&#xe63d;',
        504: '&#xe63b;',
        507: '&#xe639;',
        508: '&#xe63c;',
        509: '&#xe638;',
        510: '&#xe638;',
        511: '&#xe642;',
        512: '&#xe642;',
        513: '&#xe642;',
        514: '&#xe638;',
        515: '&#xe638;',
        900: '&#xe63e;',
        901: '&#xe600;',
        999: '&#xe645;'
      }
    }
  },
  methods: {
    focus() {
      this.isOnSearch = true
      this.$request({
        url: 'https://geoapi.heweather.net/v2/city/lookup',
        params: {
          location: this.city,
          number: 20,
          key: this.key
        }
      }).then(res => {
        this.cityList = res.location
      })
    },
    close() {
      this.isOnSearch = false
    },
    changeCity(data) {
      const { name, id } = data
      this.city = name
      this.cityId = id
      window.localStorage.setItem('city', name)
      window.localStorage.setItem('cityId', id)
      this.requestWeather()
      this.isOnSearch = false
    },
    requestWeather() {
      this.$request({
        url: `https://devapi.heweather.net/v7/weather/now`,
        params: {
          location: this.cityId,
          key: this.key
        }
      }).then(res => {
        this.now = res.now
      })
      this.$request({
        url: 'https://devapi.heweather.net/v7/weather/7d',
        params: {
          location: this.cityId,
          key: this.key
        }
      }).then(res => {
        this.forecast = res.daily.splice(0, 3)
      })
      this.$request({
        url: 'https://devapi.heweather.net/v7/air/now',
        params: {
          location: this.cityId,
          key: this.key
        }
      }).then(res => {
        this.air = res.now
      })
    }
  },
  created() {
    this.requestWeather()
  }
}
</script>

<style>
.weather {
  height: 100%;
  background-color: var(--color);
  overflow: hidden;
}

.weatherfont {
  font-family: weathericon;
}

.weather ul {
  list-style: none;
}

.now {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100%;
}

.now-main {
  display: flex;
  height: 60px;
}

.now-tmp {
  line-height: 60px;
  font-size: 40px;
  font-weight: 700;
  padding: 0 35px 0 10px;
}

.now-range {
  margin-right: 14px;
}

.now-main li {
  height: 30px;
  padding-left: 5px;
  line-height: 30px;
}

.city {
  position: absolute;
  left: 8px;
  bottom: 8px;
  right: 8px;
  height: 18px;
  background: transparent;
  overflow: hidden;
  background-color: transparent;
  transition: 0.5s;
}

.city input {
  outline: none;
  border: none;
  width: 100%;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: 0.4s;
}

.city input::selection {
  background: var(--color);
  color: #fff;
}

.city.onfocus {
  top: 4px;
  bottom: 4px;
  right: 4px;
  left: 4px;
  height: auto;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
}

.city.onfocus input {
  height: 36px;
  font-size: 16px;
  color: #4a4a4a;
  padding: 0 10px;
  border-radius: 0;
  border-bottom: 2px solid var(--color);
  cursor: auto;
}

.city-list::-webkit-scrollbar {
  width: 4px;
}

.city-list::-webkit-scrollbar-thumb {
  background: var(--color);
}

.city-list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0 5px;
  height: 70px;
  margin: 5px 5px;
  font-size: 12px;
  color: #4a4a4a;
  overflow: auto;
}

.city-list > span {
  padding: 0 8px;
  margin: 2px;
  background: rgba(0, 0, 0, 0.05);
}

.city-list > span:hover {
  color: #fff;
  background-color: var(--color);
}

.city-list > div:hover {
  background-color: var(--color);
}

.forecast {
  /* position: absolute; */
  /* left: 0;
  top: 150px; */
  display: flex;
  justify-content: space-between;
  padding: 5px;
  width: 100%;
  height: 100%;
  background-color: var(--color);
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.5); */
  animation: cubic-bezier(0.7, 0.15, 0, 0.6) wScroll 15s infinite;
}

.weather:hover .forecast {
  animation-play-state: paused;
}

.forecast-item {
  flex-grow: 1;
}

.forecast-item ul {
  margin-left: 10px;
}

.forecast-item ul li:first-child {
  font-weight: bold;
}

.now-weather,
.forecast-name {
  font-size: 16px;
  margin-bottom: 5px;
}

.forecast-weather {
  display: flex;
  line-height: 30px;
}

.forecast .weatherfont {
  height: 70px;
  line-height: 70px;
  font-size: 40px;
  font-family: weathericon;
}

@keyframes wScroll {
  0% {
    transform: translateY(0);
    filter: brightness(80%);
  }

  25% {
    transform: translateY(0);
    filter: brightness(80%);
  }

  37.5% {
    transform: translateY(-100%);
    filter: brightness(100%);
  }

  62.5% {
    transform: translateY(-100%);
    filter: brightness(100%);
  }

  75% {
    transform: translateY(-200%);
    filter: brightness(80%);
  }

  100% {
    transform: translateY(-200%);
    filter: brightness(80%);
  }
}
</style>
